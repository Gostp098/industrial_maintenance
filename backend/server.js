const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ---------- Routes for "requests" table ----------

// GET all requests
app.get('/api/requests', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM requests ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET a single request by ID
app.get('/api/requests/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM requests WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Request not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST a new request
app.post('/api/requests', async (req, res) => {
  const {
    name,
    email,
    phone,
    address,
    service,
    type,
    urgency,
    description,
    preferred_date,
  } = req.body;

  // Basic validation
  if (!name || !email || !phone || !address || !service || !description || !preferred_date) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO requests 
       (name, email, phone, address, service, type, urgency, description, preferred_date) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
       RETURNING *`,
      [name, email, phone, address, service, type || 'service', urgency || 'medium', description, preferred_date]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT (full update) a request by ID
app.put('/api/requests/:id', async (req, res) => {
  const { id } = req.params;
  const {
    name,
    email,
    phone,
    address,
    service,
    type,
    urgency,
    description,
    preferred_date,
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE requests 
       SET name = $1, email = $2, phone = $3, address = $4, 
           service = $5, type = $6, urgency = $7, 
           description = $8, preferred_date = $9 
       WHERE id = $10 RETURNING *`,
      [name, email, phone, address, service, type, urgency, description, preferred_date, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Request not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE a request by ID
app.delete('/api/requests/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM requests WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Request not found' });
    }
    res.json({ message: 'Request deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Simple health check
app.get('/', (req, res) => {
  res.send('Industrial Maintenance Backend is running');
});

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});