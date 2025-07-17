from agents import Runner  
from agent.booking_agent import booking_agent


async def run_agent(prompt:str):
    result = await Runner.run(booking_agent,prompt)
    return result




