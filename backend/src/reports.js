const express = require('express');
const router = express.Router();

// Example: In-memory reports array (replace with DB logic)
const reports = [
  { id: 1, patient: 'John Doe', type: 'Blood Test', result: 'Normal', date: '2024-07-10' },
  { id: 2, patient: 'Jane Smith', type: 'X-Ray', result: 'Clear', date: '2024-07-09' },
];

// GET /reports
router.get('/', (req, res) => {
  res.json(reports);
});

// POST /reports
router.post('/', (req, res) => {
  const newReport = { id: reports.length + 1, ...req.body };
  reports.push(newReport);
  res.status(201).json(newReport);
});

module.exports = router; 