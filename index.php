<head>
    <?php require "view/blocks/head.php"?>
</head>

<body>
    <header>
        <?php require "view/blocks/header.php"; ?>
    </header>

    <main>
        <section class="logged-in" id="logged-out-site">
            <h1 class="Willkommensgruss">Willkommen im Shop</h1>

            <h2 class="Hinweis">Hinweis: Bitte melden Sie sich an</h2>

            <button id="login-button">Login</button>
        </section>

        <section id="logged-in-site" style="display: none;">

            <div class="categories-container">
                <h2>Kategorien</h2>

                <img src="view/images/add-symbol.png" width="15px" height="15px" id="create-category-btn">
                <div class="categoryContainerHome" id="categoryContainerHome">

                </div>
            </div>

            <div class="WelcomeSign">
                <h1>Willkommen im Shop</h1>
            </div>
        </section>

    </main>

    <footer>
        <?php require "view/blocks/footer.php"; ?>
    </footer>
</body>
</html>