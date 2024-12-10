const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Registrasi pengguna baru
const registerUser = (req, res) => {
  const { username, email, password } = req.body;

  // Cek apakah email sudah ada
  const query = 'SELECT * FROM users WHERE email = ?';
  db.execute(query, [email], async (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
    if (result.length > 0) {
      return res.status(400).json({ message: 'Email sudah terdaftar' });
    }

    // Hash password sebelum disimpan
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan pengguna baru
    const insertQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.execute(insertQuery, [username, email, hashedPassword], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Gagal mendaftar pengguna' });
      }

      res.status(201).json({
        message: 'Pengguna berhasil terdaftar',
        userId: result.insertId,
      });
    });
  });
};

// Login pengguna
const loginUser = (req, res) => {
  const { email, password } = req.body;

  // Cek apakah pengguna ada
  const query = 'SELECT * FROM users WHERE email = ?';
  db.execute(query, [email], async (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
    if (result.length === 0) {
      return res.status(400).json({ message: 'Email atau password salah' });
    }

    const user = result[0];
    
    // Verifikasi password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Email atau password salah' });
    }

    // Buat JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({
      message: 'Login berhasil',
      token,
    });
  });
};

module.exports = {
  registerUser,
  loginUser,
};
