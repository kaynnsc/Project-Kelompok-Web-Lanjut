// routes/verifikasi.js
const express = require('express');
const router = express.Router();
const Peserta = require('../models/Peserta');

// Get semua pendaftar
router.get('/pendaftar', async (req, res) => {
  const semua = await Peserta.find();
  res.json(semua);
});

// Verifikasi
router.post('/verifikasi/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!['verified', 'rejected'].includes(status)) return res.status(400).json({ message: 'Status tidak valid' });

  const updated = await Peserta.findByIdAndUpdate(id, { status }, { new: true });
  res.json(updated);
});

module.exports = router;
