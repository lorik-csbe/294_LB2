class CreateProductController {

    constructor() {
        this.editMode();
    }

    editMode() {
        const urlParams = new URLSearchParams(window.location.search);
        const sku = urlParams.get("sku");

        if (sku) {
            console.log("Edit mode for SKU:", sku);

            fetch(AuthController.API_URL + `/product/${sku}`, {
                method: "GET",
                credentials: "include",

            }).then((response) => {
                if (response.ok) {
                    window.location.href = `/product/${sku}`;
                    return response.json();
                } else {
                    console.error("Fehler beim Abrufen der Produktinformationen");
                }
            })
            .then(data => {
                document.getElementById("product-active").value = data.active;
                document.getElementById("product-id-category").value = data.id_category;
                document.getElementById("product-name").value = data.sku;
                document.getElementById("product-name").value = data.name;
                document.getElementById("product-image").value = data.image;
                document.getElementById("product-description").value = data.description;
                document.getElementById("product-price").value = data.price;
                document.getElementById("product-stock").value = data.stock;
                
            }).catch(error => console.error("Fehler beim Laden:", error));
            
        }
    }

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


        fetch(AuthController.API_URL + `/product/${sku}`, {
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