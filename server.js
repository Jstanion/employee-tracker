// Import helper files and Utils here
const inquirer = require('inquirer');
const { promptInit } = require('./assets/connection.js');
const logo = require('asciiart-logo');

const init = () => {
    const logoText = logo({name: "Employee Tracker"}).render();
    
    console.log(logoText);
    appInit();
};

const appInit = async () => {
    const answers = await inquirer.prompt([

        // Present inintial options to the user:
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
    ]);

    // Runs multiple conditional statements based on user selection in the above prompt.
    switch (answers.userChoice) {
        case "View all departments":
            promptInit.showDept().then(() => {
                appInit();
            }).catch((err) => {
                console.log('Error found:', err);
            });
            break;
        case "View all roles":

            // Show a formatted table that lists the job title, role id, department that role belongs to, and the salary for that role.
            promptInit.showRoles().then(() => {
                appInit();
            }).catch((err) => {
                console.log('Error found:', err);
            });
            break;
        case "View all employees":

            // Show a formatted table that lists the employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to.
            promptInit.showEmp().then(() => {
                appInit();
            }).catch((err) => {
                console.log('Error found:', err);
            });
            break;
        case "Add a department":

            // Prompt the user to enter the name of the department and add it to the database.
            promptInit.addDept().then(() => {
                appInit();
            }).catch((err) => {
                console.log('Error found:', err);
            });
            break;
        case "Add a role":

            // Prompt the user to enter the name, salary, and department for the role and add it to the database.
            promptInit.addRole().then(() => {
                appInit();
            }).catch((err) => {
                console.log('Error found:', err);
            });
            break;
        case "Add an employee":

            // Prompt the user to enter the employee’s first name, last name, role, and manager, and add it to the database.
            promptInit.addEmp().then(() => {
                appInit();
            }).catch((err) => {
                console.log('Error found:', err);
            });
            break;
        case "Update an employee role":

            // Prompt the user to select an employee and to update their new role information in the database.
            promptInit.updateEmpRole().then(() => {
                appInit();
            }).catch((err) => {
                console.log('Error found:', err);
            });
            break;
        default: 
            console.log("Exiting application.");
    }
};

// Calls initial function to run
init();