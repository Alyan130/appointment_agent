# Appointment Booking Agent

A conversational AI-powered appointment booking system that automates the process of capturing user details, saving them in a database, and scheduling events in Google Calendar — all handled by an OpenAI Agent using MCP (Model Context Protocol) servers.

##  Overview

This project leverages the power of the **OpenAI Agents SDK** and **MCP servers** to build a seamless AI agent that:
- Interacts with users through a chat widget
- Collects booking information using a structured form
- Saves appointments in a **Supabase database** via Supabase MCP Server
- Creates corresponding calendar events using the **Google Calendar MCP Server**
-  Sending Emails to both owner and customer using **SMTP server**

No custom REST APIs are needed — the agent calls tools declaratively using context.

---

##  Tech Stack

- **Frontend**: Next.js (React), Tailwind CSS
- **Agent Orchestration**: OpenAI Agents SDK
- **Database**: Supabase (via MCP Server)
- **Calendar Integration**: Google Calendar API (via MCP Server)
-  **Emails**: Sending Emails to both owner and customer
- **Backend**: FastAPI (for conversational endpoints and API bridge)

---

##  Features

- Floating chat bubble UI for user interaction
- Structured form embedded inside the chat for appointment details
- Agent handles conversation, form validation, tool calling
- Automatic record insertion in Supabase
- Real-time event creation in Google Calendar
- Smart duplicate check to prevent double-booking
- Clean error handling and user responses via Agent

---


##  Setup Instructions

1. **Google Cloud Setup**
   - Enable Google Calendar API
   - Create OAuth 2.0 credentials (Desktop App)
   - Download credentials as `gcp-oauth.keys.json`

2. **Supabase Setup**
   - Create a Supabase project
   - Create a `booking` table with fields:
     `name, email, title, date, start_time, end_time`
   - Configure Supabase MCP server with Project ID and Token

3. **SMTP Email Setup**
   - Go to your Google Account Security settings
   - Enable 2-Step Verification
   - Scroll down and click App passwords
   - Choose Mail and Other, name it something like "Appointment Agent"
   - Google will generate a 16-character App Password
---

## 🔧 Environment Setup (`.env`)

Create a `.env` file in the root directory and add the following:

```env
SUPABASE_TOKEN=your_supabase_service_role_token
API_KEY=your_gemini_api_key
PROJECT_ID=your_supabase_project_id
GOOGLE_OAUTH_CREDENTIALS=path to your gcp-oauth.keys.json file
APP_PASSWORD=your_app_password_for_email
MY_EMAIL=your_email@example.com




