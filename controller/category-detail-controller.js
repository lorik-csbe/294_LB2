/**
 * Controls the category detail page by fetching and rendering
 * the details of a single category based on the URL parameter.
 */
class CategoryDetailController {
    /**
     * Reads the category ID from the URL, fetches its data from the API,
     * and updates the detail view in the DOM.
     */
    loadCategory() {
        // Parse query parameters from the current page URL
        const urlParams = new URLSearchParams(window.location.search);
        const categoryId = urlParams.get("category-ID");

        // Stop execution if no category ID is present in the URL
        if (!categoryId) return;

        // fetches category details
        fetch(AuthController.API_URL + `/category/${categoryId}`, {
            credentials: "include",
            method: "GET"
        })
        .then((response) => {
            if (response.ok) {
                console.log("Kategoriendetails erfolgreich geladen");
                return response.json();
            }
        })
        .then((data) => {
            const categoryDetailContainer = document.getElementById("category-detail-container");

            // Convert active status (1)
            const isActive = data.active == 1;

            let dotColor;

            // Show green for active categories, red otherwise
            if (isActive) {
                dotColor = "green";
            } else {
                dotColor = "red";
            }

            // Render category name and status indicator into the container
            categoryDetailContainer.innerHTML =
            `
            <div class="info-box">
                <label class="categoryName">${data.name}</label>
            </div>
            <div class="info-box">
                <label class="activeLabel">Active:</label>
                <span class="active-dot" style="background-color: ${dotColor};"></span>
            </div>
            `;
        });
    }
}

const categoryDetailsContainer = new CategoryDetailController();
categoryDetailsContainer.loadCategory();