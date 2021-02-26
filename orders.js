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

app.put("/orders", (req, resp) => {
    console.log("In /orders PUT");


    // req.body.id
    const myQuery = {
        text: "UPDATE orders SET quantity = $2, customer_code = $3, cloth_code = $4, order_date = $5 WHERE id = $1",
        values: [req.body.id, req.body.quantity, req.body.customer_code, req.body.cloth_code, req.body.order_date]
    }

    client
        .query(myQuery)
        .then((results) => {
            console.log("Success!");
            console.log(results.rowCount);
            resp.writeHead(200, {
                "Content-Type": "text/json",
                "Access-Control-Allow-Origin": "*",
            });
            resp.write(JSON.stringify("ok"));
            resp.end();
        })
        .catch((error) => {
            console.log("Ooops!");
            console.log(error);
            resp.writeHead(200, {
                "Content-Type": "text/json",
                "Access-Control-Allow-Origin": "*",
            })
            resp.write(JSON.stringify("Failed"));
            resp.end();
        });
})


app.get("/orders/DELETE/:id", (req, resp) => {
    console.log("In /orders/DELETE using GET");

    const myQuery = {
        text: "DELETE FROM orders WHERE id = $1",
        values: [req.params.id]
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
});
app.delete("/orders", (req, resp) => {
    console.log("In /orders DELETE");
    resp.write("Please add the id at the path, eg orders/21, in order to delet the id=21");
    resp.end();    
});

app.delete("/orders/:id", (req, resp) => {
    console.log("In /orders DELETE");

    const myQuery = {
        text: "DELETE FROM orders WHERE id = $1",
        values: [req.params.id]
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
});

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
