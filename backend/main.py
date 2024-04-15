from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from routes import avgstats, mealcharts, intakecharts, trends, find

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods=["*"],
    allow_headers=["*"] 
)


app.include_router(avgstats.router, tags=["avgstats"])
app.include_router(mealcharts.router, tags=["meals"])
app.include_router(intakecharts.router, tags=["intakes"])
app.include_router(trends.router, tags=["trends"])
app.include_router(find.router, tags=["find"])
