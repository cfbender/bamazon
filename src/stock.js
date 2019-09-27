const chalk = require("chalk");

//function to center text in the table

const padString = (str, endLength) => {
  let padStr = str.toString();
  let left = Math.floor((endLength - padStr.length) / 2) + padStr.length;
  let right = Math.floor((endLength - padStr.length) / 2) + left;
  return padStr.padStart(left + 1, " ").padEnd(right, " ");
};

/**
 *
 * Displays all items in database formatted with id, name, price and quantity
 * @param {object} connection
 * @returns {Promise} Promise object contains an array with all item IDs
 */
const stock = async connection => {
  return new Promise(resolve => {
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
      let itemIDs = [];
      if (err) throw err;
      //logs each item out with correct length padding
      res.forEach(item => {
        itemIDs.push(item.item_id);
        console.log(
          `   |${padString(item.item_id, 9)}|${padString(
            item.product_name,
            51
          )}|${padString(item.price, 11)}|${padString(item.stock_quantity, 9)}|`
        );
        console.log(
          "   -------------------------------------------------------------------------------------"
        );
      });
      resolve(itemIDs);
    });
  });
};

module.exports = stock;
