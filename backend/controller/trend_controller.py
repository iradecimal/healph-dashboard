from .intakedata_controller import getAvgIntakeData
from .trendmaker_controller import makeIntakePredictions


def getIntakeTrends1Month():
    df = getAvgIntakeData("monthly")
    return(makeIntakePredictions(df, 5))



