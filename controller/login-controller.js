class LoginController {

    static onSubmit(event) {

        event.preventDefault();

        const usernameInput = document.getElementById("usernameInput").value;
        const passwordInput = document.getElementById("passwordInput").value;


        fetch ("https://campus.csbe.ch/uek294/api/v1/authenticate", {


            credentials: "include",
            method: "POST",
            

            body: JSON.stringify({
                username: usernameInput,
                password: passwordInput,
            }),

            


        }).then((response) => {
            if (response.ok) {
                console.log("Login erfolgreich");
                window.location.href = "/index.php";
            } else {
                console.log("Login fehlgeschlagen");
            }
        })
        .catch((error) => {
            console.error("Fehler beim Login:", error);
        });
    }

}







