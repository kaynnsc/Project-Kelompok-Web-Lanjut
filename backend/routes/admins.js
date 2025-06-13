const express = require('express');
const authenticateToken = require('../middleware/auth');
const isAdmin = require('../middleware/admin');
const User = require('../models/User');
const Certificate = require('../models/Certificate'); 
const router = express.Router();


router.get('/dashboard', authenticateToken, isAdmin, async (req, res) => {
  try {
    const users = await User.find({ role: 'user' }).select('-password');
    const pendingCertificates = await Certificate.find({ status: 'pending' })
      .populate('userId', 'nama nim');
    res.json({ users, pendingCertificates });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
