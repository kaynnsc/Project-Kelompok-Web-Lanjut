const express = require('express');
const router = express.Router();
const Peserta = require('../models/Peserta');

router.post('/register', async (req, res) => {
  try {
    const { nama, email, nim } = req.body;

    // Enhanced validation
    if (!nama || !email || !nim) {
      return res.status(400).json({ message: 'Semua field wajib diisi' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Format email tidak valid' });
    }
    if (!/^\d{10}$/.test(nim)) {
      return res.status(400).json({ message: 'NIM harus 10 digit' });
    }

    // Cek duplikat
    const exists = await Peserta.findOne({ $or: [{ email }, { nim }] });
    if (exists) return res.status(400).json({ message: 'Email/NIM sudah terdaftar' });

    const peserta = new Peserta({ nama, email, nim });
    await peserta.save();
    res.status(201).json(peserta);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mendaftar', error: err.message });
  }
});

module.exports = router;
