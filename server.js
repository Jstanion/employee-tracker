// Import helper files and Utils here
const inquirer = require('inquirer');
// const { disDepartments, disRoles, disEmployees, addDepartment, addRole, addEmployee}

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
    switch (answers.userChoice) {
        case "View all departments":
            // SQL command to display the department table values

            break;
        case "View all roles":
            
            break;
        case "View all employees":
            
            break;
        case "Add a department":
            
            break;
        case "Add a role":
            
            break;
        case "Add an employee":
            
            break;
        case "Update an employee role":
            
            break;
        case "Quit":
            
            break;

        default: return console.log("Exiting application.")
            break;
    }
}).catch((err) => {
    console.log('Error found:', err);
});



// If the user selects "view all departments," show a formatted table that lists all the department names and ids.

// If the user selects "view all roles," show a formatted table that lists the job title, role id, department that role belongs to, and the salary for that role.

// If the user selects "view all employees," show a formatted table that lists the employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to.

// If the user selects "add a department," prompt the user to enter the name of the department and add it to the database.

// If the user selects "add a role," prompt the user to enter the name, salary, and department for the role and add it to the database.

// If the user selects "add an employee," prompt the user to enter the employee’s first name, last name, role, and manager, and add it to the database.

// If the user selects "update an employee role," prompt the user to select an employee to update and their new role, and update that information in the database.