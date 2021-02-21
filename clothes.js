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


app.get("/clothes/DELETE/:id", (req, resp) => {
    console.log("In /clothes/DELETE using GET");

    const myQuery = {
        text: "DELETE FROM clothes WHERE id = $1",
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

app.delete("/clothes", (req, resp) => {
    console.log("In /clothes DELETE");
    resp.write("Please add the id at the path, eg clothes/21, in order to delet the id=21");
    resp.end();    
});

app.delete("/clothes/:id", (req, resp) => {
    console.log("In /clothes DELETE");

    const myQuery = {
        text: "DELETE FROM clothes WHERE id = $1",
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


app.post("/clothes", (req, resp) => {
    console.log("In /clothes POST");

    const myQuery = {
        text: "INSERT INTO clothes (code, image, manufacturer, description, more_details, promotion, manufacturers_id) VALUES ($1, $2, $3, $4, $5 ,$6 ,$7)",
        values: [req.body.code, req.body.image, req.body.manufacturer, req.body.description, req.body.more_details, req.body.promotion, req.body.manufacturers_id]
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

app.get("/clothes", (req, resp) => {
    let filterCode = req.query.filterCode ? req.query.filterCode : "";
    console.log(filterCode); 

    const myQuery = {
        text: "SELECT * FROM clothes WHERE UPPER(code) LIKE UPPER($1)",
        values: ["%"+filterCode+"%"]
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