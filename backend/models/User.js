const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); 

const UserSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  nim: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  // ga perlu pake models admin, soalnya disini sudah bisa ditentuin. Tinggal diubah aja di mongodb untuk rolenya
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  // fitur verifikasi
  status: { type: String, enum: ['unverified', 'verified', 'rejected'], default: 'unverified' },
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', UserSchema);