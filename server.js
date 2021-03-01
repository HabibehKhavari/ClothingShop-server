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

//////////////manufacturers///////////////
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

function updateManufacturerFromAPIEndpoint (req,resp) {
    console.log("in /manufacturers PUT using the POST");
    const myQuery = {
        text: "UPDATE manufacturers SET name = $2, country = $3, link1 = $4, link2 = $5, description = $6, more_details = $7 WHERE id = $1",
        values: [req.body.id, req.body.name, req.body.country, req.body.link1, req.body.link2, req.body.description, req.body.more_details]
    }
    client
        .query(myQuery)
        .then((resuits) => {
            console.log("Success!");
            console.log(resuits.rowCount);
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
}
app.put("/manufacturers", updateManufacturerFromAPIEndpoint);
app.post("/manufacturers/PUT/", updateManufacturerFromAPIEndpoint);

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

//////////////////////clothes/////////////////////////

function updateClothFromAPIEndpoint(req, resp) {

    console.log("In /clothes PUT using the POST (workaround)");


    // req.body.id
    const myQuery = {
        text: "UPDATE clothes SET code = $2, image = $3, manufacturer = $4, description = $5, more_details = $6, promotion = $7, manufacturers_id = $8 WHERE id = $1",
        values: [req.body.id, req.body.code, req.body.image, req.body.manufacturer, req.body.description, req.body.more_details, req.body.promotion, req.body.manufacturers_id]
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
}

app.post("/clothes/PUT/", updateClothFromAPIEndpoint);

app.put("/clothes", updateClothFromAPIEndpoint);


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
        values: ["%" + filterCode + "%"]
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

///////////////////////clothes/orderable/:id///////////////////////

app.get("/cloth/orderable/:id", (req, resp) => {
    console.log("in cloth/orderable/ GET");
    const myQuery = {
        text: "SELECT clothes.id, manufacturers.name AS manufacturer_name, manufacturers.country, clothes.code AS cloth_code, clothes.image, clothes.description, clothes.more_details FROM clothes, manufacturers where clothes.manufacturers_id = manufacturers.id and clothes.id = $1",
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
            resp.write(JSON.stringify(results.rows));
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

/////////////////////////cloth?promotion=true//////////////////////////////
app.get("/cloth", (req, resp) => {
    let filterPromotion = req.query.promotion ? req.query.promotion : "";
    console.log(filterPromotion);

    const myQuery = {
        text: "SELECT * FROM clothes WHERE promotion=$1",
        values: [filterPromotion]
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

//////////////////////orders///////////////////////////

function updateOrderFromAPIEndpoint(req, resp) {

    console.log("In /orders PUT using the POST (workaround)");


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
}
app.post("/orders/PUT/", updateOrderFromAPIEndpoint)
app.put("/orders", updateOrderFromAPIEndpoint)

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

app.listen(3000, () => {
    console.log("Server started and listening to port 3000")
});