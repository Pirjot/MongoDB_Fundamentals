/**
 * All the route functions for the Express are defined here, each accepting a request and response.
 * 
 * @file routes.js
 */

const mongo = require('./mongodb-pirjot.js');
/**
 * Database route, insert data into the default/default collection
 * @param {Request} req 
 * @param {Response} res 
 */
async function database(req, res) {
    let response = await mongo.add_data({"DATA": req.body["info"]});
    res.send({"response": response, "info": "Your data was sent!"});
}

async function get_data(req, res) {
    let response = await mongo.get_data();
    res.send({"response": response, "info": "Your data was fetched!"});
}

module.exports = {
    database, get_data
}