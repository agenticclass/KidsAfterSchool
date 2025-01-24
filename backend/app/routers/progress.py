from fastapi import APIRouter

router = APIRouter(
    prefix="/progress",
    tags=["progress"],
    responses={404: {"description": "Not found"}},
)

@router.get("/")
async def get_progress():
    return {"message": "Progress endpoint"}
