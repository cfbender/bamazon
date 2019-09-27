const inquirer = require("inquirer");
const mysql = require("mysql");
const chalk = require("chalk");

//function to center text in the table
const padString = (str, endLength) => {
  let padStr = str.toString();
  let left = Math.floor((endLength - padStr.length) / 2) + padStr.length;
  let right = Math.floor((endLength - padStr.length) / 2) + left;
  return padStr.padStart(left + 1, " ").padEnd(right, " ");
};

module.exports = () => {
  connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
  });

  const products = {};

  const stock = async () => {
    return new Promise(async resolve => {
      console.log(
        chalk.green(
          "   _____________________________________________________________________________________"
        )
      );
      console.log(
        chalk.green(
          "   |                                   WELCOME TO BAMAZON                              |"
        )
      );
      console.log(
        chalk.green(
          "   -------------------------------------------------------------------------------------"
        )
      );
      console.log(
        chalk.blue(
          "   | Item ID |                       Product                     |   Price   |  Stock  |"
        )
      );
      console.log(
        chalk.blue(
          "   -------------------------------------------------------------------------------------"
        )
      );
      const query =
        "SELECT item_id, product_name, price, stock_quantity FROM products";

      connection.query(query, (err, res) => {
        if (err) throw err;
        //logs each item out with correct length padding
        res.forEach(item => {
          products[item.item_id] = {
            name: item.product_name,
            price: item.price,
            stock: item.stock_quantity
          };
          console.log(
            `   |${padString(item.item_id, 9)}|${padString(
              item.product_name,
              51
            )}|${padString(item.price, 11)}|${padString(
              item.stock_quantity,
              9
            )}|`
          );
          console.log(
            "   -------------------------------------------------------------------------------------"
          );
        });
        resolve(connection.end());
      });
    });
  };

  const itemSelect = async () => {
    let { id } = await inquirer.prompt([
      {
        type: "input",
        name: "id",
        message: "Input the Item ID of the item you would like to purchase: "
      }
    ]);

    id = parseInt(id);

    if (!products.hasOwnProperty(id)) {
      console.log("\nThat item ID does not exist! Please try another.\n");
      let id = await itemSelect();
      return id;
    } else {
      return id;
    }
  };

  const main = async () => {
    let id = await itemSelect();
  };

  connection.connect(async err => {
    if (err) throw err;
    await stock();
    main();
  });
};
