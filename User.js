const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nama: String,
  nim: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  status: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'pending' }
});

module.exports = mongoose.model('User', UserSchema);
