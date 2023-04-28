const mysql = require('mysql2');

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
    console.log(`Connected to employees_db`)
  );

  db.connect((err) => {
    if(err) throw new Error('Error:', err);
});

const promptInit =  {

showDept: () => {
  db.query(`SELECT * FROM ?`, `department`, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });
},

showRoles: () => {
  db.query(`SELECT * FROM`, `roles`, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });
},

showEmp: () => {
  db.query(`SELECT * FROM`, `employees`, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });
},

// addDept: () => {
//   db.query(`INSERT `)
// }
};

module.exports = {db, promptInit};
