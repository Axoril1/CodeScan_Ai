require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const scanRoutes = require('./routes/scanRoutes');
const { initializeApp, cert } = require('firebase-admin/app');
const serviceAccount = require('./serviceAccount.json');

initializeApp({
  credential: cert(serviceAccount),
});

connectDB();

const app = express();
app.use(cors({
  origin: ['http://localhost:5173', 'https://codescan-ai.vercel.app'],
  credentials: true,
}));
app.use(express.json());
app.use('/api', scanRoutes);

app.get('/', (req, res) => res.send('CodeScan AI Server is running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
