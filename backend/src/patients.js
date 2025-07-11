const express = require('express');
const router = express.Router();

// Example: In-memory patients array (replace with DB logic)
const patients = [
  { id: 1, name: 'John Doe', age: 30, gender: 'male' },
  { id: 2, name: 'Jane Smith', age: 25, gender: 'female' },
];

// GET /patients
router.get('/', (req, res) => {
  res.json(patients);
});

// POST /patients
router.post('/', (req, res) => {
  const newPatient = { id: patients.length + 1, ...req.body };
  patients.push(newPatient);
  res.status(201).json(newPatient);
});

module.exports = router; 