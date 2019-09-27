const customer = require("./src/customer");
const manager = require("./src/manager");
const supervisor = require("./src/supervisor");

const [, , arg] = process.argv;

switch (arg) {
  case "-customer":
  case "-c":
    customer();
    break;
  case "-manager":
  case "-m":
    manager();
    break;
  case "-supervisor":
  case "-s":
    supervisor();
    break;
  case "-help":
  case "-h":
  default:
    console.log(
      "\nAs a customer, if you require help, please run the command: node bamazon.js -c OR -customer\n\nOtherwise, please refer to the employee handbook for assistance."
    );
    break;
}
