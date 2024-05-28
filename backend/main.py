from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from routes import avgstats, mealcharts, intakecharts, trends, find
from fastapi_utils.tasks import repeat_every

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
''''
@app.on_event("startup")
@repeat_every(seconds= 60 * 60 * 24)
async def regenerate_charts() -> None:
    chartGenerator()
'''