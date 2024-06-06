from fastapi import APIRouter, Query
from typing import Annotated
from controller.intake_controller import getIntakePlotDaily, getIntakePlotWeekly, getIntakePlotMonthly, getIntakePlotDailySex, getIntakePlotWeeklySex, getIntakePlotMonthlySex

router = APIRouter(
    prefix = "/intakes"
)

# @router.get("/avg/weekly")
# async def get_weekly_avg_intake():
#     return getAvgIntakeWeek()

# @router.get("/avg/monthly")
# async def get_monthly_avg_intake():
#     return getAvgIntake1Month()

# @router.get("/avg/3monthly")
# async def get_3month_avg_intake():
#     return getAvgIntake3Month()

#===========================================================================================================#

@router.get("/count/daily/")
async def get_intake_count_daily(sex: Annotated[str | None, Query(max_length=1)] = None):
    if sex:
        if sex == "f":
            return getIntakePlotDailySex('F')
        elif sex == "m":
            return getIntakePlotDailySex('M')
    else:
        return getIntakePlotDaily()

@router.get("/count/weekly/")
async def get_intake_count_weekly(sex: Annotated[str | None, Query(max_length=1)] = None):
    if sex:
        if sex == "f":
            return getIntakePlotWeeklySex('F')
        elif sex == "m":
            return getIntakePlotWeeklySex('M')
    else:
        return getIntakePlotWeekly()

@router.get("/count/monthly/")
async def get_intake_count_monthly(sex: Annotated[str | None, Query(max_length=1)] = None):
    if sex:
        if sex == "f":
            return getIntakePlotMonthlySex('F')
        elif sex == "m":
            return getIntakePlotMonthlySex('M')
    else:
        return getIntakePlotMonthly()
    
    
#===========================================================================================================#

