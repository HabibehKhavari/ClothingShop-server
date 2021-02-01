const { error } = require('console');
const {Client} = require('pg')
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'clothingshop',
    password: '65432',
    port: 5432,
})

client.connect()
client
    .query('SELECT * FROM manufacturers')
    .then(function(results){
        console.log("Success");
        console.log(results.rowCount);
        client.end();
    })
    .catch( function (error) {
        console.log("Oooops");
        console.log(err);
        client.end();
    });
    console.log("server is finishing");