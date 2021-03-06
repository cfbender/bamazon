const inquirer = require("inquirer");
const stock = require("../lib/stock");
const itemSelect = require("../lib/itemSelect");

module.exports = connection => {
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

    const query = [
      "SELECT stock_quantity, price, product_sales FROM products WHERE ?",
      { item_id: id }
    ];
    //query for quanity of selected item
    connection.query(...query, (err, res) => {
      if (err) throw err;
      //if stock is enough to cover quanity
      if (res[0].stock_quantity >= quantity) {
        //calculate new stock and revenue
        let newQuantity = res[0].stock_quantity - quantity;
        let revenue = quantity * res[0].price;
        let newSales = res[0].product_sales + revenue;

        //create query
        let query = [
          "UPDATE products SET ?, ? WHERE ?",
          [
            { stock_quantity: parseInt(newQuantity) },
            { product_sales: parseFloat(newSales) },
            { item_id: parseInt(id) }
          ]
        ];

        connection.query(...query, err => {
          if (err) throw err;
          console.log(
            "\nSuccess! Your items will arrive soon. Have a great day and thank you for shopping with Bamazon.\n"
          );
          connection.end();
        });
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
