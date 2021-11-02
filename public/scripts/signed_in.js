/**
 * This file handles the instance on which the user is signed, allowing them
 * to then send data under their unique id to the server.
 * 
 * Requires that accounts.js is loaded before this so that the session is authenticated.
 * Sends requests to the server to check if the user is signed in.
 */

//On every page load, verify if the user is signed in and if so, who they are signed is as
let isSignedIn = false;
let username = null;
let queue = [];

async function checkSignedIn() {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    };
    let response = await fetch('/verify-session', options);
    let parsed = await response.json(); //{isSignedIn: false, username: null, data: null};
    isSignedIn = parsed.isSignedIn;
    username = parsed.username;

    for (func of queue) {
        func();
    }
}


document.addEventListener("DOMContentLoaded", checkSignedIn);

