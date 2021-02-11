const { error } = require('console');
const { Client } = require('pg')
const express = require("express")

app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'clothingshop',
    password: '65432',
    port: 5432,
})

client.connect()

app.delete("/manufacturers", (req, resp) => {
    console.log("in manufacturers DELETE");
    resp.write("please add the id at the path, eg manufacturers/28 , in order to delete the id=28");
    resp.end();
});

app.delete("/manufacturers/:id", (req, resp) => {
    console.log("in manufacturers DELETE");
    const myQuery = {
        text: "DELETE FROM manufacturers WHERE id=$1",
        values: [req.params.id]
    }
    client
        .query(myQuery)
        .then((results) => {
            console.log("success!");
            console.log(results.rowCount);
            resp.writeHead(200, {
                "Content-Type": "text/json",
                "Access-Control-Allow-Origin": "*"
            });
            resp.write(JSON.stringify("ok"));
            resp.end();
        })
        .catch((error) => {
            console.log("Ooooops!");
            console.log(error);
            resp.writeHead(200, {
                "Content-Type": "text/json",
                "Access-Control-Allow-Origin": "*"
            });
            resp.write(JSON.stringify("Failed"));
            resp.end();
        })
})

app.get("/manufacturers/DELETE/:id", (req, resp) => {
    console.log("in /manufacturers/DELETE/ using GET");
    const myQuery = {
        text: "DELETE FROM manufacturers WHERE id=$1",
        values: [req.params.id]
    }
    client
        .query(myQuery)
        .then((results) => {
            console.log("success!");
            console.log(results.rowCount);
            resp.writeHead(200, {
                "Content-Type": "text/json",
                "Access-Control-Allow-Origin": "*"
            });
            resp.write(JSON.stringify("ok"));
            resp.end();
        })
        .catch((error) => {
            console.log("Ooooops!");
            console.log(error);
            resp.writeHead(200, {
                "Content-Type": "text/json",
                "Access-Control-Allow-Origin": "*"
            });
            resp.write(JSON.stringify("Failed"));
            resp.end();
        })
});

app.post("/manufacturers", (req, resp) => {
    console.log("In /manufacturers POST");
    const myQuery = {
        text: "INSERT INTO manufacturers (name, country, link1, link2, description, more_details) VALUES ($1, $2, $3, $4, $5, $6)",
        values: [req.body.name, req.body.country, req.body.link1, req.body.link2, req.body.description, req.body.more_details]
    }
    client
        .query(myQuery)
        .then((results) => {
            console.log("success");
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
            });
            resp.write(JSON.stringify("Failed"));
            resp.end();
        });
})

app.get("/manufacturers", (req, resp) => {
    let filterName = req.query.name ? req.query.name : "";
    console.log("filter name: "+ filterName);
    const myQuery = {
        text:"SELECT * FROM manufacturers WHERE UPPER(name) LIKE UPPER($1)",
        values: ["%"+filterName+"%"]
    }
    client
        .query(myQuery)
        .then(function (results) {
            console.log("Success");
            console.log(results.rowCount);
            resp.writeHead(200, {
                "Content-Type": "text/json",
                "Access-Control-Allow-Origin": "*"
            })
            resp.write(JSON.stringify(results.rows));
            resp.end();
        })
        .catch(function (error) {
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
    console.log("Server started and listening to port 3000")
});