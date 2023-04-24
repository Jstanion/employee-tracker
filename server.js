const mysql = require('mysql2');

// connect to database
const connection = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password -> TODO: store in an env file for protection.
      password: 'root',
      database: 'employees_db'
    },
    console.log(`Connected to employees_db`)
  );


