// Import helper files and Utils here
const inquirer = require('inquirer');
const { promptInit } = require('./assets/connection.js')

const appInit = () => {
    inquirer.prompt([

        // Present options to the user:
        {
            type: "list",
            name: "userChoice",
            message: "What would you like to do?",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an employee role",
                "Quit"
            ]
        },
    ]).then((answers) => {

        // Runs multiple conditional statements based on user selection in the above prompt.
        switch (answers.userChoice) {
            case "View all departments":
                // SQL command to show a formatted table that lists all the department names and ids.
                promptInit.showDept();
                // return appInit()
                break;
                
            case "View all roles":
                // Show a formatted table that lists the job title, role id, department that role belongs to, and the salary for that role.
                promptInit.showRoles();
                break;
            case "View all employees":
                // Show a formatted table that lists the employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to.
                promptInit.showEmp();
                break;
            case "Add a department":
                // Prompt the user to enter the name of the department and add it to the database.
                promptInit.addDept();
                break;
            case "Add a role":
                // Prompt the user to enter the name, salary, and department for the role and add it to the database.

                break;
            case "Add an employee":
                // Prompt the user to enter the employee’s first name, last name, role, and manager, and add it to the database.

                break;
            case "Update an employee role":
                // Prompt the user to select an employee to update and their new role, and update that information in the database.

                break;
            default: return console.log("Exiting application.")
        }
    }).catch((err) => {
        console.log('Error found:', err);
    });
};

appInit();