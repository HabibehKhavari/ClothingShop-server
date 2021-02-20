const { Client } = require('pg')
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
app.get("/clothes", (req, resp) => {
    let filterName = req.query.filterName ? req.query.filterName : "";
    console.log(filterName); 
    
    const myQuery = {
        text: "SELECT * FROM clothes WHERE name LIKE $1",
        values: ["%"+filterName+"%"]
    }

    client
        .query(myQuery)
        .then(function (results) {
            console.log("Success!");
            console.log(results.rowCount);
            resp.writeHead(200, {
                "Content-Type": "text/json",
                "Access-Control-Allow-Origin": "*"
            });
            resp.write(JSON.stringify(results.rows));
            resp.end();
        })
        .catch(function (error) {
            console.log("Ooops!");
            console.log(error);
            resp.writeHead(200, {
                "Content-Type": "text/json",
                "Access-Control-Allow-Origin": "*"
            });
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