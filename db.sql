#criar db
CREATE DATABASE users_db;

#criar tabela
CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
    name TEXT NOT NULL,
    username TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    birth date,
    gender TEXT NOT NULL
);