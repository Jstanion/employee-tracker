const mysql = require('mysql2');
const inquirer = require('inquirer');

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
    db.query(`SELECT role.id, role.title, department.name, role.salary
    FROM role
    JOIN department ON role.department_id = department.id`, (err, result) => {
      
      if (err) {
        console.log(err);
      }
      console.table(result);
    });
  },

  showEmp: () => {
    db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name
    FROM employee
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id`
    , (err, result) => {
      if (err) {
        console.log(err);
      }
      console.table(result,);
    });
  },

  addDept: () => {
    // Prompts to add a new dept to database
    inquirer.prompt([
      {
        type: "input",
        name: "deptName",
        message: "What is the name of the department?"
      }
    ]).then((answers) => {
      const deptName = answers.deptName;
      db.query(`INSERT INTO department (name)
      VALUES ('${deptName}')`);
      console.log(`Added ${deptName} to the database.`)
    }).catch((err) => {
        console.log('Error found:', err)
    });
  },

  addRole: () => {

    // Prompts to add a new dept to database
    inquirer.prompt([
      {
        type: "input",
        name: "roleName",
        message: "What is the name of the role?"
      },
      {
        type: "input",
        name: "salAmt",
        message: "What is the salary of the role?"
      },
      {
        type: "list",
        name: "deptChoice",
        message: "Which department does the role belong to?",

        // Query function to pull current values from department table
        choices: () => {
          return new Promise((resolve, reject) => {
            db.query("SELECT * FROM department", (err, results) => {
              if (err) reject(err);
              const choices = results.map((row) => ({
                name: row.name,
                value: parseInt(row.id),
              }));
              resolve(choices);
            });
          });
        }
      }
    ]).then((answers) => {
      console.log(answers.roleName, answers.salAmt, answers.deptChoice);
      db.query(`INSERT INTO role (title, salary, department_id)
      VALUES 
        ("${answers.roleName}", ${answers.salAmt}, ${answers.deptChoice});`);
      console.log(`Added ${answers.roleName} to the database.`)
    }).catch((err) => {
        console.log('Error found:', err)
    });
  },

};

module.exports = {promptInit};
