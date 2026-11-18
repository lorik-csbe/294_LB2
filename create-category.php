<head>
    <?php require "view/blocks/head.php"?>
</head>

<body>
    <header>
        <?php require "view/blocks/header.php"; ?>
    </header>

    <main>
        <h1>PRODUKT HINZUFÜGEN</h1>

        <div class="form-create-category">
            <form onsubmit="">
                <input type="text" placeholder="Name" required>
                <input type="number" placeholder="active" required minlength="0" maxlength="1">
                <button id="save-Button-category">Speichern</button>
            </form>
        </div>

        <button id="back-button">ABBRECHEN</button>
    </main>



    <footer>
        <?php require "view/blocks/footer.php"; ?>
    </footer>
</body>

