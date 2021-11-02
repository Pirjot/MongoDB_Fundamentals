function sign_in_message() {
    if (isSignedIn) {
        document.getElementById("sign-in-status").textContent = "You are signed in as " + username;
        document.getElementById("sign-in-status").style.color = "green";
    }
}

queue.push(sign_in_message);