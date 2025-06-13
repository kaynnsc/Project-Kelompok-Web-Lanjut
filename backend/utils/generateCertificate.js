const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const generateCertificatePDF = async (certificate, res) => {
  let browser;
  try {
    // membaca dan render template HTML menjadi sebuah string
    const templatePath = path.join(__dirname, '..', 'templates', 'certificate-template.html');
    const templateString = fs.readFileSync(templatePath, 'utf-8');

    // merender string template tersebut dengan data dari EJS
    const renderedHtml = ejs.render(templateString, {
      nama_peserta: certificate.nama_peserta,
      nim: certificate.nim,
      peran: certificate.peran,
      nama_event: certificate.nama_event,
      penyelenggara: certificate.penyelenggara,
      tanggal_event: certificate.tanggal_event
    });

    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    await page.setContent(renderedHtml, { waitUntil: 'load' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      landscape: true,
      printBackground: true
    });

    await browser.close();

    // menyimpan PDF ke file sementara di server
    const tempDir = path.join(__dirname, '..', 'tmp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }
    const tempFilePath = path.join(tempDir, `sertifikat-temp-${certificate._id}.pdf`);
    fs.writeFileSync(tempFilePath, pdfBuffer);

    console.log(`PDF sementara disimpan di: ${tempFilePath}`);

    // mengirim file yang sudah disimpan menggunakan res.download()
    // Metode ini lebih andal untuk mengirim file.
    res.download(tempFilePath, `sertifikat-${certificate._id}.pdf`, (err) => {
      if (err) {
        // jika ada error saat mengirim, log errornya
        console.error('Error saat mengirim file PDF:', err);
      }
      
      // selalu hapus file sementara setelah proses pengiriman selesai (baik berhasil maupun gagal)
      fs.unlinkSync(tempFilePath);
      console.log(`File sementara ${tempFilePath} telah dihapus.`);
    });

  } catch (error) {
    console.error('===========================================');
    console.error('PUPPETEER GAGAL MEMBUAT PDF:');
    console.error(error);
    console.error('===========================================');
    
    if (browser) {
      await browser.close();
    }
    // mengirim respons error hanya jika header belum terkirim
    if (!res.headersSent) {
        res.status(500).json({ error: 'Gagal membuat file PDF karena masalah di server.' });
    }
  }
};

module.exports = generateCertificatePDF;
