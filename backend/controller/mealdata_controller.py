from db import intakes, meals
from datetime import date, datetime, timedelta
import pandas as pd
from pymongoarrow.api import Schema

#===========================================================================================================#

# Schemas shared between several functions
FoodGroupsSchema = Schema({'_id': str, 'count': int})
FoodCountSchema = Schema({'fat': float, 'carbs': float, 'proteins': float, 'cal': float, 'waste': float})
FoodAvgSchema =  Schema({'_id': str, 'fat': float, 'carbs': float, 'proteins': float, 'cal': float, 'waste': float})

foodgroup = {'$group': {
    '_id': '$foodgroups', 
    'count': {'$sum': 1}
}}

avgmealgroup = {'$group' : {
           '_id' :{ '$dateToString': { 'format': "%Y-%m-%d", 'date': "$datetime"} },
            'fat': {'$avg': '$fat'},
            'carbs': {'$avg': '$carbs'},
            'proteins': {'$avg': '$proteins'},
            'cal': {'$avg': '$cal'},
            'waste': {'$avg': '$waste'},
        }}

lookupUser = { '$lookup': {
        'from': "users",
        'localField': "uid",
        'foreignField': "_id",
        'as': "user_data",
}}

foodcountproject = { '$project': {
            'fat': '$fat',
            'carbs': '$carbs',
            'proteins': '$proteins',
            'cal': '$cal',
            'waste': '$waste',
}}

#===========================================================================================================#

def getDatetimeInterval(interval: str):
    dateToday = date.today()
    #dateToday = date.fromisoformat("2023-11-23")
    datetimeToday = datetime.fromisoformat(dateToday.isoformat())
    datetimeBefore = ''
    if interval == "daily":
        datetimeBefore = datetimeToday - timedelta(days=1)
    elif interval == "weekly":
        datetimeBefore = datetimeToday - timedelta(weeks=1)
    elif interval == "monthly":
        datetimeBefore = datetimeToday - timedelta(weeks=4)
    elif interval == "3month":
        datetimeBefore = datetimeToday - timedelta(weeks=12)
    else:
        raise ValueError("Wrong interval was sent. Please check for capitalization/spelling errors.")
    datetimeinterval = { '$match': {'datetime': { '$lte': datetimeToday, '$gte': datetimeBefore}}} 
    return datetimeinterval

#===========================================================================================================#

def getFoodGroupsData(interval: str):
    if (interval != 'daily' and interval != 'weekly' and interval != 'monthly'):
        raise ValueError("Wrong interval was sent. Please check for capitalization/spelling errors.")
    pipeline = [
        getDatetimeInterval(interval),  
        {'$unwind': '$foodgroups'}, foodgroup
    ]
    df = (meals.aggregate_pandas_all(pipeline, schema = FoodGroupsSchema))
    df = df.rename(columns={'_id': 'Food Group', 'count': 'Count'})
    df.sort_values(by=['Food Group'], inplace=True, ascending=True)

    return df

def getFoodGroupsDataSex(sex: str, interval: str):
    if (sex != 'M' and sex != 'F'):
        raise ValueError("Wrong sex was sent. Please check for capitalization/spelling errors.")
    if (interval != 'daily' and interval != 'weekly' and interval != 'monthly'):
        raise ValueError("Wrong interval was sent. Please check for capitalization/spelling errors.")
    pipeline = [
        getDatetimeInterval(interval),
        lookupUser, 
        { '$unwind': '$user_data'},
        { '$match': { 'user_data.sex' : sex}},
        {'$unwind': '$foodgroups'}, foodgroup
    ]
    df = (meals.aggregate_pandas_all(pipeline, schema = FoodGroupsSchema))
    df = df.rename(columns={'_id': 'Food Group', 'count': 'Count'})
    df.sort_values(by=['Food Group'], inplace=True, ascending=True)

    return df

#===========================================================================================================#

def getMealAvgStats(interval: str):
    if (interval != 'daily' and interval != 'weekly' and interval != 'monthly'):
        raise ValueError("Wrong interval was sent. Please check for capitalization/spelling errors.")
    pipeline = [
        getDatetimeInterval(interval),  
        avgmealgroup
    ]
    df = meals.aggregate_pandas_all(pipeline, schema = FoodAvgSchema)
    df = df.rename(columns={'_id': 'date'})
    df['date'] = pd.to_datetime(df['date'], format="%Y-%m-%d").dt.date
    df = df.sort_values(by='date')

    return(df)

def getMealAvgStatsSex(sex: str, interval: str):
    if (sex != 'M' and sex != 'F'):
        raise ValueError("Wrong sex was sent. Please check for capitalization/spelling errors.")
    if (interval != 'daily' and interval != 'weekly' and interval != 'monthly'):
        raise ValueError("Wrong interval was sent. Please check for capitalization/spelling errors.")
    pipeline = [
        getDatetimeInterval(interval),
        { '$unwind': '$user_data'},
        { '$match': { 'user_data.sex' : sex}},  
        avgmealgroup
    ]
    df = meals.aggregate_pandas_all(pipeline, schema = FoodAvgSchema)
    df = df.rename(columns={'_id': 'date'})
    df['date'] = pd.to_datetime(df['date'], format="%Y-%m-%d").dt.date
    df = df.sort_values(by='date')

    return(df)

#===========================================================================================================#

def getMealStats(interval: str):
    if (interval != 'daily' and interval != 'weekly' and interval != 'monthly'):
        raise ValueError("Wrong interval was sent. Please check for capitalization/spelling errors.")
    pipeline = [
        getDatetimeInterval(interval),   
        foodcountproject
    ]

    return(meals.aggregate_pandas_all(pipeline, schema = FoodCountSchema))

def getMealStatsSex(sex: str, interval: str):
    if (interval != 'daily' and interval != 'weekly' and interval != 'monthly'):
        raise ValueError("Wrong interval was sent. Please check for capitalization/spelling errors.")
    pipeline = [
        getDatetimeInterval(interval),
        lookupUser, 
        { '$unwind': '$user_data'},
        { '$match': { 'user_data.sex' : sex}},
        foodcountproject
    ]

    return(meals.aggregate_pandas_all(pipeline, schema = FoodCountSchema))

#===========================================================================================================#