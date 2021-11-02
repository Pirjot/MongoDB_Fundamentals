/**
 * Simple file, handle clicks for both buttons
 */

document.getElementById("submit").addEventListener("click", async (evt) => {
    evt.preventDefault();
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"info": document.getElementById("database").value})
    };
    let response = await fetch('/database', options);
    console.log(await response.json());
});
document.getElementById("get_data").addEventListener("click", async (evt) => {
    evt.preventDefault();
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    };
    let response = await (await fetch('/get_data', options)).json();
    console.log(response);
});