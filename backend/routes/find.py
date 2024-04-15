from fastapi import APIRouter, Query
from typing import Annotated
from dateutil.parser import isoparse
from bson.objectid import ObjectId
from db import intakes, meals
from bson.json_util import dumps
from pymongo import ASCENDING, DESCENDING
import json
import re

router = APIRouter(
    prefix="/find"
)

#===========================================================================================================#

querypattern = re.compile("\$(gt|gte|lt|lte|in|match)")
oidpattern = re.compile("[0-9a-fA-F]{24}")

def is_number(querystr: str) -> bool:
    try:
        float(querystr)
        return True
    except ValueError:
        return False
    
def is_date(querystr: str) -> bool:
    try:
        isoparse(querystr)
        return True
    except ValueError:
        return False
    
#===========================================================================================================#

def cleanFindQuery(query: str):
    operator = re.match(querypattern, query)
    querydict = {}
    if operator:
        splitquery = re.split(r'=', query)
        if is_number(splitquery[1]):
            querydict.update({splitquery[0] : float(splitquery[1])})
        elif is_date(splitquery[1]):
            if len(splitquery[1]) > 10:
                querydict.update({splitquery[0] : isoparse(splitquery[1])})
            else:
                querydict.update({splitquery[0] : splitquery[1]})
        elif ObjectId.is_valid(splitquery[1]):
            querydict.update({splitquery[0] : ObjectId(splitquery[1])})
        else:
            querydict.update({splitquery[0] : splitquery[1]})
        return(querydict)   
    else:
        if is_number(query):
            return(float(query))
        if is_date(query):
            if len(query) > 10:
                return(isoparse(query))
            return(query)
        if ObjectId.is_valid(query):
            return(ObjectId(query))
        else:
            return(query)
    
def splitQuery(query: str):
    if ';' in query:
        splitquery = re.split(r';', query)
        retquery = {}
        retquery.update(cleanFindQuery(splitquery[0]))
        retquery.update(cleanFindQuery(splitquery[1]))
        return(retquery)
    else:
        return(cleanFindQuery(query))

def cleanSortQuery(query: str):
    if '-' in query:
        new_query = re.sub(r'-', '', query)
        return((new_query, DESCENDING))
    elif '+' in query:
        new_query = re.sub(r'\+', '', query)
        return((new_query, ASCENDING))

def sortQuery(query: str):
    if ';' in query:
        querylist = []
        splitquery = re.split(r';', query)
        for sortquery in splitquery:
            querylist.append(cleanSortQuery(sortquery))
        return(querylist)
    else:
        return([cleanSortQuery(query)])
    
#===========================================================================================================#

@router.get("/meals/")
async def search_meal(
    sort: str | None = None,
    uid: Annotated[str | None, Query(pattern="[0-9a-fA-F]{24}")] = None,
    dailyid: Annotated[str | None, Query(pattern="[0-9a-fA-F]{24}")] = None,
    datetime: str | None = None,
    cal: str | None = None,
    fat: str | None = None,
    carbs: str | None = None,
    proteins: str | None = None,
    foodgroups: str | None = None,
    skip: int = 0,
    limit: int = 20,
):
    find_dict = {}
    if uid:
        find_dict.update({"uid": ObjectId(uid)})
    if dailyid:
        find_dict.update({"dailyid": ObjectId(dailyid)})
    if datetime:
        find_dict.update({"datetime": splitQuery(datetime)})
    if cal:
        find_dict.update({"cal": splitQuery(cal)})
    if fat:
        find_dict.update({"fat": splitQuery(fat)})
    if carbs:
        find_dict.update({"carbs": splitQuery(carbs)})
    if proteins:
        find_dict.update({"proteins": splitQuery(proteins)})
    if foodgroups:
        find_dict.update({"foodgroups": splitQuery(foodgroups)})
    if sort:
        sorter = sortQuery(sort)
        response = meals.find(filter = find_dict, skip = skip, limit = limit).sort(key_or_list=sorter)
        return(json.loads(dumps(response)))
    else:
        response = meals.find(filter = find_dict, skip = skip, limit = limit)
        return(json.loads(dumps(response)))
    

#===========================================================================================================#

@router.get("/intakes/")
async def search_intake(
    sort: str | None = None,
    uid: Annotated[str | None, Query(pattern="[0-9a-fA-F]{24}")] = None,
    date: str | None = None,
    sleephrs: str | None = None,
    waterglass: str | None = None,
    dailycal: str | None = None,
    steps: str | None = None,
    phd: str | None = None,
    hale: str | None = None,
    skip: int = 1,
    limit: int = 20,
):
    find_dict = {}
    if uid:
        find_dict.update({"uid": ObjectId(uid)})
    if date:
        find_dict.update({"date": splitQuery(date)})
    if sleephrs:
        find_dict.update({"sleephrs": splitQuery(sleephrs)})
    if waterglass:
        find_dict.update({"waterglass": splitQuery(waterglass)})
    if dailycal:
        find_dict.update({"dailycal": splitQuery(dailycal)})
    if steps:
        find_dict.update({"steps": splitQuery(steps)})
    if phd:
        find_dict.update({"phd": splitQuery(phd)})
    if hale:
        find_dict.update({"hale": splitQuery(hale)})
    if sort:
        sorter = sortQuery(sort)
        response = intakes.find(filter = find_dict, skip = skip, limit = limit).sort(key_or_list=sorter)
        return(json.loads(dumps(response)))
    else:
        response = intakes.find(filter = find_dict, skip = skip, limit = limit)
        return(json.loads(dumps(response)))

#===========================================================================================================#