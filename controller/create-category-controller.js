/**
 * Controls creating and editing categories on the category form page.
 */
class CreateCategoryController {
    /**
     * Automatically runs when a new instance is created to initialize
     */
    constructor() {
        this.editMode();
        this.initForm();
        this.cancel();
    }

    /**
     * Checks if a category_id query parameter exists in the URL.
     * If so, loads existing category data and pre-fills the form inputs.
     */
    editMode() {
        const urlParams = new URLSearchParams(window.location.search);
        const categoryId = urlParams.get("category_id");

        // Stop if no category ID is provided (we are creating a new category)
        if (!categoryId) return;

        console.log("Edit mode for category ID:", categoryId);

        // Fetch existing category details
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
        .then((data) => {
            if (!data) return;
            // Sets form fields with the fetched category values
            document.getElementById("category-name").value = data.name;
            document.getElementById("category-active").value = data.active;
        })
        .catch((error) => console.error("Fehler beim Laden:", error));
    }

    /**
     * Attaches the submit handler to the category form to send
     * either a PATCH (update) or POST (create) request to the API.
     */
    initForm() {
        const form = document.getElementById("category-form");

        if (form) {
            form.addEventListener("submit", (event) => {
                // Prevent default browser form reload
                event.preventDefault();

                const name = document.getElementById("category-name").value;
                const active = document.getElementById("category-active").value;

                // Puts form values in an Object
                const categoryData = {
                    name: name,
                    active: active
                };

                const urlParams = new URLSearchParams(window.location.search);
                const categoryId = urlParams.get("category_id");

                let method;
                let url;

                /**
                 * Use PATCH when editing an existing category, POST when creating a new one 
                 */ 
                if (categoryId) {
                    method = "PATCH";
                    url = `/category/${categoryId}`;
                } else {
                    method = "POST";
                    url = "/category";
                }

                fetch(AuthController.API_URL + url, {
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
                .catch((error) => console.error("Fehler:", error));
            });
        }
    }

    /**
     * Redirects back to the home page when the cancel button is clicked.
     */
    cancel() {
        const cancelBtn = document.getElementById("back-button-category");

        if (cancelBtn) {
            cancelBtn.addEventListener("click", () => {
                window.location.href = "/index.php";
            });
        }
    }
}

// Create controller instance and run setup methods from constructor
const createCategoryInstance = new CreateCategoryController();