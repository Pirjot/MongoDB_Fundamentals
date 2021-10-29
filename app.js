const express = require('express');
const app = express();
require('dotenv').config(); //Load all variables in .env


const mongo = require('./mongodb-pirjot.js');
const routes = require('./routes.js');


app.use(express.json());
app.use(express.static('public'));
app.use(mongo.connectClient);

//Perform a push to the server based on user provided data.
app.post('/database', (req, res) => routes.database(req, res));

//Get all data and send it back to the client
app.get('/get_data', (req, res) => routes.get_data(req, res));

let server = app.listen(3000, () => console.log("Listening..."));

//On server/process closing, ensure that the MongoDB connection was terminated
process.on('SIGINT', () => {
    mongo.closeClient();
    process.exit(0);
});