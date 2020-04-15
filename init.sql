CREATE EXTENSION pgcrypto;


CREATE TABLE users (
    ID SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL
);