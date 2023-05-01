const appInit = async () => {
    try {
        const answers = await inquirer.prompt([

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
        ]);
    
        // Runs multiple conditional statements based on user selection in the above prompt.
        switch (answers.userChoice) {
            case "View all departments":
                // SQL command to show a formatted table that lists all the department names and ids.
                await promptInit.showDept();
                break;
            case "View all roles":
                // Show a formatted table that lists the job title, role id, department that role belongs to, and the salary for that role.
                await promptInit.showRoles();
                break;
            case "View all employees":
                // Show a formatted table that lists the employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to.
                await promptInit.showEmp();
                break;
            case "Add a department":
                // Prompt the user to enter the name of the department and add it to the database.
                await promptInit.addDept();
                break;
            case "Add a role":
                // Prompt the user to enter the name, salary, and department for the role and add it to the database.
                await promptInit.addRole();
                break;
            case "Add an employee":
                // Prompt the user to enter the employee’s first name, last name, role, and manager, and add it to the database.
                await promptInit.addEmp();
                break;
            case "Update an employee role":
                // Prompt the user to select an employee to update and their new role, and update that information in the database.
                await promptInit.updateEmpRole();
                break;
            default: 
                console.log("Exiting application.");
                return;
        }

        // call appInit() after displaying the data
        await appInit();
    } catch (err) {
        console.log('Error found:', err);
    }
};