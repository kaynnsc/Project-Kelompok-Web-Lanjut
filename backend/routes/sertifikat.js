// routes/sertifikat.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const Peserta = require('../models/Peserta');

router.get('/sertifikat/:id', async (req, res) => {
  const peserta = await Peserta.findById(req.params.id);
  if (!peserta || peserta.status !== 'verified') {
    return res.status(404).json({ message: 'Peserta tidak ditemukan atau belum diverifikasi' });
  }

  const htmlTemplate = fs.readFileSync(path.join(__dirname, '../templates/template.html'), 'utf-8');
  const htmlContent = htmlTemplate.replace('{{nama}}', peserta.nama).replace('{{event}}', peserta.event);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  const pdfBuffer = await page.pdf({ format: 'A4' });
  await browser.close();

  res.set({ 'Content-Type': 'application/pdf' });
  res.send(pdfBuffer);
});

module.exports = router;
