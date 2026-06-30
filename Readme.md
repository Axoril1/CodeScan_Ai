CodeScan AI 🐼

An AI-powered code reviewer themed around Kung Fu Panda — paste your code and get instant bugs, suggestions, and a quality score.

Live App: [code-scan-ai.vercel.app](https://code-scan-ai.vercel.app)
Backend API: [codescan-ai-server.onrender.com](https://codescan-ai-server.onrender.com)

---

Tech Stack
-----------------------------------------------
| Layer   | Technology                        |
|---------|-----------------------------------|
| Frontend| React + Vite                      |
| Backend | Node.js + Express                 |
| Database| MongoDB + Mongoose                |
| AI      | Groq API (LLaMA 3.3 70B)          |
| Auth    | Firebase Authentication (Google)  |
| Hosting | Vercel (client) + Render (server) |
-----------------------------------------------

---

Features

- AI Code Review — bugs, suggestions, complexity rating, and a 0–100 quality score
- Google Sign-In — secure authentication via Firebase
- Guest Mode — 1 free scan without an account; sign in for unlimited access
- Private Scan History — every user only sees their own saved scans
- Delete Controls — remove individual scans or clear all history at once
- Custom Theme — original Kung Fu Panda inspired UI with hand-coded styling and react-icons
- Responsive Design — works across desktop and mobile

---

Project Structure

```
codescan-ai/
├── client/                   # React + Vite frontend
│   ├── src/
│   │   ├── components/       # Navbar, ResultCard, ScoreBar, ProtectedRoute
│   │   ├── context/          # AuthContext (Firebase)
│   │   ├── pages/            # Home, History, Login
│   │   ├── firebase.js       # Firebase client config
│   │   └── App.jsx
│   └── vercel.json           # SPA routing config
│
├── server/                   # Node.js + Express backend
│   ├── config/
│   │   └── db.js             # MongoDB connection
│   ├── models/
│   │   └── Scan.js           # Mongoose schema
│   ├── routes/
│   │   └── scanRoutes.js     # Scan + history API routes
│   ├── services/
│   │   └── groqService.js    # Groq AI integration
│   └── server.js             # Express entry point + Firebase Admin
│
└── README.md
```

---

Getting Started Locally

Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Groq API key ([console.groq.com](https://console.groq.com))
- Firebase project with Google sign-in enabled

1. Clone the repository

```bash
git clone https://github.com/Axoril1/CodeScan_Ai.git
cd CodeScan_Ai
```

2. Backend setup

```bash
cd server
npm install
```

Create `server/.env`:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
GROQ_API_KEY=your_groq_api_key
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
FIREBASE_PRIVATE_KEY="your_firebase_private_key"
```

Start the server:

```bash
npm run dev
```

3. Frontend setup

```bash
cd ../client
npm install
```

Create `client/.env`:

```
VITE_API_URL=http://localhost:5000
```

Start the client:

```bash
npm run dev
```

---

API Endpoints

`POST /api/scan`
Analyze code with AI. Works for guests and authenticated users.

Request:
```json
{
  "code": "function add(a,b){ return a+b; }",
  "language": "javascript"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "language": "javascript",
    "result": {
      "bugs": ["..."],
      "suggestions": ["..."],
      "complexity": "Low",
      "score": 85,
      "summary": "Clean function with no major issues."
    }
  }
}
```

`GET /api/history`
Returns the authenticated user's scan history. Requires `Authorization: Bearer <firebase_token>` header.

`DELETE /api/history/:id`
Deletes a single scan owned by the authenticated user.

`DELETE /api/history`
Deletes all scans owned by the authenticated user.

---

Deployment

------------------------------------------------------------
| Service | Platform                                       |
|---------|------------------------------------------------|
| Frontend| [Vercel](https://vercel.com)                   |
| Backend | [Render](https://render.com)                   |
| Database| [MongoDB Atlas](https://www.mongodb.com/atlas) |
| Auth    | [Firebase](https://firebase.google.com)        |
------------------------------------------------------------


The frontend uses a `vercel.json` rewrite rule to support client-side routing with React Router on direct page refreshes.

---

Roadmap

- Project setup (MERN + Vite)
- Express server + MongoDB
- Groq AI integration
- React UI with code editor and results
- Scan history page
- Custom themed UI with react-icons
- Google authentication with guest scan limit
- Per-user private history with delete controls
- Responsive layout
- Deployed to production

---

Author

Axoril1
GitHub: [@Axoril1](https://github.com/Axoril1)

---

License

MIT License — free to use and modify.