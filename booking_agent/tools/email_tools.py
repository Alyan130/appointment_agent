from agents import function_tool
from smtplib import SMTP
from email.message import EmailMessage
from dotenv import load_dotenv
import os

load_dotenv()
APP_PASSWORD = os.getenv("APP_PASSWORD")
MY_EMAIL = os.getenv("MY_EMAIL")

@function_tool
def send_to_customer(email:str,email_body:str)->str:
 '''
 This tool sends email to the customer

 Args:
   email -> email of customer
   email_body -> body of email

 Return -> Email sent OR Error sending email
 '''
 print("customer email tool called")

 msg= EmailMessage()
 msg["From"] = MY_EMAIL
 msg["To"] = email
 msg["Subject"] = "Appointment Confirmed"
 msg.set_content(email_body)

 with SMTP("smtp.gmail.com",587) as server:
     try: 
        server.starttls()
        server.login(MY_EMAIL,APP_PASSWORD)
        server.send_message(msg)
        return "Email sent"
     except Exception as e:
         return "Error sending email."


@function_tool
def send_to_owner(email_body:str)->str:
 '''
 This tool sends email to the owner

 Args:
   email -> email of customer
   email_body -> body of email

 Return -> Email sent OR Error sending email
 '''
 print("owner email tool called")
 

 msg= EmailMessage()
 msg["From"] = MY_EMAIL
 msg["To"] = MY_EMAIL
 msg["Subject"] = "New Appointment Booked"
 msg.set_content(email_body)

 with SMTP("smtp.gmail.com",587) as server:
     try: 
        server.starttls()
        server.login(MY_EMAIL,APP_PASSWORD)
        server.send_message(msg)
        return "Email sent"
     except Exception as e:
         return "Error sending email."

