from datetime import date, datetime, timedelta
from .trend_controller import generateNewTrendsPlot
from .intake_controller import generateNewIntakePlots
from .meal_controller import generateNewFoodGroups, generateNewMealCount

def chartGenerator():
    dateToday = date.today() - timedelta(days=1)
    generateNewTrendsPlot(dateToday)
    generateNewIntakePlots(dateToday)
    generateNewMealCount(dateToday)
    generateNewFoodGroups(dateToday)
    print("generation is finished")
    return 1
    