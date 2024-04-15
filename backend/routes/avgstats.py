from fastapi import APIRouter
from controller.avgstats_controller import getIntakeStats, getMealStats, getUserCount

router = APIRouter(
    prefix="/avgstats"
)

#===========================================================================================================#

@router.get("/daily/intake")
async def get_daily_intake_stats():
    return getIntakeStats("daily")

@router.get("/weekly/intake")
async def get_weekly_intake_stats():
    return getIntakeStats("weekly")

@router.get("/monthly/intake")
async def get_monthly_intake_stats():
    return getIntakeStats("monthly")

#===========================================================================================================#

@router.get("/daily/meals")
async def get_daily_meal_stats():
    return getMealStats("daily")

@router.get("/weekly/meals")
async def get_weekly_intake_stats():
    return getMealStats("weekly")

@router.get("/monthly/meals")
async def get_monthly_meal_stats():
    return getMealStats("monthly")

#===========================================================================================================#

@router.get("/activity")
async def get_user_activity_stats():
    return getUserCount()

#===========================================================================================================#