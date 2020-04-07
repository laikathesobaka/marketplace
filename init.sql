CREATE TABLE users (
    ID SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name varchar (255) NOT NULL
);