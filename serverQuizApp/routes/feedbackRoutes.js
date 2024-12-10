const express = require('express');
const {
  getFeedbacks,
  createFeedback,
  updateFeedback,
  deleteFeedback,
} = require('../controllers/feedbackController');

const router = express.Router();

router.get('/feedbacks', getFeedbacks);
router.post('/feedbacks', createFeedback);
router.put('/feedbacks/:id', updateFeedback);
router.delete('/feedbacks/:id', deleteFeedback);

module.exports = router;
