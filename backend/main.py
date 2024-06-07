from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from routes import avgstats, mealcharts, intakecharts, trends, find
import asyncio
from controller.chartgenerator import chartGenerator
from starlette.background import BackgroundTasks

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

async def generate_charts():
    while True:
        chartGenerator()
        await asyncio.sleep(60*60*24) #wait for 1 day
        


@app.on_event("startup") #port to lifetime eventually, on_event is being deprecated
async def startup():
    asyncio.create_task(generate_charts())
    print("Charts regenerated for today.")