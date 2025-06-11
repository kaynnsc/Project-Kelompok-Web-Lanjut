const express = require("express");
const router = express.Router();
const Peserta = require("../models/Peserta");
const admins = require("../admins");

// Middleware basic auth sederhana
function adminAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return res.status(401).json({ message: "Authorization required" });
  }

  const base64Credentials = authHeader.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString("ascii");
  const [username, password] = credentials.split(":");

  const admin = admins.find(
    (a) => a.username === username && a.password === password && a.role === "admin"
  );

  if (!admin) {
    return res.status(403).json({ message: "Forbidden: invalid credentials" });
  }

  req.admin = admin; // Store admin info
  next();
}

// Get semua pendaftar (dilindungi admin)
router.get("/pendaftar", adminAuth, async (req, res) => {
  try {
    const semua = await Peserta.find();
    res.json(semua);
  } catch (error) {
    console.error("Error get pendaftar:", error);
    res.status(500).json({ message: "Server error saat mengambil data pendaftar" });
  }
});

// Verifikasi peserta (dilindungi admin)
router.post("/verifikasi/:id", adminAuth, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["verified", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Status tidak valid" });
  }

  try {
    const updated = await Peserta.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Peserta tidak ditemukan" });
    }

    res.json(updated);
  } catch (error) {
    console.error("Error saat verifikasi:", error);
    res.status(500).json({ message: "Server error saat verifikasi peserta" });
  }
});

module.exports = router;