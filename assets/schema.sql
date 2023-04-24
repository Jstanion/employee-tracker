-- Drops the sample_db --
DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

-- Uses the books_db database --
USE employees_db;

-- Create tables
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR (30) NOT NULL
    );
