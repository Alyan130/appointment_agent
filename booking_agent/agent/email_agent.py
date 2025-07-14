from agents import Agent , function_tool , Runner
from agent.agent_config import model
from prompts.instructions import email_agent_prompt
from tools.email_tools import send_to_customer,send_to_owner

@function_tool
async def email_agent(name: str, email: str, start_time: str, end_time: str, title: str, date: str):
  '''
  This tool sends email to the owner and customer.

  Args: 
  - name: name of the user
  - email: email of the user
  - start_time: start time of the appointment
  - end_time: end time of the appointment
  - title: title of the appointment
  - date: date of the appointment
  
  Return: Emails sent OR Error sending emails
  '''

  prompt = f'''
  Name: {name}
  Email: {email}
  start_time: {start_time}
  end_time: {end_time}
  title: {title}
  date: {date}
  '''

  email_agent = Agent(
     name = "Email Agent",
     instructions=email_agent_prompt,
     tools= [send_to_customer,send_to_owner],
     model = model,
  )

  result = await Runner.run(email_agent,prompt)
  return result
 
