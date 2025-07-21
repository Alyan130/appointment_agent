from agents import Agent, Runner ,function_tool
import os
from agents.mcp import MCPServerStdio 
from dotenv import load_dotenv
from agent.agent_config import model
from prompts.instructions import calendar_agent_prompt

load_dotenv()
GOOGLE_OAUTH_CREDENTIALS= os.getenv("GOOGLE_OAUTH_CREDENTIALS")

@function_tool
async def calendar_agent(start_time: str, end_time: str, title: str, date: str):
  '''
  This tool creates events in calendar
  
  Args: 
  - start_time: start time of the event
  - end_time: end time of the event
  - title: title of the event
  - date: date of the event
  
  Return : event created or event already exists

  '''

  print("Calendar agent called!")

  prompt = f'''
  start_time: {start_time}
  end_time: {end_time}
  title: {title}
  date: {date}
  '''

  try:
   async with MCPServerStdio(
       client_session_timeout_seconds= 100,
       cache_tools_list=True,
      #  params= {
      #   "command": "npx",
      #   "args": ["@cocal/google-calendar-mcp"],
      #   "env": {
      #     "GOOGLE_OAUTH_CREDENTIALS": f"{GOOGLE_OAUTH_CREDENTIALS}"
      #    }
      #  }
       params=  {
           "command": "/usr/local/bin/npx",
           "args": ["-y", "@cocal/google-calendar-mcp"],
           "env": {
           "GOOGLE_OAUTH_CREDENTIALS": f"{GOOGLE_OAUTH_CREDENTIALS}"
           }
         }
    ) as server:
         automation_agent = Agent(
          name="Calendar agent",
          instructions =calendar_agent_prompt,
            model = model,
            mcp_servers=[server]
    )
         result = await Runner.run(automation_agent,prompt)
         return result

  except Exception:
      print("Error occured while creating calendar event!")  


