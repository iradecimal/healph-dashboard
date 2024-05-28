from dotenv import load_dotenv, find_dotenv
from pymongo import MongoClient
import os
from pymongoarrow.monkey import patch_all
from pymongoarrow.api import aggregate_pandas_all, find_pandas_all, Schema

load_dotenv(find_dotenv())
patch_all()

DB_STRING = os.environ.get("MONGODB")

client = MongoClient(DB_STRING)
db = client.healph
intakes = db.intakes
meals = db.meals
users = db.users
trends = db.trends
intakecharts = db.intakecharts
mealcharts = db.mealcharts