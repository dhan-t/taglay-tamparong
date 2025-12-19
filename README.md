QuickTask ⚡
QuickTask is a high-performance, ephemeral task management system designed for fast-paced, real-time coordination. Built for the Taglay 2025 webinar, it eliminates the friction of traditional project management tools by removing the need for accounts and permanent data storage.

🚀 Purpose of Development
Developed specifically for Taglay 2025, QuickTask serves as a demonstration of a modern MERN stack application focusing on:

Zero-Friction UX: No signups or logins; instant access via PIN.

Real-Time State Sync: Immediate feedback across all connected clients.

Ephemeral Data: Hubs are designed to be temporary, serving as a "digital clipboard" for short-term events.

🛠 Tech Stack
Frontend: React.js with Vite.

Styling: Tailwind CSS (Liquid Glass/Glassmorphism aesthetic).

Animation: Framer Motion.

Backend: Node.js & Express.

Database: MongoDB Atlas.

State Management: Context API / Local State with Axios for API communication.

📖 Features
Three-Way Access: Dedicated entry points for Staff, Managers, and Hub Creation.

Verification Protocol: Staff must provide "Proof of Work" notes to complete critical tasks.

Visual Progress: Real-time progress bars and status badges.

Sandbox Mode: An interactive tutorial for users to test the UI without database persistence.

🛠 Installation & Setup
Follow these steps to run the project on your own machine after forking.

1. Prerequisites
Node.js (v18+ recommended)

MongoDB Atlas Account (or local MongoDB)

2. Clone the Repository
Bash

git clone https://github.com/YOUR_USERNAME/taglay-tamparong.git
cd taglay-tamparong
3. Backend Setup
Navigate to the server directory: cd server

Install dependencies: npm install

Create a .env file in the server folder:

Code snippet

PORT=5000
MONGODB_URI=your_mongodb_connection_string
Start the server: npm run dev

4. Frontend Setup
Navigate to the client directory: cd ../client

Install dependencies: npm install

Start the development server: npm run dev

5. Network Access (Crucial)
If using MongoDB Atlas, ensure you have whitelisted your IP address or set it to 0.0.0.0/0 (Allow Access From Anywhere) in the MongoDB Atlas Network Access settings to avoid connection errors.

👨‍💻 Author
Dhan-T