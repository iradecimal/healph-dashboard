from datetime import date, timedelta
from .charts_controller import makeFoodGroupCharts, makeMealAdequacyChart
from .mealdata_controller import getFoodGroupsData , getMealStats, getMealStatsSex, getFoodGroupsDataSex

foodgroupcolors = {
"Animal-Sourced Protein" : "rgb(179, 36, 0)",
"Carbohydrate" : "rgb(255, 204, 102)",
"Combo Appetizer" : "rgb(218, 145, 1)", 
"Combo Dessert" : "rgb(255, 204, 255)",
"Combo Main Dish" : "rgb(204, 102, 0)",
"Dairy" : "rgb(255, 204, 153)",
"Fat" : "rgb(255, 153, 0)",
"Fruit" : "rgb(255, 77, 77)",
"Plant-Sourced Protein" : "rgb(153, 255, 102)",
"Rice" : "rgb(238, 238, 238)",
"Sugar" : "rgb(255, 217, 179)",
"Vegetable" : "rgb(115, 161, 69)",
}

from db import mealcharts

#===========================================================================================================#

def makeFoodGroupsDaily(date: date):
    df = getFoodGroupsData(date, 'daily')
    charts = makeFoodGroupCharts(df, "Count", "Food Group",  foodgroupcolors, date, "daily", "ALL")

    return(charts)

def makeFoodGroupsWeekly(date: date):
    df = getFoodGroupsData(date, 'weekly')
    charts = makeFoodGroupCharts(df, "Count", "Food Group",  foodgroupcolors, date, "weekly", "ALL")

    return(charts)

def makeFoodGroupsMonthly(date: date):
    df = getFoodGroupsData(date, 'monthly')
    charts = makeFoodGroupCharts(df, "Count", "Food Group",  foodgroupcolors, date, "monthly", "ALL")
    
    return(charts)

#===========================================================================================================#

def makeFoodGroupsDailySex(date: date, sex: str):
    df = getFoodGroupsDataSex(date, sex, 'daily')
    charts = makeFoodGroupCharts(df, "Count", "Food Group",  foodgroupcolors, date, "daily", sex)

    return(charts)
 
def makeFoodGroupsWeeklySex(date: date, sex: str):
    df = getFoodGroupsDataSex(date, sex, 'weekly')
    charts = makeFoodGroupCharts(df, "Count", "Food Group",  foodgroupcolors, date, "weekly", sex)

    return(charts)

def makeFoodGroupsMonthlySex(date: date, sex: str):
    df = getFoodGroupsDataSex(date, sex, 'monthly')
    charts = makeFoodGroupCharts(df, "Count", "Food Group",  foodgroupcolors, date, "monthly", sex)
    
    return(charts)

#===========================================================================================================#

def makeMealCountDaily(date: date):
    df = getMealStats('daily')
    charts = makeMealAdequacyChart(df, date, "daily", "ALL")

    return charts

def makeMealCountWeekly(date: date):
    df = getMealStats('weekly')
    charts = makeMealAdequacyChart(df, date, "weekly", "ALL")

    return charts

def makeMealCountMonthly(date: date):
    df = getMealStats('monthly')
    charts = makeMealAdequacyChart(df, date, "monthly", "ALL")

    return charts

#===========================================================================================================#

def makeMealCountDailySex(date: date, sex: str):
    df = getMealStatsSex(sex, 'daily')
    charts = makeMealAdequacyChart(df, date, "daily", sex)

    return charts

def makeMealCountWeeklySex(date: date, sex: str):
    df = getMealStatsSex(sex, 'weekly')
    charts = makeMealAdequacyChart(df, date, "weekly", sex)

    return charts

def makeMealCountMonthlySex(date: date, sex: str):
    df = getMealStatsSex(sex, 'monthly')
    charts = makeMealAdequacyChart(df, date, "monthly", sex)

    return charts

#===========================================================================================================#

def getFoodGroupsDaily():
    dateToday = date.today() - timedelta(days=1)
    #dateToday = date.fromisoformat("2023-11-23")
    data = []
    if mealcharts.count_documents({'date': dateToday.isoformat(), 'interval': 'daily', 'type': 'foodgroups', 'sex': 'ALL'}) == 0:
        makeFoodGroupsDaily(dateToday)
    data = mealcharts.find_one({'date': dateToday.isoformat(), 'interval': 'daily', 'type': 'foodgroups', 'sex': 'ALL'}, {"_id": 0})
    return(data)

def getFoodGroupsWeekly():
    dateToday = date.today() - timedelta(days=1)
    #dateToday = date.fromisoformat("2023-11-23")
    data = []
    if mealcharts.count_documents({'date': dateToday.isoformat(), 'interval': 'weekly', 'type': 'foodgroups', 'sex': 'ALL'}) == 0:
        makeFoodGroupsDaily(dateToday)
    data = mealcharts.find_one({'date': dateToday.isoformat(), 'interval': 'weekly', 'type': 'foodgroups', 'sex': 'ALL'}, {"_id": 0})
    return(data)

def getFoodGroupsMonthly():
    dateToday = date.today() - timedelta(days=1)
    #dateToday = date.fromisoformat("2023-11-23")
    data = []
    if mealcharts.count_documents({'date': dateToday.isoformat(), 'interval': 'monthly', 'type': 'foodgroups', 'sex': 'ALL'}) == 0:
        makeFoodGroupsDaily(dateToday)
    data = mealcharts.find_one({'date': dateToday.isoformat(), 'interval': 'monthly', 'sex': 'ALL'}, {"_id": 0})
    return(data)

#===========================================================================================================#

def getFoodGroupsDailySex(sex: str):
    dateToday = date.today() - timedelta(days=1)
    #dateToday = date.fromisoformat("2023-11-23")
    data = []
    if mealcharts.count_documents({'date': dateToday.isoformat(), 'interval': 'daily', 'type': 'foodgroups', 'sex': sex}) == 0:
        makeFoodGroupsDaily(dateToday)
    data = mealcharts.find_one({'date': dateToday.isoformat(), 'interval': 'daily', 'type': 'foodgroups', 'sex': sex}, {"_id": 0})
    return(data)
 
def getFoodGroupsWeeklySex(sex: str):
    dateToday = date.today() - timedelta(days=1)
    #dateToday = date.fromisoformat("2023-11-23")
    data = []
    if mealcharts.count_documents({'date': dateToday.isoformat(), 'interval': 'weekly', 'type': 'foodgroups', 'sex': sex}) == 0:
        makeFoodGroupsDaily(dateToday)
    data = mealcharts.find_one({'date': dateToday.isoformat(), 'interval': 'weekly', 'type': 'foodgroups', 'sex': sex}, {"_id": 0})
    return(data)

def getFoodGroupsMonthlySex(sex: str):
    dateToday = date.today() - timedelta(days=1)
    #dateToday = date.fromisoformat("2023-11-23")
    data = []
    if mealcharts.count_documents({'date': dateToday.isoformat(), 'interval': 'monthly', 'type': 'foodgroups', 'sex': sex}) == 0:
        makeFoodGroupsDaily(dateToday)
    data = mealcharts.find_one({'date': dateToday.isoformat(), 'interval': 'monthly', 'type': 'foodgroups', 'sex': sex}, {"_id": 0})
    return(data)

#===========================================================================================================#

def getMealCountDaily():
    dateToday = date.today() - timedelta(days=1)
    #dateToday = date.fromisoformat("2023-11-23")
    data = []
    if mealcharts.count_documents({'date': dateToday.isoformat(), 'interval': 'daily', 'type': 'meal', 'sex': 'ALL'}) == 0:
        makeFoodGroupsDaily(dateToday)
    data = mealcharts.find_one({'date': dateToday.isoformat(), 'interval': 'daily', 'type': 'meal', 'sex': 'ALL'}, {"_id": 0})
    return(data)

def getMealCountWeekly():
    dateToday = date.today() - timedelta(days=1)
    #dateToday = date.fromisoformat("2023-11-23")
    data = []
    if mealcharts.count_documents({'date': dateToday.isoformat(), 'interval': 'weekly', 'type': 'meal', 'sex': 'ALL'}) == 0:
        makeFoodGroupsDaily(dateToday)
    data = mealcharts.find_one({'date': dateToday.isoformat(), 'interval': 'weekly', 'type': 'meal', 'sex': 'ALL'}, {"_id": 0})
    return(data)

def getMealCountMonthly():
    dateToday = date.today() - timedelta(days=1)
    #dateToday = date.fromisoformat("2023-11-23")
    data = []
    if mealcharts.count_documents({'date': dateToday.isoformat(), 'interval': 'monthly', 'type': 'meal', 'sex': 'ALL'}) == 0:
        makeFoodGroupsDaily(dateToday)
    data = mealcharts.find_one({'date': dateToday.isoformat(), 'interval': 'monthly', 'type': 'meal', 'sex': 'ALL'}, {"_id": 0})
    return(data)

#===========================================================================================================#

def getMealCountDailySex(sex: str):
    dateToday = date.today() - timedelta(days=1)
    #dateToday = date.fromisoformat("2023-11-23")
    data = []
    if mealcharts.count_documents({'date': dateToday.isoformat(), 'interval': 'daily', 'type': 'meal', 'sex': sex}) == 0:
        makeFoodGroupsDaily(dateToday)
    data = mealcharts.find_one({'date': dateToday.isoformat(), 'interval': 'daily', 'type': 'meal', 'sex': sex}, {"_id": 0})
    return(data)

def getMealCountWeeklySex(sex: str):
    dateToday = date.today() - timedelta(days=1)
    #dateToday = date.fromisoformat("2023-11-23")
    data = []
    if mealcharts.count_documents({'date': dateToday.isoformat(), 'interval': 'weekly', 'type': 'meal', 'sex': sex}) == 0:
        makeFoodGroupsDaily(dateToday)
    data = mealcharts.find_one({'date': dateToday.isoformat(), 'interval': 'weekly', 'type': 'meal', 'sex': sex}, {"_id": 0})
    return(data)

def getMealCountMonthlySex(sex: str):
    dateToday = date.today() - timedelta(days=1)
    #dateToday = date.fromisoformat("2023-11-23")
    data = []
    if mealcharts.count_documents({'date': dateToday.isoformat(), 'interval': 'monthly', 'type': 'meal', 'sex': sex}) == 0:
        makeFoodGroupsDaily(dateToday)
    data = mealcharts.find_one({'date': dateToday.isoformat(), 'interval': 'monthly', 'type': 'meal', 'sex': sex}, {"_id": 0})
    return(data)

#===========================================================================================================#

def generateNewFoodGroups(date: date):
    makeFoodGroupsDaily(date)
    makeFoodGroupsWeekly(date)
    makeFoodGroupsMonthly(date)
    makeFoodGroupsDailySex(date, "F")
    makeFoodGroupsDailySex(date, "M")
    makeFoodGroupsWeeklySex(date, "F")
    makeFoodGroupsWeeklySex(date, "M")
    makeFoodGroupsMonthlySex(date, "F")
    makeFoodGroupsMonthlySex(date, "M")
    print("success")

def generateNewMealCount(date: date):
    makeMealCountDaily(date)
    makeMealCountWeekly(date)
    makeMealCountMonthly(date)
    makeMealCountDailySex(date, "F")
    makeMealCountDailySex(date, "M")
    makeMealCountWeeklySex(date, "F")
    makeMealCountWeeklySex(date, "M")
    makeMealCountMonthlySex(date, "F")
    makeMealCountMonthlySex(date, "M")
    print("success")
