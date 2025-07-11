const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'healthy', timestamp: new Date().toISOString() });
  } catch (error) {
    res.status(503).json({ status: 'unhealthy', error: error.message });
  }
});

app.get('/', (req, res) => {
  res.send('Amin Diagnostics Backend API is running.');
});

const patientsRouter = require('./patients');
const doctorsRouter = require('./doctors');
const appointmentsRouter = require('./appointments');
const reportsRouter = require('./reports');
const servicesRouter = require('./services');
const filesRouter = require('./files');

app.use('/patients', patientsRouter);
app.use('/doctors', doctorsRouter);
app.use('/appointments', appointmentsRouter);
app.use('/reports', reportsRouter);
app.use('/services', servicesRouter);
app.use('/files', filesRouter);

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
}); 