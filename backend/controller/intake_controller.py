from datetime import date
from .charts_controller import makeIntakeAdequacyCharts
from .intakedata_controller import getIntakeCount, getIntakeCountSex

from db import intakecharts

#===========================================================================================================#

# def getAvgIntakeWeek():
#     df = getAvgIntakeDataWeek()
#     charts = makeAvgIntakeGraphs(df)

#     return(charts)

# def getAvgIntake1Month():
#     df = getAvgIntakeData1Month()
#     charts = makeAvgIntakeGraphs(df)

#     return(charts)

#===========================================================================================================#

def makeIntakePlotDaily(date: date):
    df = getIntakeCount(date, "daily")
    makeIntakeAdequacyCharts(df, date, "daily", 'ALL')

def makeIntakePlotWeekly(date: date):
    df = getIntakeCount(date, "weekly")
    makeIntakeAdequacyCharts(df, date, "weekly", 'ALL')

def makeIntakePlotMonthly(date: date):
    df = getIntakeCount(date, "monthly") 
    makeIntakeAdequacyCharts(df, date, "monthly", 'ALL')

#===========================================================================================================#

def makeIntakePlotDailySex(date: date, sex: str):
    df = getIntakeCountSex(date, sex, "daily")
    makeIntakeAdequacyCharts(df, date, "daily", sex)

def makeIntakePlotWeeklySex(date: date, sex: str):
    df = getIntakeCountSex(date, sex, "weekly")
    makeIntakeAdequacyCharts(df, date, "weekly", sex)

def makeIntakePlotMonthlySex(date: date, sex: str):
    df = getIntakeCountSex(date, sex, "monthly") 
    makeIntakeAdequacyCharts(df, date, "monthly", sex)

#===========================================================================================================#

def getIntakePlotDaily():
    #dateToday = date.today() - timedelta(days=1)
    dateToday = date.fromisoformat("2023-11-23")
    data = []
    if intakecharts.count_documents({'date': dateToday.isoformat(), 'interval': 'daily', 'sex': 'ALL'}) == 0:
        makeIntakePlotDaily(dateToday)
    data = intakecharts.find_one({'date': dateToday.isoformat(), 'interval': 'daily', 'sex': 'ALL'}, {"_id": 0})
    return(data)


def getIntakePlotWeekly():
    #dateToday = date.today() - timedelta(days=1)
    dateToday = date.fromisoformat("2023-11-23")
    data = []
    if intakecharts.count_documents({'date': dateToday.isoformat(), 'interval': 'weekly', 'sex': 'ALL'}) == 0:
        makeIntakePlotDaily(dateToday)
    data = intakecharts.find_one({'date': dateToday.isoformat(), 'interval': 'weekly', 'sex': 'ALL'}, {"_id": 0})
    return(data)

def getIntakePlotMonthly():
    #dateToday = date.today() - timedelta(days=1)
    dateToday = date.fromisoformat("2023-11-23")
    data = []
    if intakecharts.count_documents({'date': dateToday.isoformat(), 'interval': 'monthly', 'sex': 'ALL'}) == 0:
        makeIntakePlotDaily(dateToday)
    data = intakecharts.find_one({'date': dateToday.isoformat(), 'interval': 'monthly', 'sex': 'ALL'}, {"_id": 0})
    return(data)

#===========================================================================================================#

def getIntakePlotDailySex(sex: str):
    #dateToday = date.today() - timedelta(days=1)
    dateToday = date.fromisoformat("2023-11-23")
    data = []
    if intakecharts.count_documents({'date': dateToday.isoformat(), 'interval': 'daily', 'sex': sex}) == 0:
        makeIntakePlotDaily(dateToday)
    data = intakecharts.find_one({'date': dateToday.isoformat(), 'interval': 'daily', 'sex': sex}, {"_id": 0})
    return(data)

def getIntakePlotWeeklySex(sex: str):
    #dateToday = date.today() - timedelta(days=1)
    dateToday = date.fromisoformat("2023-11-23")
    data = []
    if intakecharts.count_documents({'date': dateToday.isoformat(), 'interval': 'weekly', 'sex': sex}) == 0:
        makeIntakePlotDaily(dateToday)
    data = intakecharts.find_one({'date': dateToday.isoformat(), 'interval': 'weekly', 'sex': sex}, {"_id": 0})
    return(data)

def getIntakePlotMonthlySex(sex: str):
    #dateToday = date.today() - timedelta(days=1)
    dateToday = date.fromisoformat("2023-11-23")
    data = []
    if intakecharts.count_documents({'date': dateToday.isoformat(), 'interval': 'monthly', 'sex': sex}) == 0:
        makeIntakePlotDaily(dateToday)
    data = intakecharts.find_one({'date': dateToday.isoformat(), 'interval': 'monthly', 'sex': sex}, {"_id": 0})
    return(data)

#===========================================================================================================#

def generateNewIntakePlots(date: date):
    makeIntakePlotDaily(date)
    makeIntakePlotWeekly(date)
    makeIntakePlotMonthly(date)
    makeIntakePlotDailySex(date, "F")
    makeIntakePlotDailySex(date, "M")
    makeIntakePlotWeeklySex(date, "F")
    makeIntakePlotWeeklySex(date, "M")
    makeIntakePlotMonthlySex(date, "F")
    makeIntakePlotMonthlySex(date, "M")
    print("intakes done")
