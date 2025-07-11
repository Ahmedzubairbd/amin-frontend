const express = require('express');
const router = express.Router();

// Example: In-memory services array (replace with DB logic)
const services = [
  { id: 1, name: 'Blood Test', price: 100 },
  { id: 2, name: 'X-Ray', price: 200 },
];

// GET /services
router.get('/', (req, res) => {
  res.json(services);
});

// POST /services
router.post('/', (req, res) => {
  const newService = { id: services.length + 1, ...req.body };
  services.push(newService);
  res.status(201).json(newService);
});

module.exports = router; 