const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const router = express.Router();

// Rute untuk registrasi
router.post('/register', registerUser);

// Rute untuk login
router.post('/login', loginUser);

module.exports = router;
