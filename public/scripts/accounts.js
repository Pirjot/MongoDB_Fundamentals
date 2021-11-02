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
        console.log(await response.json());
    });
}

document.addEventListener("DOMContentLoaded", onPageLoad);