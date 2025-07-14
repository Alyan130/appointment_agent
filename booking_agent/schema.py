from pydantic import BaseModel , EmailStr

class Booking(BaseModel):
  fullName: str
  email: EmailStr
  date: str
  startTime: str
  endTime: str
  serviceTitle: str