class ProductsController {
    productLoading() {
        
        fetch(AuthController.API_URL + "/products", {
            credentials: "include",
            method: "GET",
            
        }).then((response) => {
            if (response.ok) {
                console.log("Produkte erfolgreich geladen");
                return response.json();

            }
        })
        .then(data => {
            const container = document.getElementById("product-container");

            data.forEach(product => {
                container.innerHTML +=
                `<div class="product-card">
                    <img src="${product.image}" alt="product-image" class="product-image">
                    <h2 class="product-name">${product.name}</h2>
                    <p class="product-price">CHF ${product.price}</p>
                    <p class="product-stock">Lagerbestand: ${product.stock}</p>
                </div>`;
            })
        })
        
        .catch((error) => {
            console.error("Fehler beim Laden der Produkte:", error);
        });

        
    }


}

const controller = new ProductsController();
controller.productLoading();