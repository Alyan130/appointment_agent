from agents import Agent, function_tool,Runner
from agents.mcp import  MCPServerStdio 
from typing import Optional
import os
from dotenv import load_dotenv
from agent.agent_config import model
from prompts.instructions import save_agent_prompt

load_dotenv()
SUPABASE_TOKEN = os.getenv("SUPABASE_TOKEN")
PROJECT_ID = os.getenv("PROJECT_ID")

@function_tool
async def save_agent(name: str, email: str, start_time: str, end_time: str, title: str, date: str):  
  '''
  This tool saves the appointment details in a database.

  Args: 
  - name: name of the user
  - email: email of the user
  - start_time: start time of the appointment
  - end_time: end time of the appointment
  - title: title of the appointment
  - date: date of the appointment
  
  Return: information saved successfully or error in saving information
  '''
   
  print("Save agent called!")

  prompt = f'''
    Name: {name} 
    Email: {email} 
    start_time: {start_time} 
    end_time: {end_time} 
    title: {title} 
    date: {date} 
    status: {"pending"}
   '''

  try:
   async with MCPServerStdio(
       client_session_timeout_seconds= 100,
       cache_tools_list=True,
      #  params= {
      #   "command": "cmd",
      #   "args": [
      #   "/c",
      #   "npx",
      #   "-y",
      #   "@supabase/mcp-server-supabase@latest",
      #   f"--project-ref={PROJECT_ID}",
      #   ],
      #   "env": {
      #     "SUPABASE_ACCESS_TOKEN": f"{SUPABASE_TOKEN}"
      #    },
      #  } 
      params = {
        "command": "/usr/local/bin/npx",
        "args": [
        "-y",
        "@supabase/mcp-server-supabase@latest", 
        f"--project-ref={PROJECT_ID}",
        ],
        "env": {
          "SUPABASE_ACCESS_TOKEN": f"{SUPABASE_TOKEN}"
        },
      }
   ) as server:
        supabase_agent= Agent(
        name="Supabase agent",
        instructions =save_agent_prompt,
        model = model,
        mcp_servers=[server]
        )
        result = await Runner.run(supabase_agent, prompt)
        return result
  except Exception:
      print("Error in saving info")  




