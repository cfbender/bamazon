# 🅱️amazon
A CLI storefront that will fulfill all of your shopping needs!

## Installation

To install, you must already have [Node.js](https://nodejs.org) installed, as well as [MySQL](https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/).

Clone into this repo using:
 ``` bash
 git clone https://github.com/cfbender/bamazon.git && cd bamazon
```
To initialize the database, you can use the GUI MySQL tool of your choosing to execute `/src/sql/bamazon.sql`, or if you want to use the CLI, you can use the following:
```bash
mysql -u username -p  < ./src/sql/bamazon.sql
```
Where 'username' is replaced with your database host username, and you will be prompted for the password.

# Usage

If you ever forget, run `node bamazon.js -h` or `node bamazon.js -help` to see instructions.

### Customer

As a customer, run the application using `node bamazon.js -c` or `node bamazon.js -customer`.
You will be able to purchase whatever you like that is in stock.

##### Demo

![customer demo](./assets/customerDemo.gif)


### Manager

As a manager, run the application using `node bamazon.js -m` or `node bamazon.js -manager`. Managers can view stock of all items, view items low in stock, add new stock, or add a new product.

#### Demo

![customer demo](./assets/managerDemo.gif)

### Supervisor

As a customer, run the application using `node bamazon.js -s` or `node bamazon.js -supervisor`. Supervisors can view product sales grouped by department, or create a new department.

#### Demo

![customer demo](./assets/supervisorDemo.gif)


