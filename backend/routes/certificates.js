const express = require('express');
const authenticateToken = require('../middleware/auth');
const isAdmin = require('../middleware/admin');
const Certificate = require('../models/Certificate');
const generateCertificate = require('../utils/generateCertificate');

const router = express.Router();

router.post('/', authenticateToken, async (req, res) => {
  try {
    const certificate = new Certificate({
      ...req.body,
      userId: req.user.id
    });

    await certificate.save();
    res.status(201).json({ message: 'Pengajuan sertifikat berhasil dibuat' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/me', authenticateToken, async (req, res) => {
  try {
    const certificates = await Certificate.find({ userId: req.user.id });
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/pending', authenticateToken, isAdmin, async (req, res) => {
  try {
    const certificates = await Certificate.find({ status: 'pending' })
      .populate('userId', 'nama nim');
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/verify/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Status tidak valid' });
    }

    const certificate = await Certificate.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!certificate) {
      return res.status(404).json({ error: 'Sertifikat tidak ditemukan' });
    }

    res.json({ message: `Sertifikat ${status} successfully` });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/generate/:id', authenticateToken, async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) {
      return res.status(404).json({ error: 'Sertifikat tidak ditemukan' });
    }

    if (certificate.status !== 'approved') {
      return res.status(403).json({ error: 'Sertifikat belum disetujui' });
    }

    await generateCertificate(certificate, res);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
