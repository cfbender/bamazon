const inquirer = require("inquirer");

/**
 *
 * Handles prompt for user input to select item ID
 * @param {array} itemIDs an array of all valid item IDs
 * @returns {number} id
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
    let id = await itemSelect(itemIDs);
    return id;
  } else {
    return id;
  }
};

module.exports = itemSelect;
