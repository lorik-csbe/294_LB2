/**
 * This class controls the product creation and editing page.
 */
class CreateProductController {

    /**
     * Runs automatically when the page loads to check if we are editing an existing product.
     * 
     * @returns void
     */
    constructor() {
        this.editMode();
    }

    /**
     * Checks if a SKU is in the web address. 
     * If yes, it loads the product data from the API and fills out the form fields.
     * 
     * @returns void
     */
    editMode() {
        const urlParams = new URLSearchParams(window.location.search);
        const sku = urlParams.get("sku");

        // sku validation 
        if (sku) {
            console.log("Edit mode for SKU:", sku);

            // fetches with the endpoint from this exact product
            fetch(AuthController.API_URL + `/product/${sku}`, {
                method: "GET",
                credentials: "include",

            }).then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.error("Fehler beim Abrufen der Produktinformationen");
                }
            })
            .then(data => {
                // fills the form with the downloaded data
                document.getElementById("product-active").value = data.active;
                document.getElementById("product-id-category").value = data.id_category;
                document.getElementById("product-sku").value = data.sku;
                document.getElementById("product-name").value = data.name;
                document.getElementById("product-image").value = data.image;
                document.getElementById("product-description").value = data.description;
                document.getElementById("product-price").value = data.price;
                document.getElementById("product-stock").value = data.stock;
                
            }).catch(error => console.error("Fehler beim Laden:", error));
            
        }
    }

    /**
     * Triggered when the user clicks save on the form.
     * Collects all inputs and sends them to the API via PUT (creates or updates).
     * 
     * @param event 
     * @returns void
     */
    onSubmit(event) {
        event.preventDefault(); // stops from loading this site

        // Gets the text from all inputs
        const active = document.getElementById("product-active").value;
        const id_category = document.getElementById("product-id-category").value;
        const sku = document.getElementById("product-sku").value;
        const name = document.getElementById("product-name").value;
        const image = document.getElementById("product-image").value;
        const description = document.getElementById("product-description").value;
        const price = document.getElementById("product-price").value;
        const stock = document.getElementById("product-stock").value;

        // puts all information in an object
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

        // Sends the data to the API (PUT creates or updates, based on Swagger)
        fetch(AuthController.API_URL + `/product/${sku}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(productData),

        }).then((response) => {
            if (response.ok) {
                console.log("Produkt erfolgreich erstellt");
                window.location.href = "/products.php"; // locates the user back to the product-stie
            } else {
                console.log("Fehler beim Erstellen des Produkts");
            }
        });
    }

    cancel() {
        document.getElementById("back-button").addEventListener("click", () => {
            window.location.href = "/products.php";
        });
    }

}

const createProductController = new CreateProductController();

createProductController.cancel();