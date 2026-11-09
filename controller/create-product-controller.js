class CreateProductController {
    onSubmit(event) {
        event.preventDefault();

        const active = document.getElementById("product-active").value;
        const id_category = document.getElementById("product-id-category").value;
        const sku = document.getElementById("product-sku").value;
        const name = document.getElementById("product-name").value;
        const image = document.getElementById("product-image").value;
        const description = document.getElementById("product-description").value;
        const price = document.getElementById("product-price").value;
        const stock = document.getElementById("product-stock").value;

        const productData = {
            active,
            id_category,
            sku,
            name,
            image,
            description,
            price,
            stock
        };


        fetch (AuthController.API_URL + `/product/${sku}`, {
            method: "PUT",
            credentials: "include",

            body: JSON.stringify(productData),


        }).then((response) => {
            if (response.ok) {
                console.log("Produkt erfolgreich erstellt");
                window.location.href = "/products.php";
            } else {
                console.log("Fehler beim Erstellen des Produkts");
            }
        });
    }
}

const createProductController = new CreateProductController();