const express = require('express');
const router = express.Router();
const Scan = require('../models/Scan');
const { analyzeCode } = require('../services/groqService');

router.post('/scan', async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code) {
      return res.status(400).json({ message: 'No code provided' });
    }

    const result = await analyzeCode(code, language || 'javascript');

    const scan = new Scan({ code, language: language || 'javascript', result });
    await scan.save();

    res.status(200).json({ success: true, data: scan });
  } catch (error) {
    console.error('Scan error:', error.message);
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