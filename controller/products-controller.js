/**
 * This class handles fetching, displaying, and navigating products 
 * in the main product catalog view.
 */
class ProductsController {
    
    /**
     * Fetches all products from the API endpoint and shows 
     * them as HTML cards into the product container.
     * 
     * @returns products
     */
    productLoading() {
        
        // fetches the products list from the API
        fetch(AuthController.API_URL + "/products", {
            credentials: "include",
            method: "GET",
            
        }).then((response) => {
            // checks if the response is successful and parses JSON
            if (response.ok) {
                console.log("Produkte erfolgreich geladen");
                return response.json();

            }
        })
        .then(data => {
            const container = document.getElementById("product-container");

            // loops through all products and appends their HTML markup
            data.forEach(product => {
                container.innerHTML +=
                `<div class="product-card" data-sku="${product.sku}">
                    <img src="${product.image}" alt="product-image" class="product-image">
                    <h2 class="product-name">${product.name}</h2>
                    <p class="product-price">CHF ${product.price}</p>
                    <p class="product-stock">Lagerbestand: ${product.stock}</p>
                </div>`;
            })

            // attaches event listeners to the newly rendered product cards
            this.productSelection();
        })
        
        .catch((error) => {
            // handles any errors during the fetch process
            console.error("Fehler beim Laden der Produkte:", error);
        });

        
    }

    /**
     * Attaches a click event listener to the add button 
     * to navigate to the product creation page.
     * 
     * @returns void
     */
    createProductButton() {
        const createProductButton = document.getElementById("add-symbol");

        // checks if the button exists before attaching event listener
        if (createProductButton) {
            createProductButton.addEventListener("click", () => {
                window.location.href = "/create-product.php";
            });
        }
    }

    /**
     * Adds click event listeners to all product cards 
     * to navigate to their specific detail view using the product SKU.
     * 
     * @returns void
     */
    productSelection() {
        // converts HTMLCollection of product cards to an array
        Array.from(document.getElementsByClassName("product-card")).forEach(card => {
            card.addEventListener("click", (e) => {
                e.preventDefault();

                // extracts the data-sku attribute from the clicked card
                const sku = card.getAttribute("data-sku");

                console.log("Produkt-SKU:", sku);
                // redirects to the detail page with the SKU as a URL parameter
                window.location.href = `/product-detail.php?sku=${sku}`;
            });
        });
    }


}




const controller = new ProductsController();

controller.createProductButton();
controller.productLoading();
controller.productSelection();