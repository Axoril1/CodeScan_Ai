const express = require('express');
const router = express.Router();
const Scan = require('../models/Scan');


router.post('/scan', async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code) {
      return res.status(400).json({ message: 'No code provided' });
    }

    
    const result = {
      bugs: ['No bugs found yet — AI coming in Phase 3'],
      suggestions: ['AI suggestions coming in Phase 3'],
      complexity: 'Medium',
      score: 75,
    };

    
    const scan = new Scan({ code, language, result });
    await scan.save();

    res.status(200).json({ success: true, data: scan });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/history', async (req, res) => {
  try {
    const scans = await Scan.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: scans });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;