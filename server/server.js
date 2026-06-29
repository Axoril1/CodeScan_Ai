require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const scanRoutes = require('./routes/scanRoutes');
const { initializeApp, cert } = require('firebase-admin/app');

let firebaseInitialized = false;

try {
  let privateKey = process.env.FIREBASE_PRIVATE_KEY || '';
  // Remove surrounding quotes if present
  privateKey = privateKey.replace(/^"(.*)"$/, '$1');
  // Replace literal \n with actual newlines
  privateKey = privateKey.replace(/\\n/g, '\n');

  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: privateKey,
    }),
  });
  firebaseInitialized = true;
  console.log('Firebase Admin initialized');
} catch (err) {
  console.error('Firebase init error:', err.message);
}

connectDB();

const app = express();
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://codescan-ai.vercel.app',
    /\.vercel\.app$/,
  ],
  credentials: true,
}));
app.use(express.json());
app.use('/api', scanRoutes);

app.get('/', (req, res) => res.send('CodeScan AI Server is running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
