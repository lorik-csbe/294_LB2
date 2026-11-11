/**
 * This class controls the user authentication state in the header
 * and handles login/logout interactions
 */


class HeaderController {

    /**
     * Checks if the user is authenticated by fetching the products endpoint,
     * and updates the header UI accordingly (shows/hides login/logout buttons)
     * 
     * @returns void
     */

    updateHeader() {

        console.log("updateHeader läuft");

        // fetches the products endpoint
        fetch(AuthController.API_URL + "/products", {
            credentials: "include",


        // promises a response
        }).then(response => {

            // if the response was valid
            if (response.ok) {
                console.log("Sie sind authentifiziert");
                document.getElementById("login").style.display = 'none'; // hides the login button
                document.getElementById("logout").style.display = 'block'; // shows the logout button
                document.getElementById("user-symbol").style.display = 'block'; // shows the user-symbol
            } else {
                console.log("Sie sind nicht authentifiziert");
                document.getElementById("login").style.display = 'block'; // shows the login button
                document.getElementById("logout").style.display = 'none'; // hides the logout button
                document.getElementById("user-symbol").style.display = 'none'; // hides the user-symbol

            }            
        }).catch (error => {
            console.error("Fehler beim Abrufen der Authentifizierungsinformationen:", error);
        });
    


    }

    /**
     * checks if the logout button was pressed.
     * unauthenticates the user by fetching the unauthenticated endpoint
     * 
     * @returns void
     */
    onClickLogout() {
        // gets the id of logout then adds an Eventlistener (click)
        document.getElementById("logout").addEventListener("click" , () => {


            /**
             * fetches the unauthenticated endpoint
             *  with the method: POST
            */ 
            fetch(AuthController.API_URL + "/unauthenticate", {

                method: "POST",
                credentials: "include"
            }).then(response => {


                if (response.ok) {
                    console.log("Abmelden erfolgreich");
                    document.getElementById("login").style.display = 'block'; // shows the login button
                    document.getElementById("logout").style.display = 'none'; // hides the logout button
                    document.getElementById("user-symbol").style.display = 'none'; // hides the user-symbol


                }
            }).catch(error => {
                console.error("Fehler beim Abmelden:", error);
            });
        });


    }
}

const headerController = new HeaderController();

headerController.updateHeader();
headerController.onClickLogout();

/* function loggedIn() {

    console.log("Funktion läuft");

    if (AuthController.isTokenValid(token) === true) {
        $("#login").hide();
        $("#logout").show();
        $("#user-symbol").show();
    } else {
        $("#login").show();
        $("#logout").hide();
        $("#user-symbol").hide();
    }
}

loggedIn(); */