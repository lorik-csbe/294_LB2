class CategoryDetailController {
    loadCategory() {
        const urlParams = new URLSearchParams(window.location.search);
        const categoryId = urlParams.get("category-ID");

        if (!categoryId) return;

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

            const isActive = data.active == 1;

            let dotColor;

            if (isActive == 1) {
                dotColor = "green";
            } else {
                dotColor = "red";
            }

            categoryDetailContainer.innerHTML =
            `
            <div class="info-box">
                <label class="categoryName">${data.name}</label>
            </div>
            <div class="info-box">
                <label class="activeLabel">Active:</label>
                <span class="active-dot" style="background-color: ${dotColor};"></span>
            </div>
            `
        })




    }
}
const categoryDetailsContainer = new CategoryDetailController();

categoryDetailsContainer.loadCategory();
