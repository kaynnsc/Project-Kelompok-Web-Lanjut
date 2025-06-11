const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const Peserta = require('../models/Peserta');

router.get('/sertifikat/:id', async (req, res) => {
  try {
    const peserta = await Peserta.findById(req.params.id);
    if (!peserta || peserta.status !== 'verified') {
      return res.status(404).json({ message: 'Peserta tidak ditemukan atau belum diverifikasi' });
    }

    const htmlTemplate = fs.readFileSync(path.join(__dirname, '../templates/template.html'), 'utf-8');
    const htmlContent = htmlTemplate
      .replace('{{nama}}', peserta.nama)
      .replace('{{event}}', peserta.event)
      .replace('{{tanggal}}', new Date().toLocaleDateString('id-ID'));

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({ 
      format: 'A4',
      printBackground: true
    });
    await browser.close();

    res.set({ 
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="sertifikat_${peserta.nama}.pdf"`
    });
    res.send(pdfBuffer);
  } catch (err) {
    res.status(500).json({ message: 'Gagal menghasilkan sertifikat', error: err.message });
  }
});

module.exports = router;