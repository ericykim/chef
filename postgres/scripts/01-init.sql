-- Create postgres user
CREATE USER postgres WITH ENCRYPTED PASSWORD 'postgres';

-- Integration test database
CREATE DATABASE integration_test;

-- UUID creation extension
CREATE EXTENSION pgcrypto;

-- Grant superuser privileges to postgres user.
ALTER USER postgres WITH SUPERUSER;
GRANT ALL PRIVILEGES ON DATABASE integration_test TO chef;

