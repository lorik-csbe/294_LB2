/**
 * Controls the home page view, category listing, and category actions.
 */
class IndexController {
    /**
     * Redirects to the login page when the login button is clicked.
     */
    loginButton() {
        const loginBtn = document.getElementById("login-button");
        
        if (!loginBtn) return;

        loginBtn.addEventListener("click", () => {
            window.location.href = "/login.php";
        });
    }

    /**
     * Fetches categories from the API, toggles logged-in/out views,
     * and renders category rows into the home container.
     */
    loadCategory() {
        const loggedOutSite = document.getElementById("logged-out-site");
        const loggedInSite = document.getElementById("logged-in-site");

        if (!loggedOutSite || !loggedInSite) return;

        fetch(AuthController.API_URL + "/categories", {
            credentials: "include",
            method: "GET",
        })
        .then((response) => {
            if (response.ok) {
                document.getElementById("logged-out-site").style.display = "none";
                document.getElementById("logged-in-site").style.display = "flex";
                console.log("Kategorien erfolgreich geladen");
                return response.json();
            }
        })
        .then((data) => {
            const categoryList = document.getElementById("categoryContainerHome");

            if (!categoryList) return;

            data.forEach(category => {
                // Check if the category is marked as active
                const isActive = category.active == 1;

                let dotColor;

                // Set status indicator color (green for active, red otherwise)
                if (isActive == 1) {
                    dotColor = "green";
                } else {
                    dotColor = "red";
                }

                // Append category row with name, status dot, and edit/delete icons
                categoryList.innerHTML +=
                `<div class="category-row" category-id=${category.category_id}>
                    <h3 class="categoryName">${category.name}</h3>
                    <span class="active-dot" style="background-color: ${dotColor};"></span>

                    <img src="view/images/bearbeiten.png" width: 10px; height: 10px; class="editCategorySymbol">
                    <img src="view/images/entfernen.png" width: 10px; height: 10px; class="deleteCategorySymbol">
                </div>`;
            });

            this.deleteCategory();
            this.editCategory();
            this.categorySelection();
        })
        .catch((error) => {
            console.error("Error loading categories:", error);
        });
    }

    /**
     * Attaches click events to edit icons to open the category form with its ID.
     */
    editCategory() {
        document.querySelectorAll(".editCategorySymbol").forEach((button) => {
            button.addEventListener("click", (e) => {
                const row = e.target.closest(".category-row");
                const categoryId = row.getAttribute("category-id");

                window.location.href = `create-category.php?category_id=${categoryId}`;
            });
        });
    }

    /**
     * Attaches click events to delete icons to confirm and delete a category via API.
     */
    deleteCategory() {
        document.querySelectorAll(".deleteCategorySymbol").forEach((button) => {
            button.addEventListener("click", (e) => {
                if (confirm("Sind Sie sicher, dass Sie diese Kategorie löschen möchten?")) {
                    const row = e.target.closest(".category-row");
                    const categoryId = row.getAttribute("category-id");

                    fetch(AuthController.API_URL + `/category/${categoryId}`, {
                        credentials: "include",
                        method: "DELETE",
                    })
                    .then((response) => {
                        if (response.ok) {
                            alert("Kategorie erfolgreich gelöscht");
                        } else {
                            alert("Fehler beim Löschen");
                        }
                    })
                    .catch((error) => console.error("Fehler beim Löschen von der Kategorie:", error));
                }
            });
        });
    }

    /**
     * Attaches click handlers to category names to open the category detail view.
     */
    categorySelection() {
        Array.from(document.getElementsByClassName("categoryName")).forEach(name => {
            name.addEventListener("click", (e) => {
                e.preventDefault();

                const row = e.target.closest(".category-row");
                const categoryId = row.getAttribute("category-id");

                console.log("Kategorie-ID:", categoryId);

                window.location.href = `/category-detail.php?category-ID=${categoryId}`;
            });
        });
    }

    /**
     * Attaches a click handler to the add button to open the new category form.
     */
    createCategory() {
        const btn = document.getElementById("create-category-btn");
        
        if (!btn) return;

        btn.addEventListener("click", () => {
            window.location.href = "/create-category.php";
        });
    }
}

const indexController = new IndexController();

indexController.loginButton();
indexController.loadCategory();
indexController.createCategory();