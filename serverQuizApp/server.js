

const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

dotenv.config(); // Load konfigurasi .env

const app = express();
app.use(express.json()); // Middleware untuk parsing JSON

// Rute untuk registrasi dan login
app.use('/api/auth', authRoutes);
app.use('/api', feedbackRoutes);


// Menjalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
