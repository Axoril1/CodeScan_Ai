const express = require('express');
const router = express.Router();
const Scan = require('../models/Scan');
const { analyzeCode } = require('../services/groqService');
const { getAuth } = require('firebase-admin/auth');

const getUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log('Auth header:', authHeader ? 'present' : 'missing');
  
  const token = authHeader?.split('Bearer ')[1];
  if (!token) {
    console.log('No token found');
    req.userId = null;
    return next();
  }
  try {
    const decoded = await getAuth().verifyIdToken(token);
    console.log('Token verified, userId:', decoded.uid);
    req.userId = decoded.uid;
    next();
  } catch (err) {
    console.log('Token verification failed:', err.message);
    req.userId = null;
    next();
  }
};

router.post('/scan', getUser, async (req, res) => {
  try {
    const { code, language } = req.body;
    if (!code) return res.status(400).json({ message: 'No code provided' });
    const result = await analyzeCode(code, language || 'javascript');
    const scan = new Scan({
      code,
      language: language || 'javascript',
      result,
      userId: req.userId || 'guest',
    });
    await scan.save();
    res.status(200).json({ success: true, data: scan });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/history', getUser, async (req, res) => {
  try {
    console.log('History request, userId:', req.userId);
    if (!req.userId) return res.status(401).json({ message: 'Unauthorized' });
    const scans = await Scan.find({ userId: req.userId }).sort({ createdAt: -1 });
    console.log('Found scans:', scans.length);
    res.status(200).json({ success: true, data: scans });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/history/:id', getUser, async (req, res) => {
  try {
    if (!req.userId) return res.status(401).json({ message: 'Unauthorized' });
    const scan = await Scan.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!scan) return res.status(404).json({ message: 'Scan not found' });
    res.status(200).json({ success: true, message: 'Scan deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/history', getUser, async (req, res) => {
  try {
    if (!req.userId) return res.status(401).json({ message: 'Unauthorized' });
    await Scan.deleteMany({ userId: req.userId });
    res.status(200).json({ success: true, message: 'All scans deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
