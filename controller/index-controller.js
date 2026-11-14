class IndexController {
    loginButton() {
        document.getElementById("login-button").addEventListener ("click", () => {
            window.location.href = "/login.php";
        })
    }
}

const indexController = new IndexController();

indexController.loginButton();