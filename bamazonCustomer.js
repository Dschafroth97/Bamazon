// Include NPM packages
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table2");

// Create connection variable
var connection = mysql.createConnection({
    // Relevant input to specify database
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Username
    user: "root",

    // Password
    password: "",

    // Specific database requested
    database: "bamazon_db"
});

// Connecting to mySQL
connection.connect(function (err) {

    // Throw errors if found
    if (err) throw err;
});

// Display Welcome message and List of items
function display() {

    // Asking the database to select info from table
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("\n")
        console.log("================================");
        console.log("      Welcome to Bamazon!      ");
        console.log(" We specialize in climbing gear! ")
        console.log("================================");
        console.log("");
        console.log("Choose product below.");
        console.log("");

        // Constructor to create table with npm package cli-table2
        var table = new Table({
            head: ["Product ID", "Product Name", "Cost"],
            colWidths: [12, 30, 10],
            colAligns: ["left", "center", "right"],
            style: {
                head: ["green"],
                compact: true
            }
        });

        // Loop through response and push all appropriate data
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].id, res[i].product_name, res[i].price]);
        }

        // Logs table in readable manner
        console.log(table.toString());

        // Runs inquirer prompt
        shopping();
    });
};


// Shop function asking customer to choose ID and amount of item
function shopping() {
    inquirer.prompt({
        name: "itemPurchase",
        type: "input",
        message: "Enter the product ID of desired item!"
    }).then(function (answer) {
        var selection = answer.itemPurchase;
        connection.query("SELECT * FROM products WHERE ID = ?", selection, function (err, res) {
            if (err) throw err
            if (res.length === 0) {
                console.log("Incorrect input, please provide a valid Product ID!!")
                shopping();
            } else {
                inquirer.prompt({
                    name: "quantity",
                    type: "input",
                    message: "How many would you like?"
                }).then(function (amount) {
                    var quantity = amount.quantity;
                    if (quantity > res[0].stock_quantity) {
                        console.log("Our deepest apologies!! We only have " + res[0].stock_quantity + " left in inventory.");
                        shopping();
                    } else {
                        console.log("");
                        console.log(res[0].product_name + " purchased!");
                        console.log(quantity + " purchased for $" + res[0].price * quantity);

                        var newAmount = res[0].stock_quantity - quantity;
                        connection.query("UPDATE products SET stock_quantity = " + newAmount + " WHERE id = " + res[0].id, function (err, res) {
                            if (err) throw err;
                            console.log("");
                            console.log("Your Order is being Processed now!");
                            console.log("Thanks for shopping ^.^");
                            console.log("");
                            connection.end();
                        });
                    };

                });
            };
        });
    });
};

// Running function to
display();