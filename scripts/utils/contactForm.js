import { formValidatorFactory } from "../templates/formValidator.js";  // Mise à jour du chemin de l'import

// Fonction pour afficher la modale
export function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";

    // Attacher l'événement de soumission du formulaire à la modale
    const form = document.querySelector("#contact_modal form");
    if (form) {
        const formValidator = formValidatorFactory(form);

        form.addEventListener("submit", function (event) {
            event.preventDefault(); // Empêche la soumission par défaut

            // Valide les champs du formulaire
            if (formValidator.validate()) {
                console.log("Formulaire soumis avec succès !");
                // Vous pouvez ajouter ici la logique pour envoyer les données au serveur
                form.reset(); // Réinitialise le formulaire après la soumission réussie
                closeModal(); // Ferme la modale
            }
        });
    }
}

// Fonction pour fermer la modale
export function closeModal() {
    const modal = document.getElementById("contact_modal");
    if (modal) {
        modal.style.display = "none"; // Masque la modale
    } else {
        console.error("La modale est introuvable");
    }
}