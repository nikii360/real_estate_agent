Your Smart Real Estate Assistant.
This AI-powered voice agent helps users discover properties, learn about listings, and take action—all hands-free. Whether you're a buyer, renter, or investor, your next property is just one conversation away.

Core Capabilities:
🎤 Talks Like a Human
Uses ElevenLabs for natural-sounding voice responses.

🧠 Understands Property Queries
Connects to a RAG pipeline with Pinecone vector search, trained on real estate listings from Google Drive data (CSV/PDF).

📲 WhatsApp Follow-Ups
Sends listing summaries, brochures, or viewing info directly to the user’s WhatsApp.

📅 Schedules Calendar Events
Books viewing appointments into Google Calendar with time, address, and agent info.

⚙️ Automated via n8n
All tasks—data ingestion, user interaction, messaging, scheduling—are orchestrated using n8n workflows.

# 🏡 Voice-Based Real Estate Agent (Powered by AI + Automation)

This project is a **conversational AI agent** built to help users explore real estate options by simply talking. It uses a voice-driven interface to understand user requirements, retrieves relevant property info, and automates follow-ups via WhatsApp and calendar invites.

---

## 🔧 Tech Stack

| Tool | Purpose |
|------|---------|
| **n8n** | Orchestration & workflow automation brain |
| **Pinecone** | Vector store for RAG search (namespaced by use case) |
| **Google Drive API** | Source of property data injected into Pinecone |
| **ElevenLabs API** | Realistic voice response |
| **WhatsApp API (Twilio / Meta)** | Sends property info to users |
| **Google Calendar API** | Books a meeting between user & developer |

---

## 🧠 How It Works

1. **User speaks** property preferences (e.g., "I want a 2BHK in Dubai Marina under 2M AED").
2. **Voice input is transcribed** 
3. **n8n triggers RAG workflow**, where:
   - Query is converted to an embedding
   - Pinecone searches the right namespace (based on use case or location)
   - Results pulled from injected Drive files
4. **Top results are summarized** and converted to speech using ElevenLabs.
5. **User confirms interest**, triggering:
   - A WhatsApp message with details
   - A Google Calendar event between user and developer (sample template for now)

---

## 📁 Folder Structure

Import N8N Workflows json files -> /N8N/ (Untracked files for now).
Static FE files -> /src/public/
Call elevenlabs agent via twilio outbound call api -> /src/server.ts

## 🚀 Getting Started

1. Set up API keys for:
   - Pinecone
   - ElevenLabs
   - Google Cloud (sheets/drive)
   - WhatsApp Business API
   - Twilio
2. Import N8N Worflow json files into your N8N instance
3. Upload property data to Google Drive and configure injection nodes
4. Test the workflow via front-end or simple API Call 

---

Challenges 
Websocket method would have been ideal as shown in elevenlabs official documentation. 
However, it did not support sending dynamic variables.

