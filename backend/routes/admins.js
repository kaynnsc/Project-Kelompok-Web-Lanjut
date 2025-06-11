const express = require('express');
const authenticateToken = require('../middleware/auth');
const isAdmin = require('../middleware/admin');
const User = require('../models/User');

const router = express.Router();

// Additional admin-specific routes can be added here
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
