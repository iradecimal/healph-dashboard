import plotly.express as px
import plotly.graph_objects as go
import pandas as pd
from pandas import DataFrame, Series
from bson.json_util import loads
from datetime import date

from db import intakecharts, mealcharts
#===========================================================================================================#

labels = ["0-59%", "60-79%", "80-99%", "100%+"]
steplabels = [ "Sedentary", "Low Active", "Somewhat Active", "Active", "Highly Active"]
wastelabels = [ "0-24g of Waste", "24-32g of Waste", "32-40g of Waste", "40g+ of Waste"]

#===========================================================================================================#

def getIntervals(labels, bins) -> dict:
    labelsDict = dict()
    for i in range(len(labels)):
        labelsDict.update({labels[i] : f"({round(bins[i],2)},{round(bins[i+1],2)}]"})
    return labelsDict

#===========================================================================================================#

def makeFoodGroupCharts(df: DataFrame, x: str, y: str, palette: dict, dateToday: date, interval: str, sex: str) -> go.Figure:
    figbar = px.bar(df, x=x, y=y, orientation='h', color=y, color_discrete_map = palette)
    figbar.update_layout(xaxis_title = "Food Groups", yaxis={'visible': False, 'showticklabels': False}, xaxis={'categoryorder':'total descending'},  autosize = True)

    figpie = go.Figure(px.pie(df, values='Count',names='Food Group', color='Food Group', color_discrete_map = palette))
    figbar.update_layout(autosize=True)    
    figpie.update_traces(hoverinfo='label+percent', textinfo='none',  sort = False)

    data = {
        "date": dateToday.isoformat(),
        "type": "foodgroups",
        "interval": interval,
        "sex": sex,
        "barplot" : loads(figbar.to_json()),
         "pieplot": loads(figpie.to_json()),
    }

    post = mealcharts.insert_one(data)
    del data['_id']

def makeAdequacyPieChart(df: DataFrame, x:str, perbins: list, labels: list, title: str, colors: list):
    bins = pd.cut(df[x], bins=perbins, labels=labels, right=False)
    groups = bins.groupby(bins, observed=True).count().rename("count")
    countdf = pd.DataFrame({'Adequacy':groups.index, 'Count':groups.values})
    countdf['Interval'] = countdf['Adequacy'].map(getIntervals(labels, perbins))
    
    fig = go.Figure(px.pie(countdf, values = 'Count', names = 'Adequacy', color = 'Adequacy', hole = 0.4, title = title, 
                           custom_data = ['Interval'], color_discrete_map = dict(map(lambda i,j : (i,j), labels, colors))))
    fig.update_layout(autosize=True)
    fig.update_traces(sort=False, hovertemplate = "<br>Interval: %{customdata}<br>Count: %{value}")
    
    return fig 

#===========================================================================================================#

def makeIntakeAdequacyCharts(df: DataFrame, dateToday: date, interval: str, sex: str) -> list:
    figdailycal = makeAdequacyPieChart(df, "dailycal", [0, (2230*0.6), (2230*0.8), 2230, float('inf')], labels, "Daily Calories (in kcal)",
                                        ["#AFEBAF","#7FDF7F","#4FD34F","#2EB82E"]
                                      )

    figsleep = makeAdequacyPieChart(df, "sleephrs", [0, (9*.6), (9*.8), 9, float('inf')], labels, "Sleep Hours (in hrs)", 
                                        ["#C5ADF5","#A37DF0","#804CEA","#5E1BE4"]
                                   )
    
    figwater = makeAdequacyPieChart(df, "waterglass", [0, (8*.6), (8*.8), 8, float('inf')], labels, "Water Intake (in glasses)", 
                                        ["#ADEBFF","#7CDEFF","#4BD2FF","#1AC6FF"]
                                   )

    figsteps = makeAdequacyPieChart(df, "steps", [0, 5000, 7500, 10000, 12500, float('inf')], steplabels, "Step Count", 
                                        ["#F2533F","#F2913F","#F2CE3F","#D9F23F","#9CF23F"]
                                   )

    data = {
        "date": dateToday.isoformat(),
        "interval": interval,
        "sex": sex,
        "dailycalplot": loads(figdailycal.to_json()),
        "sleepplot": loads(figsleep.to_json()),
        "waterplot": loads(figwater.to_json()),
        "stepsplot": loads(figsteps.to_json()),
    }
    post = intakecharts.insert_one(data)
    
    del data['_id']

def makeMealAdequacyChart(df: DataFrame, dateToday: date, interval: str, sex: str) -> list:
    figfat = makeAdequacyPieChart(df, "fat", [0, (19*0.6), (19*0.8), 19, float('inf')], labels, "Fat (in g)",
                                        ["#FFDBA4","#7FDF7F","#FFAF37","#FF9900"]
                                      )

    figcarbs = makeAdequacyPieChart(df, "carbs", [0, (80*0.6), (80*0.8), 80, float('inf')], labels, "Carbohydrates (in g)",
                                        ["#CDFF9B","#AFFF5F","#91FF23","#73E600"]
                                      )
    
    figproteins = makeAdequacyPieChart(df, "proteins", [0, (23*0.6), (23*0.8), 23, float('inf')], labels, "Proteins (in g)",
                                        ["#FFA28A","#FF6A44","#FE3300","#B82500"]
                                      )

    figcal = makeAdequacyPieChart(df, "cal", [0, (740*0.6), (740*0.8), 740, float('inf')], labels, "Calories (in kcal)",
                                        ["#BFD4FF","#99BBFF","#73A1FF","#4D88FF"]
                                      )
    
    figwaste = makeAdequacyPieChart(df, "waste", [0, (40*0.6), (40*0.8), 40, float('inf')], wastelabels, "Food Waste",
                                        ["#FFA86D","#FF7316","#BD4C00","#662900"]
                                      )
    data = {
        "date": dateToday.isoformat(),
        "type": "meal",
        "interval": interval,
        "sex": sex,
        "calplot": loads(figcal.to_json()),
        "fatplot": loads(figfat.to_json()),
        "carbsplot": loads(figcarbs.to_json()),
        "proteinsplot": loads(figproteins.to_json()),
        "wasteplot": loads(figwaste.to_json())
    }
    
    post = mealcharts.insert_one(data)
    del data['_id']

#===========================================================================================================#