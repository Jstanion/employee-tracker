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

CREATE TABLE role (
    id INT NOT NULL, 
    title VARCHAR (30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
    );

