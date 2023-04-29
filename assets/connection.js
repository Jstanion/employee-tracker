const mysql = require('mysql2/promise');

// connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password -> TODO: store in an env file for protection.
      password: 'root',
      database: 'employees_db'
    },
);

db.connect((err) => {
  if(err) {
    console.log('Error connecting to database:', err);
  } else {
    console.log('Connected to employees_db');
  }
});

const promptInit =  {
  showDept: () => {
    db.query(`SELECT * FROM department;`, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.table(result);
    });
  },

  showRoles: () => {
    db.query(`SELECT * FROM role`, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.table(result);
    });
  },

  showEmp: () => {
    db.query(`SELECT * FROM employee`, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.table(result);
    });
  },

  addDept: () => {
    db.query(`INSERT INTO department ()`)
  }
};

module.exports = {promptInit};
