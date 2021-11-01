const express = require('express');
const app = express();
require('dotenv').config(); //Load all variables in .env


const mongo = require('./mongodb-pirjot.js');
const routes = require('./routes.js');


app.use(express.json());
app.use(express.static('public'));

//Perform a push to the server based on user provided data.
app.post('/database', (req, res) => routes.database(req, res));

//Get all data and send it back to the client
app.get('/get_data', (req, res) => routes.get_data(req, res));

let server = app.listen(3000, () => console.log("Listening..."));

/**
 * A test function to ensure that MongoDB is running correctly
 * and that all functionality is working.
 */
async function testMongo() {
    let response = null;

    console.log("Running Test on Mongo Capabilities...");

    console.log("Attempting connect, the following value should be true:");
    response = await mongo.connectClient();
    console.log(response);

    console.log("Attempting second connect, the following value should be false:");
    response = await mongo.connectClient(); //If connection is attempted twice, this returns false
    console.log(response);

    console.log("Attempting add value...");
    response = await mongo.add_data({"value":"VALUE", "data":15.31}, "test", "test"); //Attempt adding a doc
    console.log(response);    

    console.log("Attempting second add value (this time with id 12345...)");
    response = await mongo.add_data({_id: "12345", "value":"VALUE"}, "test", "test"); //Attempt adding a doc with an id
    console.log(response);

    console.log("Attempting to retrieve all docs in the test/test collection...");
    response = await mongo.get_data({}, "test", "test");
    console.log(response);

    console.log("Deleting the object with the unique _id 12345...");
    response = await mongo.delete_doc_id("12345", "test", "test");
    console.log(response);
    console.log(await mongo.get_data({}, "test", "test"));

    console.log("Updating all docs that have 'VALUE' as their value to increment their data by 5");
    response = await mongo.update_docs({"value": "VALUE"}, {$inc: {"data":5}}, "test", "test");
    console.log(response);
    console.log(await mongo.get_data({}, "test", "test"));

    console.log("Clearing the test/test collection...");
    response = await mongo.delete_docs_q({}, "test", "test");
    console.log(await mongo.get_data({}, "test", "test"));
}
testMongo();

//On server/process closing, ensure that the MongoDB connection was terminated
process.on('SIGINT', () => {
    mongo.closeClient();
    process.exit(0);
});