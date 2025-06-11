const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { nama, nim, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { nim }] });
    if (existingUser) {
      return res.status(400).json({ 
        error: existingUser.email === email ? 'Email sudah terdaftar' : 'NIM sudah terdaftar' 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      nama,
      nim,
      email,
      password: hashedPassword
    });

    await user.save();
    res.status(201).json({ message: 'Registrasi berhasil, menunggu verifikasi admin' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Email atau password salah' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Email atau password salah' });
    }

    if (user.status !== 'verified') {
      return res.status(403).json({ error: 'Akun belum diverifikasi admin' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      'secret_key',
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
