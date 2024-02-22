CREATE DATABASE pruebatecnica;


CREATE TABLE users (
    id SERIAL NOT NULL PRIMARY KEY,
    email VARCHAR(320) NOT NULL,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

INSERT INTO users (email, name, phone, address, password) VALUES ('prueba@probando.com', 'prueba', '3442123456', 'mitre 677', 'abc123');