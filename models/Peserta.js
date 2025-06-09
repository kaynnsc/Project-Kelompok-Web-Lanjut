// models/Peserta.js
const mongoose = require('mongoose');

const pesertaSchema = new mongoose.Schema({
  nama: String,
  email: { type: String, unique: true },
  nim: { type: String, unique: true },
  event: String,
  status: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Peserta', pesertaSchema);
