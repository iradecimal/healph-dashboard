from db import intakes, meals, users
from datetime import date, datetime, timedelta
from bson.json_util import loads, dumps
from pymongoarrow.api import Schema
from .intakedata_controller import getDateInterval
from .mealdata_controller import getDatetimeInterval

lookupUser = { '$lookup': {
        'from': "users",
        'localField': "uid",
        'foreignField': "_id",
        'as': "user_data",
}}

#AvgIntakeSchema = Schema({'hale': float, 'phd': float, 'waterglass': float, 'sleephrs': float, 'dailycal': float, 'steps': float})
#AvgFoodSchema = Schema({'fat': float, 'carbs': float, 'protein': float, 'cal': float, 'waste': float})

def getIntakeStats(interval: str):
    if (interval != 'daily' and interval != 'weekly' and interval != 'monthly'):
        raise ValueError("Wrong interval was sent. Please check for capitalization/spelling errors.")
    pipeline = [
        getDateInterval(interval),    
    { '$group': {
            "_id": None,
            "hale": {'$avg': '$hale'},
            'phd': {'$avg': '$phd'},
            'steps': {'$avg': '$steps'},
            'sleephrs': {'$avg': '$sleephrs'},
            'waterglass': {'$avg': '$waterglass'},
            'dailycal': {'$avg': '$dailycal'},
        }}]
    find = list(intakes.aggregate(pipeline)) 
    
    data = {
        'avg' : find[0],
        'adequacy': {
            "steps" : round(((find[0]['steps'] / 10000)*100), 2),
            "sleephrs" : round(((find[0]['sleephrs'] / 8)*100), 2),
            "waterglass" : round(((find[0]['waterglass'] / 9)*100), 2),
            "dailycal" : round(((find[0]['dailycal'] / 2230)*100), 2),
        }}

    return(data)

def getIntakeStatsSex(sex: str, interval: str):
    if (sex != 'M' and sex != 'F'):
        raise ValueError("Wrong sex was sent. Please check for capitalization/spelling errors.")
    if (interval != 'daily' and interval != 'weekly' and interval != 'monthly'):
        raise ValueError("Wrong interval was sent. Please check for capitalization/spelling errors.")
    pipeline = [
        getDateInterval(interval),
        lookupUser, 
        { '$unwind': '$user_data'},
        { '$match': { 'user_data.sex' : sex}},   
    { '$group': {
            "_id": None,
            "hale": {'$avg': '$hale'},
            'phd': {'$avg': '$phd'},
            'steps': {'$avg': '$steps'},
            'sleephrs': {'$avg': '$sleephrs'},
            'waterglass': {'$avg': '$waterglass'},
            'dailycal': {'$avg': '$dailycal'},
        }}]
    find = list(intakes.aggregate(pipeline)) 
    
    data = {
        'avg' : find[0],
        'adequacy': {
            "steps" : round(((find[0]['steps'] / 10000)*100), 2),
            "sleephrs" : round(((find[0]['sleephrs'] / 8)*100), 2),
            "waterglass" : round(((find[0]['waterglass'] / 9)*100), 2),
            "dailycal" : round(((find[0]['dailycal'] / 2230)*100), 2),
        }}

    return(data)


def getMealStats(interval: str):
    if (interval != 'daily' and interval != 'weekly' and interval != 'monthly'):
        raise ValueError("Wrong interval was sent. Please check for capitalization/spelling errors.")
    pipeline = [
        getDatetimeInterval(interval),   
    { '$group': {
            "_id": None,
            'fat': {'$avg': '$fat'},
            'carbs': {'$avg': '$carbs'},
            'proteins': {'$avg': '$proteins'},
            'cal': {'$avg': '$cal'},
            'waste': {'$avg': '$waste'},
        }}]
    find = list(meals.aggregate(pipeline)) 

    data = {
        'avg' : find[0],
        'adequacy' : {
            "fat" : round(((find[0]['fat'] / 19)*100), 2),
            "carbs" : round(((find[0]['carbs'] / 80)*100), 2),
            "proteins" : round(((find[0]['proteins'] / 23)*100), 2),
            "cal" : round(((find[0]['cal'] / 740)*100), 2),
            "waste" : round(((find[0]['waste'] / 40)*100), 2),
        }}
    return(data)

def getMealStatsSex(sex: str, interval: str):
    if (sex != 'M' and sex != 'F'):
        raise ValueError("Wrong sex was sent. Please check for capitalization/spelling errors.")
    if (interval != 'daily' and interval != 'weekly' and interval != 'monthly'):
        raise ValueError("Wrong interval was sent. Please check for capitalization/spelling errors.")
    pipeline = [
        getDatetimeInterval(interval),
        lookupUser, 
        { '$unwind': '$user_data'},
        { '$match': { 'user_data.sex' : sex}},
        { '$group': {
                "_id": None,
                'fat': {'$avg': '$fat'},
                'carbs': {'$avg': '$carbs'},
                'proteins': {'$avg': '$proteins'},
                'cal': {'$avg': '$cal'},
                'waste': {'$avg': '$waste'},
            }}]
    find = list(meals.aggregate(pipeline)) 

    data = {
        'avg' : find[0],
        'adequacy' : {
            "fat" : round(((find[0]['fat'] / 19)*100), 2),
            "carbs" : round(((find[0]['carbs'] / 80)*100), 2),
            "proteins" : round(((find[0]['proteins'] / 23)*100), 2),
            "cal" : round(((find[0]['cal'] / 740)*100), 2),
            "waste" : round(((find[0]['waste'] / 40)*100), 2),
        }}
    return(data)




def getUserCount():
    return(users.count_documents({})) 