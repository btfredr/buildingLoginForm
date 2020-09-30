import { displayMessage } from "./components/common/displayMessage.js";
import { saveToken, saveUser } from "./utils/storage.js";
import { baseUrl } from "./settings/api.js";

const form = document.querySelector("form");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const message = document.querySelector(".message-container");

form.addEventListener("submit", submitForm)

function submitForm(event) {
    event.preventDefault();

    message.innerHTML = "";

    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();

    if (usernameValue.length === 0 || passwordValue.length === 0) {
        displayMessage("warning", "Invalid values", ".message-container");
    }

    async function doLogin(username, password) {
        const url = baseUrl + "auth/local";

        const data = JSON.stringify({ identifier: username, password: password });

        const options = {
            method: "POST",
            body: data,
            headers: {
                "Content-Type": "application/json"
            }
        };

        try {
            const response = await fetch(url, options);
            const json = response.json();
            console.log(json);

            if (json.user) {
                displayMessage("success", "Successfully logged in", ".message-container");
            }
            if (json.error) {
                displayMessage("warning", "invalid login details", ".message-container");
            }
        }
        catch (error) {
            console.log(error);
        }

    }
}