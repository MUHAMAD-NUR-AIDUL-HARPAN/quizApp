const db = require('../config/db'); // Pastikan Anda telah mengatur koneksi database Anda
const express = require('express');

// Mendapatkan semua feedback
const getFeedbacks = (req, res) => {
  const query = 'SELECT * FROM feedbacks';
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Gagal mengambil feedback' });
    }
    res.json(results);
  });
};

// Menambahkan feedback baru
const createFeedback = (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: 'Feedback tidak boleh kosong' });
  }

  const query = 'INSERT INTO feedbacks (text) VALUES (?)';
  db.query(query, [text], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Gagal menambahkan feedback' });
    }

    res.status(201).json({
      id: result.insertId,
      text,
    });
  });
};

// Memperbarui feedback berdasarkan ID
const updateFeedback = (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: 'Feedback tidak boleh kosong' });
  }

  const query = 'UPDATE feedbacks SET text = ? WHERE id = ?';
  db.query(query, [text, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Gagal memperbarui feedback' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Feedback tidak ditemukan' });
    }

    res.json({ message: 'Feedback berhasil diperbarui' });
  });
};

// Menghapus feedback berdasarkan ID
const deleteFeedback = (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM feedbacks WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Gagal menghapus feedback' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Feedback tidak ditemukan' });
    }

    res.json({ message: 'Feedback berhasil dihapus' });
  });
};

module.exports = {
  getFeedbacks,
  createFeedback,
  updateFeedback,
  deleteFeedback,
};
