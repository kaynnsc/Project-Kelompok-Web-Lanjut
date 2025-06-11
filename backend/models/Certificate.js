const mongoose = require('mongoose');

const CertificateSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  nama_peserta: String,
  nim: String,
  nama_event: String,
  penyelenggara: String,
  tanggal_event: Date,
  peran: String,
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
});

module.exports = mongoose.model('Certificate', CertificateSchema);
