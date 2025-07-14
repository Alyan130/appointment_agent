from agents import Agent
from agent.agent_config import model
from agent.save_agent import save_agent
from agent.calendar_agent import calendar_agent
from agent.email_agent import email_agent
from prompts.instructions import booking_agent_prompt

booking_agent = Agent(
    name="Booking agent",
    instructions=booking_agent_prompt,
   tools=[
       save_agent,
       calendar_agent,
       email_agent],
   model=model
)
