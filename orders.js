const { Client } = require('pg')
const express = require("express")

app = express();
app.use(express.json());
app.use(express.urlencoded( {extended: true} ));


const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'clothingshop',
    password: '65432',
    port: 5432,
})

client.connect()

app.post("/orders", (req, resp) => {
    console.log("In /orders POST");

    const myQuery = {
        text: "INSERT INTO orders (quantity, customer_code, cloth_code) VALUES ($1, $2, $3)",
        values: [req.body.quantity, req.body.customer_code, req.body.cloth_code]
    }

    client
        .query(myQuery)
        .then((results) => {
            console.log("Success!");
            console.log(results.rowCount);
            resp.writeHead(200, {
                "Content-Type": "text/json",
                "Access-Control-Allow-Origin": "*"
            });
            resp.write(JSON.stringify("ok"));
            resp.end();
        })
        .catch((error) => {
            console.log("Ooops!");
            console.log(error);
            resp.writeHead(200, {
                "Content-Type": "text/json",
                "Access-Control-Allow-Origin": "*"
            })
            resp.write(JSON.stringify("Failed"));
            resp.end();
        });
})

app.get("/orders", (req, resp) => {
    let filterCode = req.query.filterCustomerCode ? req.query.filterCustomerCode : "";
    console.log(filterCode);
    const myQuery = {
        text: "SELECT * FROM orders WHERE customer_code LIKE $1",
        values: ["%" + filterCode + "%"]
    }
    client
        .query(myQuery)
        .then((results) => {
            console.log("Success!");
            console.log(results.rowCount);
            resp.writeHead(200, {
                "Content-Type": "text/json",
                "Access-Control-Allow-Origin": "*"
            });
            resp.write(JSON.stringify(results.rows));
            resp.end();
        })
        .catch((error) => {
            console.log("Ooops!");
            console.log(error);
            resp.writeHead(200, {
                "Content-Type": "text/json",
                "Access-Control-Allow-Origin": "*"
            })
            resp.write(JSON.stringify("Failed"));
            resp.end();
        });
});

app.get("/", (req, resp) => {
    resp.write("In GET /");
    resp.end();
})

const port = 3000;
app.listen(port, () => { console.log("Server started and listening to port " + port) });