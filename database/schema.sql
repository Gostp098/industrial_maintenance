CREATE TABLE requests (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL,
  phone VARCHAR(40) NOT NULL,
  address VARCHAR(220) NOT NULL,
  service VARCHAR(50) NOT NULL,
  "type" VARCHAR(20) NOT NULL DEFAULT 'service',
  urgency VARCHAR(20) NOT NULL DEFAULT 'medium',
  description TEXT NOT NULL,
  preferred_date DATE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);