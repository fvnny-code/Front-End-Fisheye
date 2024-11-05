import { formValidatorFactory } from "./formValidator.js"; // Mise à jour du chemin de l'import

let openButton = null; // Variable pour stocker l'élément qui a ouvert la modale

// Fonction pour afficher la modale
export function displayModal() {
  const modal = document.getElementById("contact_modal");
  openButton = document.activeElement; // Stocker l'élément qui a déclenché l'ouverture

  modal.style.display = "block";
  document.getElementById("prenom").focus(); // Focus sur le premier champ

  // Attacher l'événement de soumission du formulaire à la modale
  const form = document.querySelector("#contact_modal form");
  if (form) {
    const formValidator = formValidatorFactory(form);

    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Empêche la soumission par défaut

      // Valide les champs du formulaire
      if (formValidator.validate()) {
        console.log("Formulaire soumis avec succès !");
        form.reset(); // Réinitialise le formulaire après la soumission réussie
        closeModal(); // Ferme la modale
      }
    });
  }

  // Écouter la touche "Échap" pour fermer la modale
  document.addEventListener("keydown", handleEscapeKey);
}

// Fonction pour fermer la modale
export function closeModal() {
  const modal = document.getElementById("contact_modal");
  if (modal) {
    modal.style.display = "none"; // Masque la modale
    if (openButton) {
      openButton.focus(); // Renvoie le focus au bouton "Contactez-moi"
    }
  } else {
    console.error("La modale est introuvable");
  }

  // Retirer l'écouteur d'événements sur la touche "Échap"
  document.removeEventListener("keydown", handleEscapeKey);
}

// Gestion de la touche "Échap"
function handleEscapeKey(event) {
  if (event.key === "Escape") {
    closeModal();
  }
}
