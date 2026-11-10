class ProductDetailController {
    loadProductDetails() {
        const params = new URLSearchParams(document.location.search);

        const sku = params.get("sku");

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

            this.deleteProduct();
            this.editProduct();

        });


    }

    deleteProduct() {
        const deleteButton = document.getElementById("delete-product");

        deleteButton.addEventListener("click", () => {
            if (confirm("Sind Sie sicher, dass Sie dieses Produkt löschen möchten?")) {
                const params = new URLSearchParams(document.location.search);
                const sku = params.get("sku");

                fetch(AuthController.API_URL + `/product/${sku}`, {
                    method: "DELETE",
                    credentials: "include",

                }).then((response) => {

                    if (response.ok) {
                        alert("Produkt erfolgreich gelöscht");
                        window.location.href = "/products.php";
                    }
                }).catch((error) => {
                    console.error("Fehler beim Löschen des Produkts:", error);
                });
            }
        });
    }

    editProduct() {
        const editButton = document.getElementById("edit-product");
        
        editButton.addEventListener("click", () => {
            const params = new URLSearchParams(document.location.search);
            const sku = params.get("sku");

            window.location.href = `/create-product.php?sku=${sku}`;
        });
    }
}

const productDetailController = new ProductDetailController();

productDetailController.loadProductDetails();
