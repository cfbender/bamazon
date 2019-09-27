const inquirer = require("inquirer");
const mysql = require("mysql");
const stock = require("../stock");

module.exports = () => {
  //configure the connection
  const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
  });

  /**
   *
   * Handles prompt for user input to select item ID
   * @param {array} itemIDs
   * @returns {string} id
   */
  const itemSelect = async itemIDs => {
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

  /**
   *
   * Handles quantity and purchase prompts
   * @param {string} id
   */
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
    let itemIDs = await stock(connection);
    let id = await itemSelect(itemIDs);
    main(id);
  });
};
