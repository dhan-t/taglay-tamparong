# QuickTask ⚡ | Taglay 2025

**QuickTask** is a high-performance, ephemeral task management system designed for fast-paced, real-time coordination. Built as a specialized demonstration for the **Taglay 2025** webinar, it eliminates the friction of traditional project management tools by removing the need for permanent accounts and complex setup.

## 🚀 Purpose of Development
Developed specifically for **Taglay 2025**, QuickTask serves as a demonstration of a modern MERN stack application focusing on:
* **Zero-Friction UX**: No signups or logins; instant access via 4-digit PIN.
* **Real-Time State Sync**: Immediate feedback across all connected clients using MongoDB updates.
* **Ephemeral Data**: Hubs are designed to be temporary, serving as a "digital clipboard" that exists only as long as the event requires.
* **Proof of Work**: A specialized protocol requiring staff to provide verification notes for critical tasks.

## 🛠 Tech Stack
* **Frontend**: React.js (Vite)
* **Styling**: Tailwind CSS (Liquid Glass aesthetic)
* **Animation**: Framer Motion
* **Backend**: Node.js & Express
* **Database**: MongoDB Atlas
* **API**: Axios for client-server communication

## 📖 Key Features
* **Three-Way Access Toggle**: Dedicated entry paths for Staff, Managers, and Hub Creation.
* **Verification Protocol**: Mandatory completion notes for accountability.
* **Visual Progress Tracking**: Real-time progress bars and status badges.
* **Sandbox Mode**: An interactive, local-state tutorial to test features without database persistence.

---

## 🛠 Installation & Setup

Follow these steps to run the project on your own machine after forking.

### 1. Prerequisites
* Node.js (v18+ recommended)
* MongoDB Atlas Account

### 2. Clone the Repository
```bash
git clone [https://github.com/YOUR_USERNAME/taglay-tamparong.git](https://github.com/YOUR_USERNAME/taglay-tamparong.git)
cd taglay-tamparong
3. Backend Setup
Navigate to the server directory: cd server

Install dependencies: npm install

Create a .env file in the server folder and add your credentials:

Code snippet

PORT=5000
MONGODB_URI=your_mongodb_connection_string
Start the server: npm run dev

4. Frontend Setup
Navigate to the client directory: cd ../client

Install dependencies: npm install

Start the development server: npm run dev

5. Network Access (Crucial)
If using MongoDB Atlas, ensure you have whitelisted your IP address in the MongoDB Atlas Network Access settings (or set to 0.0.0.0/0 for testing) to avoid connection errors.

📁 Folder Structure
Plaintext

src/
├── components/
│   ├── ui/                # Glassmorphism atomic components
│   ├── HubStats.jsx       # Real-time progress visualizer
│   └── TutorialOverlay.jsx # Interactive popup guide
├── pages/
│   ├── Landing.jsx        # Two-column hero & feature highlights
│   ├── JoinHub.jsx         # 3-way access control (Staff, Manager, Create)
│   ├── Dashboard.jsx      # Main coordination engine
│   ├── TaskDetails.jsx    # Proof-of-work submission
│   └── TutorialPage.jsx   # Sandbox environment with "Go Back" logic
└── App.jsx                # Router configuration
🔒 Security & Git Best Practices
Ensure your .gitignore is present in the root to prevent pushing sensitive data:

Plaintext

# node_modules
node_modules/
client/node_modules/
server/node_modules/

# Environment Variables
.env
server/.env

# Production Build
client/dist/

# OS Files
.DS_Store
👨‍💻 Author
Dhan-T - Computer Science Student (ML Specialization) Developed for Taglay 2025