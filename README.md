🚀 IntelliMeet - AI Powered Enterprise Meeting & Collaboration Platform
   

      

📌 Overview
IntelliMeet is a modern enterprise meeting and collaboration platform built using the MERN Stack, WebRTC, and Socket.IO.

The platform enables teams to create meetings, join using unique meeting codes, communicate through real-time video conferencing, exchange messages instantly, record meetings, and manage meeting history through a professional dashboard.

✨ Features
🎥 Real-Time Video Conferencing
Multi-user video meetings (up to 6 participants)
WebRTC peer-to-peer communication
Dynamic participant video grid
Camera on/off controls
Microphone mute/unmute controls
Automatic participant join/leave handling
💬 Real-Time Chat
Socket.IO powered messaging
Instant message delivery
Meeting room specific chat
🏢 Meeting Management
Create meetings
Join meetings using unique meeting code
Meeting History Dashboard
Meeting Status Tracking
Participant Management
🎬 Meeting Recording
Record entire meeting session
Mixed audio and video recording
Upload recordings to server
Recording history support
Stream recordings for playback
🔒 Authentication & Security
JWT Authentication
Protected Routes
User Authorization
Secure Meeting Access
📊 Dashboard
Meeting Statistics
Scheduled Meetings
Completed Meetings
Participant Count
Search & Filter Support
🏗️ System Architecture
Frontend:

React.js
Tailwind CSS
React Router
Axios
Socket.IO Client
Backend:

Node.js
Express.js
MongoDB
Mongoose
Socket.IO
Multer
Real-Time Layer:

WebRTC
STUN Servers
Peer Connections
📂 Project Structure
IntelliMeet/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── middleware/
│   │   └── config/
│   │
│   └── uploads/
│
└── README.md
🔄 Meeting Flow
Create Meeting
      │
      ▼
Generate Meeting Code
      │
      ▼
Join Meeting
      │
      ▼
Socket.IO Signaling
      │
      ▼
WebRTC Connection
      │
      ▼
Video + Audio + Chat
      │
      ▼
Recording Upload
      │
      ▼
Meeting History
🛠️ Installation
Clone Repository
git clone https://github.com/pot2006/IntellMeet-AI-Powered-Enterprise-Meeting-Collaboration-Platform.git

cd IntellMeet-AI-Powered-Enterprise-Meeting-Collaboration-Platform
Backend Setup
cd backend

npm install

npm run dev
Frontend Setup
cd frontend

npm install

npm run dev
⚙️ Environment Variables
Create a .env file inside backend


🚧 Upcoming Features
AI Meeting Summaries
Screen Sharing
TURN Server Integration
Meeting Playback Page
Meeting Analytics Dashboard
Calendar Integration
Live Captions
Collaborative Notes

⭐ Support
If you found this project useful, please consider giving it a ⭐ on GitHub.
