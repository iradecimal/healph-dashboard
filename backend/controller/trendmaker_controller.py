import plotly.express as px
import plotly.graph_objects as go
from pandas import DataFrame, Series
from bson.json_util import loads
from datetime import date, timedelta
import pandas as pd
import pmdarima as pm

from db import trends

#===========================================================================================================#

def PredictTrends(df: DataFrame, column: str, interval: int, color: str, title: str, yaxis: str) -> go.Figure:
    arima = pm.auto_arima(df[column], start_p=1, start_q=1,
        max_p=3, max_q=3, m=7,
        start_P=0, seasonal=True,
        d=1, D=0, trace=0,
        error_action='ignore',  # don't want to know if an order does not work
        suppress_warnings=True,  # don't want convergence warnings
        stepwise=True
    )
    predictor = arima.predict(n_periods= interval)
    
    i=1
    frame = [[df[column].iloc[-1], df["date"].iloc[-1]]]
    for val in predictor.items():
        frame.append([val[1], df["date"].iloc[-1] + timedelta(days=i)])
        i += 1
    predicted = pd.DataFrame(frame, columns=[column, "date"])

    figpred = go.Figure(go.Scatter( x=df.date, y= df[column], name="Measured", marker_color=color,  line_shape='spline'))
    figpred.add_trace(go.Scatter(x=predicted.date, y=predicted[column], name="Predicted", line = dict(color='royalblue', width=4, dash='dash'),  line_shape='spline'))
    figpred.update_layout(title=title, xaxis_title = "Date", yaxis_title = yaxis, autosize = True)
    figpred.update_yaxes(automargin='left+top')

    return figpred

#===========================================================================================================#

def makeIntakePredictions(df: DataFrame, interval: int) -> list:
    #dateToday = date.today()
    dateToday = date.fromisoformat("2023-11-23")

    if trends.count_documents({'date': dateToday.isoformat(), 'type' : 'intake'}, limit = 1) == 0:
        figdailycal = PredictTrends(df, "dailycal", interval, 'rgb(46, 184, 46)', "Caloric Intake", "calories")
        figsleep = PredictTrends(df, "sleephrs", interval, 'rgb(119, 51, 255)', "Hours of Sleep", "hours")
        figwater = PredictTrends(df, "waterglass", interval, 'rgb(0, 172, 230)', "Water Intake in Glasses", "glasses")
        figsteps = PredictTrends(df, "steps", interval, 'rgb(51, 204, 51)', "Steps Taken Daily", "steps")

        data = {
            "date": dateToday.isoformat(),
            'type' : 'intake',
            "dailycalplot": loads(figdailycal.to_json()),
            "sleepplot": loads(figsleep.to_json()),
            "waterplot": loads(figwater.to_json()),
            "stepsplot": loads(figsteps.to_json()) ,
        }

        post = trends.insert_one(data)
        del data['_id']
    else: 
        data = trends.find_one({'date': dateToday.isoformat(), 'type' : 'intake'}, {"_id": 0})
    return(data)

#===========================================================================================================#

def makeMealPredictions(df: DataFrame, interval: int) -> list:
    #dateToday = date.today()
    dateToday = date.fromisoformat("2023-11-23")
    data = []
    if trends.count_documents({'date': dateToday.isoformat(), 'type': 'meal'}, limit = 1) == 0:

        figfat = PredictTrends(df, "fat", interval, 'rgb(255, 153, 0)', "Fat Intake", "fat")
        figcarbs = PredictTrends(df, "carbs", interval, 'rgb(115, 230, 0)', "Carb Intake", "carbohydrates")
        figproteins = PredictTrends(df, "proteins", interval, 'rgb(179, 36, 0)', "Protein Intake", "proteins")
        figcal = PredictTrends(df, "cal", interval, 'rgb(77, 136, 255)', "Calories per Meal", "calories")
        figwaste = PredictTrends(df, "waste", interval, 'rgb(102, 0, 51)', "Waste", "waste")

        data = {
            "date": dateToday.isoformat(),
            'type': 'meal',
            "fatplot": loads(figfat.to_json()),
            "carbsplot": loads(figcarbs.to_json()),
            "proteinsplot": loads(figproteins.to_json()),
            "calplot": loads(figcal.to_json()),
            "wasteplot": loads(figwaste.to_json())
        }
        post = trends.insert_one(data)
        del data['_id']
    else: 
        data = trends.find_one({'date': dateToday.isoformat(), 'type': 'meal'}, {"_id": 0})
    return(data)

#===========================================================================================================#