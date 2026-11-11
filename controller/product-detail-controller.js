/**
 * This class controls the product detail view, 
 * handling data loading, deletes, and redirection to the edit form.
 */
class ProductDetailController {
    
    /**
     * Extracts the product SKU from the URL parameters, 
     * fetches the specific product details from the API, and renders them.
     * 
     * @returns void
     */
    loadProductDetails() {
        const params = new URLSearchParams(document.location.search);
        const sku = params.get("sku"); // gets the SKU from the URL query string

        // fetches the product details for the specific SKU
        fetch(AuthController.API_URL + `/product/${sku}`, {
            credentials: "include",
            method: "GET",
        })
        .then((response) => {
            if (response.ok) {
                console.log("Produktdetails erfolgreich geladen");
                return response.json();
            }
        })
        .then((data) => {
            const productDetailsContainer = document.getElementById("product-detail-container");
            
            // renders the product details and action buttons dynamically
            productDetailsContainer.innerHTML = 
            `<img src="/view/images/entfernen.png" alt="delete-product" id="delete-product" class="delete-product">
            <img src="/view/images/bearbeiten.png" alt="edit-product" id="edit-product" class="edit-product">
            
            <img src="${data.image}" alt="${data.name}" class="product-image">
            <h2 class="product-name">${data.name}</h2>
            <p class="product-category">Kategorie ID: ${data.id_category}</p>
            <p class="product-price">Preis: CHF ${data.price}</p>
            <p class="product-stock">Lagerbestand: ${data.stock}</p>
            <p class="product-active">Aktiv: ${data.active}</p>
            <label>Description:</label>
            <div class="product-description">${data.description}</div>`;

            // initializes action button event listeners after elements are rendered
            this.deleteProduct();
            this.editProduct();

        });


    }

    /**
     * Attaches a click event listener to the delete button.
     * Asks for confirmation and sends a DELETE request to the API.
     * 
     * @returns void
     */
    deleteProduct() {
        const deleteButton = document.getElementById("delete-product");

        deleteButton.addEventListener("click", () => {
            // asks the user for confirmation before deleting
            if (confirm("Sind Sie sicher, dass Sie dieses Produkt löschen möchten?")) {
                const params = new URLSearchParams(document.location.search);
                const sku = params.get("sku");

                // sends a DELETE request to remove the product
                fetch(AuthController.API_URL + `/product/${sku}`, {
                    method: "DELETE",
                    credentials: "include",

                }).then((response) => {
                    if (response.ok) {
                        alert("Produkt erfolgreich gelöscht");
                        window.location.href = "/products.php"; // redirects back to product list
                    }
                }).catch((error) => {
                    console.error("Fehler beim Löschen des Produkts:", error);
                });
            }
        });
    }

    /**
     * Attaches a click event listener to the edit button 
     * to redirect to the form page with the product SKU in the URL.
     * 
     * @returns void
     */
    editProduct() {
        const editButton = document.getElementById("edit-product");
        
        editButton.addEventListener("click", () => {
            const params = new URLSearchParams(document.location.search);
            const sku = params.get("sku");

            // redirects to the form page for editing
            window.location.href = `/create-product.php?sku=${sku}`;
        });
    }
}

const productDetailController = new ProductDetailController();

productDetailController.loadProductDetails();