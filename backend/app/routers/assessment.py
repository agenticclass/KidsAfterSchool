from fastapi import APIRouter

router = APIRouter(
    prefix="/assessment",
    tags=["assessment"],
    responses={404: {"description": "Not found"}},
)

@router.get("/")
async def get_assessment():
    return {"message": "Assessment endpoint"}
