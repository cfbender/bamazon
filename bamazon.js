const customer = require("./src/customer");
const manager = require("./src/manager");
const supervisor = require("./src/supervisor");
const mysql = require("mysql");

const [, , arg] = process.argv;

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon"
});

switch (arg) {
  case "-customer":
  case "-c":
    customer(connection);
    break;
  case "-manager":
  case "-m":
    manager(connection);
    break;
  case "-supervisor":
  case "-s":
    supervisor(connection);
    break;
  case "-help":
  case "-h":
  default:
    console.log(
      "\nAs a customer, if you require help, please run the command: node bamazon.js -c OR -customer\n\nOtherwise, please refer to the employee handbook for assistance."
    );
    break;
}
