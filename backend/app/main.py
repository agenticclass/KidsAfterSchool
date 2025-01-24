from fastapi import FastAPI
from app.routers import parent_child
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Kids After School Learning Platform",
    description="API for managing parent-child relationships and learning progress",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(parent_child.router)

@app.get("/")
async def root():
    return {"message": "Kids After School Learning Platform API"}
