// server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
require('dotenv').config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api', require('./routes/pendaftaran'));
app.use('/api', require('./routes/verifikasi'));
app.use('/api', require('./routes/sertifikat'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
