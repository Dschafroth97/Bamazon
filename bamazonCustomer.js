var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table2");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon_db"
});
connection.connect(function(err){
    if (err) throw err;
});

var display = function() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log("==========================");
        console.log("    Welcome to Bamazon!   ");
        console.log("==========================");
        console.log("");
        console.log("Choose product below.");
        console.log("");
   
    var table = new Table({
        head: ["Product ID", "Product Name", "Cost"],
        colWidths: [12, 30, 10],
        colAligns: ["left", "center", "right"],
        style: {
            head: ["green"],
            compact: true
        }
    });
    for (var i=0;i<res.length;i++){
        table.push ([res[i].id, res[i].product_name, res[i].price]);
    }
console.log(table.toString());
});
}
display();