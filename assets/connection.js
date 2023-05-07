const mysql = require('mysql2');
const inquirer = require('inquirer');
require('dotenv').config();
const cTable = require('console.table');

// connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      // MySQL password stored in a seperate file
      password: process.env.PASSWORD,
      database: 'employees_db'
    },
);

// Checks for any connection errors
db.connect((err) => {
  if(err) {
    console.log('Error connecting to database:', err);
  } else {
    console.log('Connected to employees_db');
  }
});

// Object containing all methods listed in the switch operator in server.js switch operator
const promptInit =  {

  // Method that grabs all current data in the department table
  showDept: () => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM department;`, (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        console.table(result);
        resolve();
      });
    });
  },

  // Method that grabs all cureent data in the role table
  showRoles: () => {
    return new Promise((resolve, reject) => {
    db.query(`SELECT role.id, role.title, department.department_name, role.salary
    FROM role
    JOIN department ON role.department_id = department.id`, (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      console.table(result);
      resolve();
    });
    });
  },

  // Method that grabs all current data in the employee table
  showEmp: () => {
    return new Promise((resolve, reject) => {
    db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name
    FROM employee
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id`
    , (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      console.table(result);
      resolve();
    });
    });
  },

  // MEthod that runs a new inquirer prompt to add new dept data to the table
  addDept: () => {
    return new Promise((resolve, reject) => {
      // Prompts to add a new dept to database
      inquirer.prompt([
        {
          type: "input",
          name: "deptName",
          message: "What is the name of the department?"
        }

      // Query that inserts user input into the dept table
      ]).then((answers) => {
        const deptName = answers.deptName;
        db.query(`INSERT INTO department (department_name)
        VALUES ('${deptName}')`);
        console.log(`Added ${deptName} to the database.`)
        resolve();
      }).catch((err) => {
        console.log('Error found:', err)
        reject(err);
      });
    });
  },

  // Method that runs a new inquirer prompt to add new role data to the table
  addRole: () => {
    return new Promise((resolve, reject) => {

      // Prompts to add a new role to database
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
                  name: row.department_name,
                  value: parseInt(row.id),
                }));
                resolve(choices);
              });
            });
          }
        }

      // Query that inserts user input into the role table
      ]).then((answers) => {
        db.query(`INSERT INTO role (title, salary, department_id)
        VALUES 
          ("${answers.roleName}", ${answers.salAmt}, ${answers.deptChoice});`);
        console.log(`Added ${answers.roleName} to the database.`)
        resolve();
      }).catch((err) => {
          console.log('Error found:', err)
          reject(err);
      });
    });
  },

  // Method that runs a new inquirer prompt to add new employee data to the table
  addEmp: () => {
    return new Promise((resolve, reject) => {

      // Prompts to add a new employee to database
      inquirer.prompt([
        {
          type: "input",
          name: "firstName",
          message: "What is the employee's first name?"
        },
        {
          type: "input",
          name: "lastName",
          message: "What is the employee's last name?"
        },
        {
          type: "list",
          name: "empRole",
          message: "What is the employee's role?",

          // Query function to pull current values from the role table
          choices: () => {
            return new Promise((resolve, reject) => {
              db.query("SELECT id, title FROM role", (err, results) => {
                if (err) reject(err);
                const choices = results.map((row) => ({
                  name: row.title,
                  value: parseInt(row.id),
                }));
                resolve(choices);
              });
            });
          }
        },
        {
          type: "list",
          name: "empManager",
          message: "Who is the employee's manager?",

          // Query function to pull current manager id values from employee table
          choices: () => {
            return new Promise((resolve, reject) => {
              db.query("SELECT CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name, employee.manager_id FROM employee JOIN employee AS manager ON employee.manager_id = manager.id", (err, results) => {
                if (err) reject(err);
                const choices = results.map((row) => ({
                  name: row.manager_name,
                  value: parseInt(row.manager_id),
                }));
                resolve(choices);
              });
            });
          }
        }

      // Query that inserts user input into the employee table
      ]).then((answers) => {
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES 
          ("${answers.firstName}", "${answers.lastName}", ${answers.empRole}, ${answers.empManager});`);
        console.log(`Added ${answers.firstName} ${answers.lastName} to the database.`)
        resolve();
      }).catch((err) => {
        reject(err);
      });
    });
  },

  // Method that runs a new inquirer prompt to update an employee's role
  updateEmpRole: () => {
    return new Promise((resolve, reject) => {

      // Prompts to list existing employee's and roles from database
      inquirer.prompt([
        {
          type: "list",
          name: "selectEmp",
          message: "Which employee's role do you want to update?",

          // Query function to pull current values from employee table
          choices: () => {
            return new Promise((resolve, reject) => {
              db.query("SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee", (err, results) => {
                if (err) reject(err);
                const choices = results.map((row) => ({
                  name: row.name,
                  value: parseInt(row.id),
                }));
                resolve(choices);
              });
            });
          }
        },
        {
          type: "list",
          name: "updatedRole",
          message: "Which role do you want to assign the selected employee?",

          // Query function to pull current values from the role table
          choices: () => {
            return new Promise((resolve, reject) => {
              db.query("SELECT id, title FROM role", (err, results) => {
                if (err) reject(err);
                const choices = results.map((row) => ({
                  name: row.title,
                  value: parseInt(row.id),
                }));
                resolve(choices);
              });
            });
          }
        }

      // Query that updates the employee role data based on user selection
      ]).then((answers) => {
        db.query(`UPDATE employee SET role_id = ${answers.updatedRole} WHERE id = ${answers.selectEmp}`);
        console.log(`Updated employee's role`)
        resolve();
      }).catch((err) => {
          console.log('Error found:', err)
          reject(err);
        });
      });
    },
};

module.exports = {promptInit};
