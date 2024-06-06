from datetime import date, datetime, timedelta
from .trend_controller import generateNewTrendsPlot
from .intake_controller import generateNewIntakePlots

def chartGenerator():
    dateToday = date.today() - timedelta(days=1)
    #generateNewTrendsPlot(dateToday)
    generateNewIntakePlots(dateToday)
    print("success")
    