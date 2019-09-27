const inquirer = require("inquirer");

const stock = require("../lib/stock");

const choices = [
  "View Products for Sale",
  "View Low Inventory",
  "Add to Inventory",
  "Add New Product"
];

/**
 *
 * Prompts the user for the choice of operation
 * @returns {string} choice of operation
 */
const initPrompt = async () => {
  const { choice } = await inquirer.prompt([
    {
      type: "list",
      choices: choices,
      message: "Select the Bamazon operation you would like to do: ",
      name: "choice"
    }
  ]);

  return choice;
};

/**
 *
 * Prints out all items with quantity less than 5;
 * @param {Object} connection to MySQL database
 */
const lowInv = async connection => {
  const filter = item => parseInt(item.stock_quantity) < 5;
  await stock(connection, filter);
};

const addInv = connection => {};

/**
 *
 * Gets user choice and switches on it to call correct functionality
 * @param {Object} connection to MySQL database
 */
module.exports = async connection => {
  let choice = await initPrompt();

  switch (choice) {
    case "View Products for Sale":
      await stock(connection);
      connection.end();
      break;
    case "View Low Inventory":
      lowInv(connection);
      connection.end();
      break;
    case "Add to Inventory":
      addInv(connection);
      connection.end();
      break;
    case "Add New Product":
      addNew(connection);
      connection.end();
      break;
  }
};
