const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Employee = require("./lib/Employee");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employeeArray = [];

// function asking employee class questions
function init(){
    inquirer.prompt([
        {
            type: "input",
            message: "What is your name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is your id?",
            name: "id"
        },
        {
            type: "input",
            message: "What is your email?",
            name: "email"
        },
        {
            type: "list",
            message: "What is your role?",
            name: "role",
            choices: [
                "Manager",
                "Engineer",
                "Intern" 
            ]
        }
    ]).then(function(response){
        const employee = new Employee(response.name, response.id, response.email);
        if(response.role === "Manager"){ 
            managerQuestions(response);
        }
        else if(response.role === "Engineer"){
            engineerQuestions(response);
        }
        else if(response.role === "Intern"){
            internQuestions(response);
        }     
    })
}
// Manager specific question
function managerQuestions(response){
    inquirer.prompt([
        {
            type: "input",
            message: "What is your office number?",
            name: "officeNumber"
        },
        {
            type: "confirm",
            message: "Do you want to add another employee?",
            name: "addEmployee"
        }
    ]).then(function(responseManager){
        const manager = new Manager(response.name, response.id, response.email, responseManager.officeNumber);
        employeeArray.push(manager);
        if(responseManager.addEmployee === true){
            init();
        }
        else{
            htmlCreator(employeeArray);
        }
    })
}
// Engineer specific question
function engineerQuestions(response){
    inquirer.prompt([
        {
            type: "input",
            message: "What is your GitHub user name?",
            name: "githubname"
        },
        {
            type: "confirm",
            message: "Do you want to add another employee?",
            name: "addEmployee"
        }
    ]).then(function(responseEngineer){
        const engineer = new Engineer(response.name, response.id, response.email, responseEngineer.githubname);
        employeeArray.push(engineer);
        if(responseEngineer.addEmployee === true){
            init();
        }
        else{
            htmlCreator(employeeArray);
        }
    })
}
// Intern specific question
function internQuestions(response){
    inquirer.prompt([
        {
            type: "input",
            message: "What is your school name?",
            name: "school"
        },
        {
            type: "confirm",
            message: "Do you want to add another employee?",
            name: "addEmployee"
        }
    ]).then(function(responseIntern){
        const intern = new Intern(response.name, response.id, response.email, responseIntern.school);
        employeeArray.push(intern);
        if(responseIntern.addEmployee === true){
            init();
        }
        else{
            htmlCreator(employeeArray);
        }
    })
}
// function for creating team.html
function htmlCreator(employeeArray){
    var htmlTemplate = render(employeeArray);
    fs.writeFile(outputPath, htmlTemplate, function(err) {
        if (err) {
          return console.log(err);
        }
    });
}

init();