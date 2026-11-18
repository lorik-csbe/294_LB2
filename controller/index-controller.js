class IndexController {
    loginButton() {
        document.getElementById("login-button").addEventListener ("click", () => {
            window.location.href = "/login.php";
        })
    }

    loadCategory() {
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

            data.forEach(category => {

                const isActive = category.active == 1;

                let dotColor;

                if (isActive == 1) {
                    dotColor = "green";
                } else {
                    dotColor = "red";
                }

                categoryList.innerHTML +=
                `<div class="category-row" category-id=${category.category_id}>
                    <h3 class="categoryName">${category.name}</h3>
                    <span class="active-dot" style="background-color: ${dotColor};"></span>

                    <img src="view/images/bearbeiten.png" width: 10px; height: 10px; class="editCategorySymbol">
                    <img src="view/images/entfernen.png" width: 10px; height: 10px; class="deleteCategorySymbol">
                </div>`


                
            });

            this.deleteCategory();
            this.editCategory();
            this.categorySelection();
        })
        .catch((error) => {
            console.error("Error loading categories:", error);
        });
    }

    editCategory() {
        document.querySelectorAll(".editCategorySymbol").forEach((button) => {
            button.addEventListener("click", (e) => {

                const row = e.target.closest(".category-row");
                const categoryId = row.getAttribute("category-id");

                window.location.href = `create-category.php?category_id=${categoryId}`
            });
        });
    }

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
                            alert("Fehler beim Löschen")
                        }
                    })
                    .catch((error) => console.error("Fehler beim Löschen von der Kategorie:", error));
                }
            })
        })
    }

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

    createCategory() {
        document.getElementById("create-category-btn").addEventListener("click", () => {
            window.location.href = "/create-category.php"

        })
    }
}

const indexController = new IndexController();

indexController.loginButton();
indexController.loadCategory();
indexController.createCategory();