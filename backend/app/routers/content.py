from fastapi import APIRouter

router = APIRouter(
    prefix="/content",
    tags=["content"],
    responses={404: {"description": "Not found"}},
)

@router.get("/")
async def get_content():
    return {"message": "Content endpoint"}
