-- Create enums
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'product_type') THEN
        CREATE TYPE product_type AS ENUM ('Auto', 'Home', 'Health', 'Life', 'Travel', 'Business', 'Liability', 'Property');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'insurance_type') THEN
        CREATE TYPE insurance_type AS ENUM ('Comprehensive', 'Third Party', 'Basic', 'Premium', 'Standard', 'Custom', 'Term', 'Whole Life');
    END IF;
END$$;

-- Create tables if they don't exist
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS offers (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  price INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  product_type product_type NOT NULL,
  insurance_type insurance_type NOT NULL
);

-- Insert admin user with bcrypt-hashed password for '123456q!'
INSERT INTO users (email, password)
VALUES ('admin@admin.com', '$2b$10$29N5ja8fJslB.de6y9hSbeMbHlaTZm/PlfbDg76vAtvW3zb.x8jdy');

-- Insert sample offers data
INSERT INTO offers (title, price, product_type, insurance_type)
VALUES
  ('Auto Insurance Basic', 1499, 'Auto', 'Basic'),
  ('Premium Home Protection', 2999, 'Home', 'Premium'),
  ('Comprehensive Health Plan', 5999, 'Health', 'Comprehensive'),
  ('Term Life Insurance', 3499, 'Life', 'Term'),
  ('Business Liability Coverage', 7999, 'Business', 'Standard'),
  ('Travel Insurance Premium', 999, 'Travel', 'Premium'),
  ('Property Insurance', 4499, 'Property', 'Basic'),
  ('Auto Premium Coverage', 2999, 'Auto', 'Premium'); 