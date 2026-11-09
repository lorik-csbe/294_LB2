<body>
    <header>
        <?php require "view/blocks/header.php"; ?>
    </header>

    <main>
        <h1>PRODUKT HINZUFÜGEN</h1>

        <div class="form-create">
            <form onsubmit="createProductController.onSubmit(event)">
                <input type="number" placeholder="active" required id="product-active">
                <input type="number" placeholder="id_category" required id="product-id-category">
                <input type="text" placeholder="sku" id="product-sku" required>
                <input type="text" placeholder="name" id="product-name">
                <input type="text" placeholder="image" id="product-image">
                <input type="text" placeholder="description" id="product-description">
                <input type="number" placeholder="price" id="product-price" required>
                <input type="number" placeholder="stock" id="product-stock" required>
                <button id="save-Button">Speichern</button>
            </form>
        </div>

        <button id="back-button">ABBRECHEN</button>
    </main>



    <footer>
        <?php require "view/blocks/footer.php"; ?>
    </footer>
</body>

