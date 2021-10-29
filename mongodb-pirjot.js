// Import mongodb (make sure you do npm install mongodb first)
const { MongoClient } = require('mongodb');
// Build a uri, user and password settings are configured on the website
const uri = "mongodb+srv://" + process.env.USERNAME_PASSWORD + "@mongodbtest.v5yrf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// Configure client, pass in uri and options
let client = undefined;

/**
 * Begin connection to Mongo Database. Make sure to call closeClient at some.
 */
async function connectClient(req, res, next) {
    if (client == undefined) {
        console.log("Starting connection with database.")
        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        await client.connect();
    }
    next();
}

/**
 * Terminate client connection, client object is unusable now
 */
async function closeClient() {
    console.log("\nTerminating connection with database...")
    return await client.close();
}

/**
 * Push a value into the database.
 * 
 * @param {JSON} value The value you want to insert
 * @param {String} database
 * @param {String} collection 
 */
async function add_data(value, database = "default", collection = "default") {
    let response = await client.db(database).collection(collection).insertOne(value);
    return response;
}

/**
 * Get all collections from the database
 * 
 * @param {String} database
 * @param {String} collection
 */
async function get_data(database = "default", collection = "default") {
    let response = await client.db(database).collection(collection).find({}); //Empty Query select everything
    return await response.toArray();
}



module.exports = {
    client, connectClient, closeClient, add_data, get_data
};