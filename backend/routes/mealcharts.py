from fastapi import APIRouter, Query
from typing import Annotated
from controller.meal_controller import getFoodGroupsDaily, getFoodGroupsWeekly, getFoodGroupsMonthly, getFoodGroupsDailySex, getFoodGroupsWeeklySex, getFoodGroupsMonthlySex,getMealCountDaily, getMealCountWeekly, getMealCountMonthly, getMealCountDailySex, getMealCountWeeklySex, getMealCountMonthlySex

router = APIRouter(
    prefix = "/meals"
)

#===========================================================================================================#

@router.get("/foodgroups/daily/")
async def get_food_groups_daily(sex: Annotated[str | None, Query(max_length=1)] = None):
    if sex:
        if sex == "f":
            return getFoodGroupsDailySex('F')
        elif sex == "m":
            return getFoodGroupsDailySex('M')
    else:
        return getFoodGroupsDaily()

@router.get("/foodgroups/weekly/")
async def get_food_groups_weekly(sex: Annotated[str | None, Query(max_length=1)] = None):
    if sex:
        if sex == "f":
            return getFoodGroupsWeeklySex('F')
        elif sex == "m":
            return getFoodGroupsWeeklySex('M')
    else:
        return getFoodGroupsWeekly()

@router.get("/foodgroups/monthly/")
async def get_food_groups_monthly(sex: Annotated[str | None, Query(max_length=1)] = None):
    if sex:
        if sex == "f":
            return getFoodGroupsMonthlySex('F')
        elif sex == "m":
            return getFoodGroupsMonthlySex('M')
    else:
        return getFoodGroupsMonthly()
    
#===========================================================================================================#

@router.get("/count/daily/")
async def get_meal_count_daily(sex: Annotated[str | None, Query(max_length=1)] = None):
    if sex:
        if sex == "f":
            return getMealCountDailySex('F')
        elif sex == "m":
            return getMealCountDailySex('M')
    else:
        return getMealCountDaily()

@router.get("/count/weekly/")
async def get_meal_count_weekly(sex: Annotated[str | None, Query(max_length=1)] = None):
    if sex:
        if sex == "f":
            return getMealCountWeeklySex('F')
        elif sex == "m":
            return getMealCountWeeklySex('M')
    else:
        return getMealCountWeekly()

@router.get("/count/monthly/")
async def get_meal_count_monthly(sex: Annotated[str | None, Query(max_length=1)] = None):
    if sex:
        if sex == "f":
            return getMealCountMonthlySex('F')
        elif sex == "m":
            return getMealCountMonthlySex('M')
    else:
        return getMealCountDaily()
    
#===========================================================================================================#

# @router.get("/avg/weekly")
# async def get_weekly_avg_meal():
#     return getMealAvgWeekly()

# @router.get("/avg/monthly")
# async def get_monthly_avg_meal():
#     return getMealAvgMonthly()