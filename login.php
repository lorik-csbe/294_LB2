
<body>
    <header>
        <?php require "view/blocks/header.php"; ?> 
    </header>

    <main class="main-login">
        <div class="Login-container">
            <form onsubmit="LoginController.onSubmit(event)">

                <input type="text" placeholder="username" id="usernameInput" required>

                <input type="password" placeholder="password" id="passwordInput" required>

                <button id="Anmelden-button">Anmelden</button>
            </form>
        </div>
    </main>

    <footer>
        <?php require "view/blocks/footer.php"; ?>
    </footer>


</body>