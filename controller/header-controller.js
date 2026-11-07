class HeaderController {
    updateHeader() {

        console.log("updateHeader läuft");
        
        fetch(AuthController.API_URL + "/products", {
            credentials: "include",

        }).then(response => {

            if (response.ok) {
                console.log("Sie sind authentifiziert");
                document.getElementById("login").style.display = 'none';
                document.getElementById("logout").style.display = 'block';
                document.getElementById("user-symbol").style.display = 'block';
            } else {
                console.log("Sie sind nicht authentifiziert");
                document.getElementById("login").style.display = 'block';
                document.getElementById("logout").style.display = 'none';
                document.getElementById("user-symbol").style.display = 'none';

            }            
        }).catch (error => {
            console.error("Fehler beim Abrufen der Authentifizierungsinformationen:", error);
        });
    


    }

    onClickLogout() {
        document.getElementById("logout").addEventListener("click" , () => {

            fetch(AuthController.API_URL + "/unauthenticate", {
                method: "POST",
                credentials: "include"
            }).then(response => {
                if (response.ok) {
                    console.log("Abmelden erfolgreich");
                    document.getElementById("login").style.display = 'block';
                    document.getElementById("logout").style.display = 'none';
                    document.getElementById("user-symbol").style.display = 'none';


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