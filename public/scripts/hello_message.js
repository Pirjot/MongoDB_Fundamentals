function sign_in_message() {
    if (isSignedIn) {
        document.getElementById("sign-in-status").textContent = "You are signed in as " + username;
        document.getElementById("sign-in-status").style.color = "green";
    }
}

async function retrieve_data() {
    if (isSignedIn) {
        //Display data box and button
        document.getElementById("user-data").style.display = "";
        document.getElementById("submit-data").style.display = "";

        //Fetch the user data and put it in the textbox
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        };
        let response = await fetch('/fetch_data', options);
        let parsed = await response.json(); // * {success: true / false, data: [STRING]}
        document.getElementById("user-data").value = parsed["data"];
    }
}

queue.push(sign_in_message);
queue.push(retrieve_data);