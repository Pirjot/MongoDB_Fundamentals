/**
 * This file both handles the scripts needed on the main page to sign up for an
 * account as well as check the cookies for a valid session and verify if the 
 * user is logged in correctly and fetch their account data.
 */

function onPageLoad() {
    document.getElementById("signup").addEventListener("click", async (evt) => {
        evt.preventDefault();
        let username = document.getElementById("username_up").value;
        let password = document.getElementById("password_up").value;
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"username": username, "password": password})
        };
        let response = await fetch('/sign_up', options);
        let parsed = await response.json();
        if(parsed.account_created) {
            window.location.reload();
        } else {
            alert(parsed.info);
        }
    });
    document.getElementById("login").addEventListener("click", async (evt) => {
        evt.preventDefault();
        let username = document.getElementById("username_in").value;
        let password = document.getElementById("password_in").value;
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"username": username, "password": password})
        };
        let response = await fetch('/login', options);
        window.location.reload();
        console.log(await response.json());
    });
    document.getElementById("signout").addEventListener("click", async (evt) => {
        evt.preventDefault();
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        };
        let response = await fetch('/logout', options);
        window.location.reload();
    });
    document.getElementById("submit-data").addEventListener("click", async (evt) => {
        evt.preventDefault();
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({data: document.getElementById("user-data").value})
        };
        let response = await fetch('/set_data', options);
        let parsed = await response.json();
        alert(parsed.info);
    });
}

document.addEventListener("DOMContentLoaded", onPageLoad);