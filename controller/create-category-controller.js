class CreateCategoryController {
    constructor() {
        this.editMode();
        this.initForm();
    }

    editMode() {
        const urlParams = new URLSearchParams(window.location.search);
        const categoryId = urlParams.get("category_id");

        if (!categoryId) return;

        if (categoryId) {
            console.log("Edit mode for category ID:", categoryId);
            
            fetch(AuthController.API_URL + `/category/${categoryId}`, {
                method: "GET",
                credentials: "include",

            })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.error("Fehler beim Aufrufen der Kategorieinformationen");
                }
            })
            .then(data => {
                document.getElementById("category-name").value = data.name;
                document.getElementById("category-active").value = data.active;
            })
            .catch(error => console.error("Fehler beim Laden:", error));
        }


    }

    initForm() {
        const form = document.getElementById("category-form");

        if(form) {
            form.addEventListener("submit", (event) => {
                event.preventDefault();

                const name = document.getElementById("category-name").value;
                const active = document.getElementById("category-active").value;

                const categoryData = {
                    name: name,
                    active: active
                };

                const urlParams = new URLSearchParams(window.location.search);
                const categoryId = urlParams.get("category_id");

                let method;
                let url;

                if (categoryId) {
                    method = "PATCH",
                    url = `/category/${categoryId}`
                } else {
                    method = "POST",
                    url = "/category"
                }

                fetch (AuthController.API_URL + url, {
                    method: method,
                    credentials: "include",
                        
                    body: JSON.stringify(categoryData),
                })
                .then((response) => {
                    if (response.ok) {
                        console.log("Kategorie erfolgreich gespeichert");
                        window.location.href = "/index.php";
                    } else {
                        console.error("Fehler beim Speichern der Kategorie");
                        alert("Fehler beim Speichern der Kategorie");

                    }
                })
                .catch(error => console.error("Fehler:", error));                
            })
        }

    }

    cancel() {
        const cancelBtn = document.getElementById("back-button-category");

        if (cancelBtn) {
            cancelBtn.addEventListener("click", () => {
                window.location.href = "/index.php";
            })
        }
    }
}

const createCategoryInstance = new CreateCategoryController();

createCategoryInstance.cancel();