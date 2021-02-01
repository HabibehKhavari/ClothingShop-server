const { error } = require('console');
const {Client} = require('pg')
const express = require("express")

app = express();

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'clothingshop',
    password: '65432',
    port: 5432,
})

client.connect()

app.get("/manufacturers", (req, resp) => {
client
    .query('SELECT * FROM manufacturers')
    .then(function(results){
        console.log("Success");
        console.log(results.rowCount);
        resp.writeHead(200, {
            "Content-Type": "text/json",
            "Access-Control-Allow-Origin": "*"
        })
        resp.write(JSON.stringify(results.rows));
        resp.end();
    })
    .catch( function (error) {
        console.log("Oooops");
        console.log(error);
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

app.listen(3000, () => {
     console.log("Server started and listening to port 3000") });