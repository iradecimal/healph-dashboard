from fastapi import APIRouter
from controller.trend_controller import getIntakeTrends1Month, getMealTrends1Month

router = APIRouter(
    prefix="/trends"
)

#===========================================================================================================#

@router.get("/intake/monthly")
async def get_1month_intake_trends():
    return getIntakeTrends1Month() 

@router.get("/meal/monthly")
async def get_1month_meal_trends():
    return getMealTrends1Month() 

#===========================================================================================================#