from datetime import date, timedelta
from .intakedata_controller import getAvgIntakeData
from .mealdata_controller import getMealAvgStats
from .trendmaker_controller import makeIntakePredictions, makeMealPredictions

from db import trends

#===========================================================================================================#

def makeIntakeTrends1Month(date: date):
    df = getAvgIntakeData(date, "monthly")
    makeIntakePredictions(date, df, 5)

def makeMealTrends1Month(date: date):
    df = getMealAvgStats(date, "monthly")
    makeMealPredictions(date, df, 5)

#===========================================================================================================#
 
def getIntakeTrends1Month():
    dateToday = date.today() - timedelta(days=1)
    #dateToday = date.fromisoformat("2023-11-23")
    data = []
    if trends.count_documents({'date': dateToday.isoformat(), 'type' : 'intake'}, limit = 1) == 0:
        makeIntakeTrends1Month(dateToday)
    
    data = trends.find_one({'date': dateToday.isoformat(), 'type' : 'intake'}, {"_id": 0})
    return(data)

def getMealTrends1Month():
    dateToday = date.today() - timedelta(days=1)
    #dateToday = date.fromisoformat("2023-11-23")
    data = []
    if trends.count_documents({'date': dateToday.isoformat(), 'type': 'meal'}, limit = 1) == 0:
        makeMealTrends1Month(dateToday) 

    data = trends.find_one({'date': dateToday.isoformat(), 'type': 'meal'}, {"_id": 0})
    return(data)
    

#===========================================================================================================#

def generateNewTrendsPlot(date: date):
    makeIntakeTrends1Month(date)
    makeMealTrends1Month(date)
    print("trends done")

