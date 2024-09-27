import { getPhotographers, getMedias } from "../utils/data.js";
import { photographerHeaderTemplate } from "../templates/photographerHeader.js";
import { mediaTemplate } from "../templates/mediaTemplate.js"; // Nouveau template pour les médias
import { photographerRatingTemplate } from "../templates/photographerRatingTemplate.js"; // Import du template pour l'encart des likes et du tarif

// Fonction pour afficher la modale
function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
}

// Fonction pour fermer la modale
function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

async function fetchAndDisplayPhotographer() {
  const photographerId = new URLSearchParams(window.location.search).get("id"); // Récupère l'ID du photographe

  if (!photographerId) {
    console.error("Aucun ID de photographe trouvé dans l'URL.");
    window.location = "index.html"; 
  }

  const { photographers } = await getPhotographers(); // Récupère les photographes
  const photographer = photographers.find((p) => p.id == photographerId); // Vérifie l'ID du photographe

  if (!photographer) {
    console.error(`Aucun photographe trouvé avec l'ID ${photographerId}`);
    window.location = "index.html"; 
  }

  // Afficher les informations du photographe dans le header
  const photographerHeader = document.querySelector(".photograph-header");
  const photographerModel = photographerHeaderTemplate(photographer);
  photographerHeader.innerHTML = photographerModel.getPhotographerHeaderDOM();

    // Maintenant que le template est injecté dans le DOM, ajoute le gestionnaire d'événements au bouton "Contactez-moi"
    const contactButton = document.querySelector(".contact_button");
    if (contactButton) {
        contactButton.addEventListener("click", displayModal);  // Ajoute l'événement pour ouvrir la modale
    } else {
        console.error("Le bouton Contactez-moi est introuvable");
    }

  // Récupérer et afficher les médias du photographe
  const { medias } = await getMedias();
  const photographerMedias = medias.filter(
    (media) => media.photographerId == photographerId
  ); // Filtre les médias du photographe

  const mediaSection = document.getElementById("gallery"); // Utilise l'ID de la div photograph-gallery
  photographerMedias.forEach((media) => {
    const mediaDOM = mediaTemplate(media); // Utilise le template pour générer l'affichage
    mediaSection.innerHTML += mediaDOM;
  });
  // Calculer la somme des likes
  const totalLikes = photographerMedias.reduce(
    (sum, media) => sum + media.likes,
    0
  );

  // Afficher l'encart avec les likes et le tarif journalier
  const ratingSection = document.querySelector(".photographer-rating");
  const ratingModel = photographerRatingTemplate(
    totalLikes,
    photographer.price
  );
  ratingSection.innerHTML = ratingModel.getRatingDOM();
}
 // Attacher l'événement pour fermer la modale
 const closeButton = document.querySelector(".close-modal-icon");
 if (closeButton) {
     closeButton.addEventListener("click", closeModal);
 }

// Initialisation
fetchAndDisplayPhotographer();
