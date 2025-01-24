from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel, UUID4
from typing import List, Optional
from datetime import datetime
from supabase import create_client, Client
from dotenv import load_dotenv
import os

router = APIRouter(
    prefix="/parent-child",
    tags=["parent-child"],
    responses={404: {"description": "Not found"}},
)

# Load environment variables
load_dotenv()

# Initialize Supabase client
supabase: Client = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_KEY")
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

class ParentChildRelationship(BaseModel):
    id: int
    parent_id: UUID4
    child_id: UUID4
    relationship_type: str
    created_at: datetime
    updated_at: datetime

class CreateRelationshipRequest(BaseModel):
    child_id: UUID4
    relationship_type: Optional[str] = "parent"

class UpdateRelationshipRequest(BaseModel):
    relationship_type: str

@router.post("/", response_model=ParentChildRelationship)
async def create_relationship(
    relationship: CreateRelationshipRequest,
    token: str = Depends(oauth2_scheme)
):
    # Verify parent token and get parent ID
    user = supabase.auth.get_user(token)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials"
        )
    
    parent_id = user.user.id
    
    # Check if child exists
    child = supabase.table("profiles").select("*").eq("id", str(relationship.child_id)).execute()
    if not child.data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Child profile not found"
        )
    
    # Create relationship
    try:
        new_relationship = supabase.table("parent_child_relationships").insert({
            "parent_id": str(parent_id),
            "child_id": str(relationship.child_id),
            "relationship_type": relationship.relationship_type
        }).execute()
        
        return new_relationship.data[0]
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@router.get("/", response_model=List[ParentChildRelationship])
async def get_children(
    token: str = Depends(oauth2_scheme)
):
    # Verify parent token and get parent ID
    user = supabase.auth.get_user(token)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials"
        )
    
    parent_id = user.user.id
    
    # Get all children
    relationships = supabase.table("parent_child_relationships")\
        .select("*")\
        .eq("parent_id", str(parent_id))\
        .execute()
    
    return relationships.data

@router.delete("/{child_id}")
async def remove_child(
    child_id: UUID4,
    token: str = Depends(oauth2_scheme)
):
    # Verify parent token and get parent ID
    user = supabase.auth.get_user(token)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials"
        )
    
    parent_id = user.user.id
    
    # Delete relationship
    try:
        supabase.table("parent_child_relationships")\
            .delete()\
            .eq("parent_id", str(parent_id))\
            .eq("child_id", str(child_id))\
            .execute()
        
        return {"message": "Relationship removed successfully"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
