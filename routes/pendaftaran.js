// routes/pendaftaran.js
const express = require('express');
const router = express.Router();
const Peserta = require('../models/Peserta');

router.post('/register', async (req, res) => {
  try {
    const { nama, email, nim, event } = req.body;

    // Cek duplikat
    const exists = await Peserta.findOne({ $or: [{ email }, { nim }] });
    if (exists) return res.status(400).json({ message: 'Email/NIM sudah terdaftar' });

    const peserta = new Peserta({ nama, email, nim, event });
    await peserta.save();
    res.status(201).json(peserta);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mendaftar', error: err.message });
  }
});

module.exports = router;
