DROP DATABASE IF EXISTS bamazon_db;

CREATE database bamazon_db;

USE bamazon_db;

CREATE TABLE products (
id INT(10) NOT NULL AUTO_INCREMENT,
product_name VARCHAR(20) NOT NULL,
department_name VARCHAR(20) NOT NULL,
price DECIMAL(10,2) NOT NULL,
stock_quantity INT(10) NOT NULL,
PRIMARY KEY (id)
);

INSERT INTO products VALUES (1,"GriGri","Belay Devices",109.95,10),(2,"ATC-XP","Belay Devices",21.95,10),(3,"ATC-Pilot","Belay Devices",44.95,20),
(4,"Smart 2.0","Belay Devices",44.95,8),(5,"9.9mm Non-Dry 35M","Single Ropes",89.95,50),(6,"9.6mm Dry 70M","Single Ropes",259.95,5),
(7,"9.8mm Non-Dry 40M","Single Ropes",109.95,15),(8,"10.2mm Non-Dry 50M","Single Ropes",99.95,4),(9,"Session II","Crash Pad",149,1),
(10,"Impact","Crash Pad",199.95,10);

SELECT * FROM products;