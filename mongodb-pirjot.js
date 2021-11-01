/**
 * A collection of useful MongoDB functions that can be used as a template for
 * any NodeJS server (intended initially for use by Ohlone's ./MakeMyFuture team).
 * 
 * You need to know these two pages are available as resources:
 * How to build a Query: https://docs.mongodb.com/drivers/node/current/fundamentals/crud/query-document/
 * How to build a Filter (for update functions): https://docs.mongodb.com/drivers/node/current/fundamentals/crud/write-operations/change-a-document/
 * 
 * @author Pirjot Atwal
 * @file mongodb-pirjot.js
 */

// Import mongodb (make sure you do npm install mongodb first)
const { MongoClient } = require('mongodb');
// Build a uri, user and password settings are configured on the website
const uri = "mongodb+srv://" + process.env.USERNAME_PASSWORD + "@mongodbtest.v5yrf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// Configure client, pass in uri and options
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

/**
 * Begin connection to Mongo Database. Make sure to call closeClient at some point.
 * You can await this function so as to guarantee the client is connected before performing
 * any operations. Written as a middleware function but does not necessarily need to
 * be used as such.
 * 
 * @return {MongoClient} The connected client.
 */
async function connectClient(req, res, next=()=>{}) {
    if (!module.exports.isConnected) {
        console.log("Connecting to database...");
        module.exports.isConnected = true;
        await module.exports.client.connect();
    } else {
        console.log("Already Connected, ignoring request. (Please comment this line in official versions.)");
        next();
        return false;
    }
    next();
    return true;
}

/**
 * Terminate client connection, client object is unusable now.
 * Make sure this function is called at some point near the end of the program.
 */
async function closeClient() {
    console.log("\nTerminating connection with database...")
    return await client.close();
}

/**
 * Push a doc into the database.
 * 
 * @param {JSON} value The value/document/JSON object you want to insert
 * @param {String} database
 * @param {String} collection 
 */
async function add_data(value, database = "default", collection = "default") {
    let response = await client.db(database).collection(collection).insertOne(value);
    return response;
}

/**
 * Get all collections that match a query from the database collection.
 * Note: provide an empty JSON Object if you would like to get all data.
 * 
 * @param {JSON} query Use an empty doc to select everything
 * @param {String} database
 * @param {String} collection
 * @return {Array} An array of all documents.
 */
async function get_data(query = {}, database = "default", collection = "default") {
    let response = client.db(database).collection(collection).find(query);
    return response.toArray();
}

/**
 * Delete the doc in the given collection with the matching unique _id.
 * 
 * @param {String} _id
 * @param {String} database
 * @param {String} collection
 * @returns {DeleteResult}
 */
async function delete_doc_id(_id, database = "default", collection = "default") {
    let response = await client.db(database).collection(collection).deleteOne({"_id": _id});
    return response;
}

/**
 * Delete all docs that match a given query. Look at the query rules to make a needed query.
 * NOTE: An empty query will delete all docs.
 * 
 * @param {JSON} query 
 * @param {String} database 
 * @param {String} collection 
 * @returns {DeleteResult}
 */
async function delete_docs_q(query, database = "default", collection = "default") {
    let response = await client.db(database).collection(collection).deleteMany(query);
    return response;
}

/**
 * One of the most advanced of MongoDB operations. 
 * Takes a filter and an update object to update all docs that satisfy
 * the filter with the update.
 * 
 * @param {JSON} filter For example {name: "Bob Smith"}
 * @param {JSON} update For example {$inc: num} (Increments num field in the doc)
 * @param {String} database 
 * @param {String} collection 
 * @returns {DeleteResult}
 */
 async function update_docs(filter, update, database = "default", collection = "default") {
    let response = await client.db(database).collection(collection).updateMany(filter, update);
    return response;
}

module.exports = {
    client, isConnected:false, connectClient, closeClient, add_data, get_data, delete_doc_id,
    delete_docs_q, update_docs
};