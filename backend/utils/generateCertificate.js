const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const generateCertificatePDF = async (certificate, res) => {
  const templatePath = path.join(__dirname, '..', 'templates', 'certificate-template.html');
  const htmlContent = await ejs.renderFile(templatePath, {
    nama_peserta: certificate.nama_peserta,
    peran: certificate.peran,
    nama_event: certificate.nama_event,
    penyelenggara: certificate.penyelenggara,
    tanggal_event: new Date(certificate.tanggal_event).toLocaleDateString('id-ID')
  });

  // For simplicity, we'll use PDFKit to generate PDF (you can integrate with html-pdf or puppeteer for HTML rendering)
  const doc = new PDFDocument({
    size: 'A4',
    layout: 'landscape'
  });

  const fileName = `certificate-${certificate._id}.pdf`;
  const filePath = path.join(__dirname, '..', 'certificates', fileName);

  if (!fs.existsSync(path.join(__dirname, '..', 'certificates'))) {
    fs.mkdirSync(path.join(__dirname, '..', 'certificates'));
  }

  const stream = fs.createWriteStream(filePath);
  doc.pipe(stream);

  doc.fontSize(40).text('SERTIFIKAT', 0, 100, { align: 'center' });
  doc.fontSize(20).text('Diberikan kepada:', 0, 180, { align: 'center' });
  doc.fontSize(30).text(certificate.nama_peserta, 0, 220, { align: 'center' });
  doc.fontSize(16).text(
    `Sebagai ${certificate.peran} dalam ${certificate.nama_event}`,
    0, 260, 
    { align: 'center' }
  );
  doc.fontSize(14).text(
    `Diselenggarakan oleh ${certificate.penyelenggara} pada ${new Date(certificate.tanggal_event).toLocaleDateString('id-ID')}`,
    0, 300,
    { align: 'center' }
  );

  doc.end();

  return new Promise((resolve, reject) => {
    stream.on('finish', () => {
      res.download(filePath, fileName, (err) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        fs.unlinkSync(filePath);
        resolve();
      });
    });
    stream.on('error', reject);
  });
};

module.exports = generateCertificatePDF;
