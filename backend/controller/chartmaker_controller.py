import plotly.express as px
import plotly.graph_objects as go
from pandas import DataFrame, Series
from bson.json_util import loads

#===========================================================================================================#

def makeFoodGroupBar(df: DataFrame, x: str, y: str, orient: str, color: str) -> go.Figure:
    fig = px.bar(df, x=x, y=y, orientation=orient, color=color)
    fig.update_layout(xaxis_title = "Food Groups", yaxis={'visible': False, 'showticklabels': False}, xaxis={'categoryorder':'total descending'},  autosize = True)

    return fig

def makeAvgBar(x: Series, y: Series, color: str, xaxis: str, width: int) -> go.Figure:  
    fig = go.Figure(go.Bar(x=x, y=y, marker_color=color))
    fig.update_layout(xaxis_title=xaxis, yaxis_title="Count", autosize = True)

    return fig

def makeHistogram(df: DataFrame, x: str, color: str, xaxis: str, width: int) -> go.Figure:
    fig = go.Figure(px.histogram(df, x=x, color_discrete_sequence=color, marginal='box'))
    fig.update_layout(xaxis_title = xaxis, yaxis_title = "Count", bargap=0.05, autosize = True)

    return fig

#===========================================================================================================#

def makeAvgIntakeGraphs(df: DataFrame) -> list:
    figdailycal = makeAvgBar(df.date, df.dailycal, 'rgb(46, 184, 46)', "Daily Caloric Intake", 450)

    figsleep = makeAvgBar(df.date, df.sleephrs, 'rgb(119, 51, 255)', "Average Hours of Sleep", 450)

    figwater = makeAvgBar(df.date, df.waterglass, 'rgb(0, 172, 230)', "Average Water Intake in Glasses", 450)

    figsteps = makeAvgBar(df.date, df.steps, 'rgb(51, 204, 51)', "Average Steps Taken Daily", 450)

    data = [{
         "dailycalplot": loads(figdailycal.to_json()),
         "sleepplot": loads(figsleep.to_json()),
         "waterplot": loads(figwater.to_json()),
         "stepsplot": loads(figsteps.to_json()),
    }]
    return(data)

def makeAvgMealGraphs(df: DataFrame) -> list:
    figfat = makeAvgBar(df.date, df.fat,'rgb(255, 153, 0)', "Fat Intake", 450)

    figcarbs = makeAvgBar(df.date, df.carbs, 'rgb(115, 230, 0)', "Carb Intake", 450)
    
    figproteins = makeAvgBar(df.date, df.proteins, 'rgb(179, 36, 0)', "Protein Intake", 450)

    figcal = makeAvgBar(df.date, df.cal, 'rgb(77, 136, 255)', "Calories per Meal", 450)
    
    figwaste = makeAvgBar(df.date, df.waste, 'rgb(102, 0, 51)', "Daily Food Waste", 450)

    data = [{
        "fatplot": loads(figfat.to_json()),
        "carbsplot": loads(figcarbs.to_json()),
        "proteinsplot": loads(figproteins.to_json()),
        "calplot": loads(figcal.to_json()),
        "wasteplot": loads(figwaste.to_json())
    }]
    return(data)

#===========================================================================================================#

def makeIntakeHistograms(df: DataFrame) -> list:
    figdailycal = makeHistogram(df, "dailycal", ['rgb(46, 184, 46)'], "Caloric Intake", 450)

    figsleep = makeHistogram(df, "sleephrs", ['rgb(119, 51, 255)'], "Hours of Sleep", 450)

    figwater = makeHistogram(df, "waterglass", ['rgb(0, 172, 230)'], "Water Intake in Glasses", 450)

    figsteps = makeHistogram(df, "steps", ['rgb(51, 204, 51)'], "Steps Taken Daily", 450)

    data = {
         "dailycalplot": loads(figdailycal.to_json()),
         "sleepplot": loads(figsleep.to_json()),
         "waterplot": loads(figwater.to_json()),
         "stepsplot": loads(figsteps.to_json()),
    }
    return(data)

def makeFoodHistograms(df: DataFrame) -> list:
    figfat = makeHistogram(df, "fat", ['rgb(255, 153, 0)'], "Fat Intake", 450)

    figcarbs = makeHistogram(df, "carbs", ['rgb(115, 230, 0)'], "Carb Intake", 450)
    
    figproteins = makeHistogram(df, "proteins", ['rgb(179, 36, 0)'], "Protein Intake", 450)

    figcal = makeHistogram(df, "cal", ['rgb(77, 136, 255)'], "Calories per Meal", 450)
    
    figwaste = makeHistogram(df, "waste", ['rgb(102, 0, 51)'], "Waste", 450)

    data = { 
        "fatplot": loads(figfat.to_json()),
        "carbsplot": loads(figcarbs.to_json()),
        "proteinsplot": loads(figproteins.to_json()),
        "calplot": loads(figcal.to_json()),
        "wasteplot": loads(figwaste.to_json())
    }
    return(data)