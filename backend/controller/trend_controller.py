from .intakedata_controller import getAvgIntakeData
from .mealdata_controller import getMealAvgStats
from .trendmaker_controller import makeIntakePredictions, makeMealPredictions


def getIntakeTrends1Month():
    df = getAvgIntakeData("monthly")
    return(makeIntakePredictions(df, 5))

def getMealTrends1Month():
    df = getMealAvgStats("monthly")
    return(makeMealPredictions(df, 5))

