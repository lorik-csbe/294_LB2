<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shop</title>
    <script defer src="controller/index-controller.js"></script>
    <link rel="stylesheet" href="view/stylesheets/style.css">
</head>
<body>
    <header>
        <?php require "view/blocks/header.php"; ?>
    </header>

    <main>
        <section id="logged-in">
            <h1 class="Willkommensgruss">Willkommen im Shop</h1>

            <h2 class="Hinweis">Hinweis: Bitte melden Sie sich an</h2>

            <button href="/login.php" id="login-button">Login</button>
        </section>
    </main>

    <footer>
        <?php require "view/blocks/footer.php"; ?>
    </footer>
</body>
</html>