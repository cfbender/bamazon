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
  //configure the connection
  connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
  });

  const itemIDs = [];

  const stock = async () => {
    return new Promise(async resolve => {
      //print out header with color
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
          itemIDs.push(item.item_id);
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
        resolve();
      });
    });
  };

  const itemSelect = async () => {
    //get ID of item to purchase
    let { id } = await inquirer.prompt([
      {
        type: "input",
        name: "id",
        message: "Input the Item ID of the item you would like to purchase: "
      }
    ]);
    //inquirer returns strings only
    id = parseInt(id);

    if (!itemIDs.includes(id)) {
      console.log("\nThat item ID does not exist! Please try another.\n");
      let id = await itemSelect();
      return id;
    } else {
      return id;
    }
  };

  const main = async id => {
    //get quantity to purchase
    let { quantity } = await inquirer.prompt([
      {
        type: "input",
        name: "quantity",
        message: "How many units would you like to purchase? "
      }
    ]);

    const query =
      "SELECT stock_quantity, price, product_sales FROM products WHERE ?";
    //query for quanity of selected item
    connection.query(query, { item_id: id }, (err, res) => {
      if (err) throw err;
      //if stock is enough to cover quanity
      if (res[0].stock_quantity >= quantity) {
        //calculate new stock and revenue
        let newQuantity = res[0].stock_quantity - quantity;
        let revenue = quantity * res[0].price;
        let newSales = res[0].product_sales + revenue;

        //create query
        let query = "UPDATE products SET ?, ? WHERE ?";
        connection.query(
          query,
          [
            { stock_quantity: parseInt(newQuantity) },
            { product_sales: parseFloat(newSales) },
            { item_id: parseInt(id) }
          ],
          err => {
            if (err) throw err;
            console.log(
              "\nSuccess! Your items will arrive soon. Have a great day and thank you for shopping with Bamazon.\n"
            );
            connection.end();
          }
        );
      } else {
        console.log("Insufficient quantity! Please try again. ");
        main(id);
      }
    });
  };

  connection.connect(async err => {
    if (err) throw err;
    await stock();
    let id = await itemSelect();
    main(id);
  });
};
