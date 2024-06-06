from db import intakes
from datetime import date, datetime, timedelta
import pandas as pd
from pymongoarrow.api import Schema

#===========================================================================================================#

AvgIntakeSchema = Schema({'_id': str, 'waterglass': float, 'sleephrs': float, 'dailycal': float, 'steps': float})
IntakeCountSchema =Schema({'waterglass': float, 'sleephrs': float, 'dailycal': float, 'steps': float})
SexIntakeCountSchema =Schema({'sex': str, 'waterglass': float, 'sleephrs': float, 'dailycal': float, 'steps': float})

lookupUser = { '$lookup': {
        'from': "users",
        'localField': "uid",
        'foreignField': "_id",
        'as': "user_data",
}}

projectSexData = {'$project': {
    "sex": '$user_data.sex',
    "waterglass": "$waterglass",
    "sleephrs": "$sleephrs",
    "dailycal": "$dailycal",
    "steps": "$steps",
}}

avgintakegroup = {'$group': {
    '_id': '$date',
    'steps': {'$avg': '$steps'},
    'sleephrs': {'$avg': '$sleephrs'},
    'waterglass': {'$avg': '$waterglass'},
    'dailycal': {'$avg': '$dailycal'},
}}

intakecountproject = {'$project': {
    "waterglass": "$waterglass",
    "sleephrs": "$sleephrs",
    "dailycal": "$dailycal",
    "steps": "$steps",
}}

#===========================================================================================================#

def getDateInterval(dateToday: date, interval: str):
    #dateToday = date.fromisoformat("2023-11-23") #testing purposes
    dateBefore = ''
    if interval == "daily":
        dateBefore = dateToday - timedelta(days=1)
    elif interval == "weekly":
        dateBefore = dateToday - timedelta(weeks=1)
    elif interval == "monthly":
        dateBefore = dateToday - timedelta(weeks=4)
    elif interval == "3month":
        dateBefore = dateToday - timedelta(weeks=12)
    else:
        raise ValueError("Wrong interval was sent. Please check for capitalization/spelling errors.")
    dateInterval = { '$match': {'date': { '$lte': dateToday.isoformat(), '$gte': dateBefore.isoformat()}}}
    return dateInterval

#===========================================================================================================#

def getAvgIntakeData(date: date, interval: str):
    if (interval != 'daily' and interval != 'weekly' and interval != 'monthly'):
        raise ValueError("Wrong interval was sent. Please check for capitalization/spelling errors.")
    pipeline = [
        getDateInterval(date, interval),
        avgintakegroup
    ]
    df = (intakes.aggregate_pandas_all(pipeline,  schema = AvgIntakeSchema))
    df = df.rename(columns={'_id':'date'})
    df['date'] = pd.to_datetime(df['date'], format="%Y-%m-%d").dt.date
    df = df.sort_values(by='date')

    return(df)

def getAvgIntakeDataSex(date: date, sex: str, interval: str):
    if (sex != 'M' and sex != 'F'):
        raise ValueError("Wrong sex was sent. Please check for capitalization/spelling errors.")
    if (interval != 'daily' and interval != 'weekly' and interval != 'monthly'):
        raise ValueError("Wrong interval was sent. Please check for capitalization/spelling errors.")
    pipeline = [
        getDateInterval(date, interval),
        lookupUser, 
        { '$unwind': '$user_data'},
        { '$match': { 'user_data.sex' : sex}},
        avgintakegroup
    ]
    df = (intakes.aggregate_pandas_all(pipeline,  schema = AvgIntakeSchema))
    df = df.rename(columns={'_id':'date'})
    df['date'] = pd.to_datetime(df['date'], format="%Y-%m-%d").dt.date
    df = df.sort_values(by='date')

    return(df)

#===========================================================================================================#

def getIntakeCount(date: date, interval: str):
    if (interval != 'daily' and interval != 'weekly' and interval != 'monthly'):
        raise ValueError("Wrong interval was sent. Please check for capitalization/spelling errors.")
    pipeline = [
        getDateInterval(date, interval),
        intakecountproject
    ]

    return(intakes.aggregate_pandas_all(pipeline, schema = IntakeCountSchema))

def getIntakeCountSex(date: date, sex: str, interval: str):
    if (sex != 'M' and sex != 'F'):
        raise ValueError("Wrong sex was sent. Please check for capitalization/spelling errors.")
    if (interval != 'daily' and interval != 'weekly' and interval != 'monthly'):
        raise ValueError("Wrong interval was sent. Please check for capitalization/spelling errors.")
    pipeline = [
        getDateInterval(date, interval),
        lookupUser, 
        { '$unwind': '$user_data'},
        { '$match': { 'user_data.sex' : sex}},
        projectSexData
    ]

    df = (intakes.aggregate_pandas_all(pipeline, schema = SexIntakeCountSchema))
    
    return df

#===========================================================================================================#