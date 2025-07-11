const express = require('express');
const router = express.Router();

// Example: In-memory doctors array (replace with DB logic)
const doctors = [
  { id: 1, name: 'Dr. Alice', specialty: 'Cardiology' },
  { id: 2, name: 'Dr. Bob', specialty: 'Neurology' },
];

// GET /doctors
router.get('/', (req, res) => {
  res.json(doctors);
});

// POST /doctors
router.post('/', (req, res) => {
  const newDoctor = { id: doctors.length + 1, ...req.body };
  doctors.push(newDoctor);
  res.status(201).json(newDoctor);
});

module.exports = router; 