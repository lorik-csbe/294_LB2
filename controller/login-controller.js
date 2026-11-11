/**
 * This class controls the user login process 
 * by handling form submissions and authentication requests.
 */
class LoginController {

    /**
     * Handles the login
     * sends a POST request to the authentication endpoint, 
     * @param event The form submit event.
     * @returns void
     */
    static onSubmit(event) {

        event.preventDefault(); // prevents standard form submission / page reload

        const usernameInput = document.getElementById("usernameInput").value; // gets the entered username
        const passwordInput = document.getElementById("passwordInput").value; // gets the entered password


        // sends a POST request to authenticate the user with credentials
        fetch (AuthController.API_URL + "/authenticate", {


            credentials: "include",
            method: "POST",
            

            // sends the username and password as a JSON string in the body
            body: JSON.stringify({
                username: usernameInput,
                password: passwordInput,
            }),

            


        }).then((response) => {
            // checks if the login response is valid/successful
            if (response.ok) {
                console.log("Login erfolgreich");
                window.location.href = "/index.php"; // redirects to the main page
            } else {
                console.log("Login fehlgeschlagen");
            }
        })
        .catch((error) => {
            // catches network errors during login
            console.error("Fehler beim Login:", error);
        });
    }

}