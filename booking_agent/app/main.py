from agents import Agent , Runner  , set_tracing_disabled
from agent.booking_agent import booking_agent
from fastapi import FastAPI ,HTTPException
from schema import Booking
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from main import run_agent
from fastapi.encoders import jsonable_encoder

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post ("/booking-agent",status_code=200)
async def booking_agent(booking_data:Booking):
   data = booking_data.model_dump() 
   result = await run_agent(str(data))
   if result:
    return JSONResponse(content={
         "message":"Your appointment has been booked.",
         "success":True})
   else:
      raise HTTPException(status_code=400,detail="failed to book the appointment")





