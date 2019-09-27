const inquirer = require("inquirer");
const chalk = require("chalk");
const padString = require("../lib/padString");

/**
 *
 * Prints out a summarized table for Product Sales By Department
 * @param {object} connection A connection to a MySQL Database
 */
const viewSales = connection => {
  let query =
    "SELECT departments.department_id, departments.department_name, AVG(departments.over_head_costs) over_head_costs, SUM(products.product_sales) product_sales, SUM(over_head_costs - product_sales) total_profit ";
  query +=
    "FROM departments LEFT JOIN products ON (products.department_id = departments.department_id) ";
  query += "GROUP BY departments.department_name, departments.department_id;";

  connection.query(query, (err, res) => {
    if (err) throw err;
    console.log(
      "\n",
      chalk.blue(
        "   -----------------------------------------------------------------------------------------------------------"
      )
    );
    console.log(
      chalk.blue(
        "   | Department ID |       Department Name       |   Overhead Costs  |  Product Sales  |   Total Profit   |"
      )
    );
    console.log(
      chalk.blue(
        "   -----------------------------------------------------------------------------------------------------------"
      )
    );
    res.forEach(item => {
      console.log(
        `   |${padString(item.department_id, 15)}|${padString(
          item.department_name,
          29
        )}|${padString("$ " + item.over_head_costs, 19)}|${padString(
          item.product_sales,
          17
        )}|${padString(item.total_profit, 18)}|`
      );
      console.log(
        "   -------------------------------------------------------------------------------------"
      );
    });
    connection.end();
  });
};

/**
 *
 *
 * @param {object} connection A connection to a MySQL Database
 */
module.exports = async connection => {
  let choices = ["View Product Sales by Department", "Create New Department"];
  let { choice } = await inquirer.prompt([
    {
      type: "list",
      choices: choices,
      message: "What would you like to do?",
      name: "choice"
    }
  ]);

  switch (choice) {
    case "View Product Sales by Department":
      viewSales(connection);
      break;
    case "Create New Department":
      createDep(connection);
      break;
  }
};
