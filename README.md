QuickTask ⚡ | Taglay 2025

QuickTask is a high-performance, ephemeral task management system designed for fast-paced, real-time coordination. Built as a specialized demonstration for the Taglay 2025 webinar, it removes the friction of traditional project management tools by eliminating permanent accounts and complex setup.

🚀 PURPOSE OF DEVELOPMENT

Developed specifically for Taglay 2025, QuickTask demonstrates a modern MERN stack application with a focus on:

• ⚡ Zero-Friction UX
No signups or logins. Instant access using a 4-digit PIN.

• 🔄 Real-Time State Sync
Immediate updates across all connected clients via MongoDB.

• ⏳ Ephemeral Data
Hubs function as a temporary “digital clipboard” and exist only for the duration of the event.

• ✅ Proof of Work
A verification protocol requiring staff to submit completion notes for critical tasks.

🛠 TECH STACK

Frontend : React.js (Vite)
Styling : Tailwind CSS (Liquid Glass aesthetic)
Animation : Framer Motion
Backend : Node.js + Express
Database : MongoDB Atlas
API : Axios

📖 KEY FEATURES

• 🎛 Three-Way Access Toggle
Separate entry paths for Staff, Managers, and Hub Creation.

• 🧾 Verification Protocol
Mandatory completion notes for accountability.

• 📊 Visual Progress Tracking
Real-time progress bars and dynamic status badges.

• 🧪 Sandbox Mode
Interactive tutorial environment using local state only (no database writes).

🛠 INSTALLATION & SETUP

Follow these steps to run the project locally after forking the repository.

1️⃣ PREREQUISITES

• Node.js (v18+ recommended)
• MongoDB Atlas account

2️⃣ CLONE THE REPOSITORY

git clone https://github.com/YOUR_USERNAME/taglay-tamparong.git

cd taglay-tamparong

3️⃣ BACKEND SETUP

Navigate to the server folder:

cd server

Install dependencies:

npm install

Create a .env file inside the server directory with the following content:

PORT=5000
MONGODB_URI=your_mongodb_connection_string

Start the backend server:

npm run dev

4️⃣ FRONTEND SETUP

Navigate to the client folder:

cd ../client

Install dependencies:

npm install

Start the frontend development server:

npm run dev

5️⃣ NETWORK ACCESS (IMPORTANT)

If using MongoDB Atlas, make sure your IP address is whitelisted under Network Access.

For testing purposes, you may temporarily allow all IPs:

0.0.0.0/0

Failure to do this may result in database connection errors.

📁 FOLDER STRUCTURE

src/
├─ components/
│ ├─ ui/ → Glassmorphism atomic components
│ ├─ HubStats.jsx → Real-time progress visualizer
│ └─ TutorialOverlay.jsx → Interactive popup guide
│
├─ pages/
│ ├─ Landing.jsx → Two-column hero & feature highlights
│ ├─ JoinHub.jsx → 3-way access control
│ ├─ Dashboard.jsx → Main coordination engine
│ ├─ TaskDetails.jsx → Proof-of-work submission
│ └─ TutorialPage.jsx → Sandbox environment with "Go Back" logic
│
└─ App.jsx → Router configuration

🔒 SECURITY & GIT BEST PRACTICES

Ensure your .gitignore file exists to prevent pushing sensitive data.

Ignore the following:

node_modules/
client/node_modules/
server/node_modules/

.env
server/.env

client/dist/

.DS_Store

👨‍💻 AUTHOR

Dhan-T
Computer Science Student (ML Specialization)
Developed for Taglay 2025