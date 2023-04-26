// Import helper files and Utils here
const inquirer = require('inquirer');

inquirer
.prompt([
    {
        type: "list",
        name: "departments",
        message: "Please select from the following options:",
        choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"]
    },
])