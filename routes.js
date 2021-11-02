/**
 * All the route functions for the Express are defined here, each accepting a request and response.
 * 
 * @file routes.js
 */

const mongo = require('./mongodb-pirjot.js');
const accounts = require('./accounts.js')

/**
 * Database route, insert data into the default/default collection
 * @param {Request} req 
 * @param {Response} res 
 */
async function database(req, res) {
    let response = await mongo.add_data({"DATA": req.body["info"]});
    res.send({"response": response, "info": "Your data was sent!"});
}

/**
 * Get all data from the default/default collection
 * @param {*} req 
 * @param {*} res 
 */
async function get_data(req, res) {
    let response = await mongo.get_data();
    res.send({"response": response, "info": "Your data was fetched!"});
}

/**
 * Sign up an account, manipulating the user's cookies to store their special session ID.
 * 
 * @param {*} req expects req.body to be equivalent to a JSON of the following structure
 * {
 *      username: <STRING>,
 *      password: <STRING>
 * }
 * @param {*} res 
 * @returns a response on whether the user's request was successful. If it was, 
 * a session is automatically issued and the cookie is set. Of the form:
 * {
 *      info: "ACCOUNT CREATED" / ...
 *      account_created: true / false
 * }
 */
async function sign_up(req, res) {
    //TODO: Perform some error checking possibly, parsing, cleaning up,etc.
    let username = req.body.username;
    let password = req.body.password;

    //Sign up the account
    let sign_up_response = await accounts.sign_up(username, password);

    //Issue a new session using the account's _id
    let session_response = await accounts.issue_session(sign_up_response["user_id"]);
    
    res.cookie("session", session_response["hash"], { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
    res.send({"info": sign_up_response["info"], "account_created": sign_up_response["account_created"]});
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
async function login(req, res) {

}

/**
 * A function meant to be run on every page load, verifying if the user's session
 * is valid.
 * The user will send a Request object in which the cookies are stored.
 * If the session cookie exists and the session (hash) is valid, then the session
 * is valid. Otherwise, the session is invalid.
 * 
 * 
 * @param {*} req 
 * @param {*} res
 */
async function verify_session(req, res) {
    console.log(req.cookies["session"]);
}


async function get_username(req, res) {

}

module.exports = {
    database, get_data, sign_up
}