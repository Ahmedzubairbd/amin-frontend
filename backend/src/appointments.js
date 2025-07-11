const express = require('express');
const router = express.Router();

// Example: In-memory appointments array (replace with DB logic)
const appointments = [
  { id: 1, patient: 'John Doe', doctor: 'Dr. Alice', date: '2024-07-11', time: '10:00' },
  { id: 2, patient: 'Jane Smith', doctor: 'Dr. Bob', date: '2024-07-12', time: '14:00' },
];

// GET /appointments
router.get('/', (req, res) => {
  res.json(appointments);
});

// POST /appointments
router.post('/', (req, res) => {
  const newAppointment = { id: appointments.length + 1, ...req.body };
  appointments.push(newAppointment);
  res.status(201).json(newAppointment);
});

module.exports = router; 