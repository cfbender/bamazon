create database
if not exists bamazon;

use bamazon;

create table
if not exists products
(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR
(255),
    department_name VARCHAR
(255),
department_id INT,
    price DOUBLE
(10,2),
    stock_quantity INT,
    product_sales INT,
    primary key
(item_id)
);


insert into products
    (product_name, department_name, department_id, price, stock_quantity)
values
    ("Chair", "Home & Office", 1, 99.99, 7),
    ("Rug", "Home & Office", 1, 49.99, 10),
    ("Keyboard", "Home & Office", 1, 29.99, 30),
    ("Cat Tower", "Pets", 2, 99.99, 4),
    ("Cat Food", "Pets", 2, 19.99 , 10),
    ("Television", "Electronics", 3, 579.99, 3),
    ("A bronze statue of Bill Clinton", "Memorabilia", 4, 420, 1),
    ("Smuggled cuban cigars", "Illegal goods", 5, 1000, 20),
    ("Flash drive filled with North Korean propaganda", "Imported goods", 6, 200, 2),
    ("Bud Light", "Groceries", 7, 6.99, 45);

create table 
if not exists departments 
(
    department_id INT AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(255),
    over_head_costs DOUBLE(20,2),
    primary key (department_id)
);

insert into departments
    (department_name, over_head_costs)
values
    ("Home & Office", 5000),
    ("Pets", 2000),
    ("Electronics", 6000),
    ("Memorabilia", 1000),
    ("Illegal goods", 0),
    ("Imported goods", 10000),
    ("Groceries", 4000);