import { getPhotographers, getMedias } from "../utils/data.js";
import { photographerHeaderTemplate } from "../templates/photographerHeader.js";
import { mediaTemplate } from "../templates/mediaTemplate.js";
import { photographerRatingTemplate } from "../templates/photographerRatingTemplate.js";
import { lightboxFactory } from "../templates/lightbox.js";
import { displayModal, closeModal } from "../utils/contactForm.js";

async function fetchAndDisplayPhotographer() {
    const photographerId = new URLSearchParams(window.location.search).get("id");

    if (!photographerId) {
        console.error("Aucun ID de photographe trouvé dans l'URL.");
        return;
    }

    const { photographers } = await getPhotographers();
    const photographer = photographers.find((p) => p.id == photographerId);

    if (!photographer) {
        console.error(`Aucun photographe trouvé avec l'ID ${photographerId}`);
        return;
    }

    // Afficher les informations du photographe dans le header
    const photographerHeader = document.querySelector(".photograph-header");
    const photographerModel = photographerHeaderTemplate(photographer);
    photographerHeader.innerHTML = photographerModel.getPhotographerHeaderDOM();

    // Ajouter le gestionnaire d'événements au bouton "Contactez-moi"
    const contactButton = document.querySelector(".contact_button");
    if (contactButton) {
        contactButton.addEventListener("click", displayModal);
    } else {
        console.error("Le bouton Contactez-moi est introuvable");
    }

    // Récupérer et afficher les médias du photographe
    const { medias } = await getMedias();
    const photographerMedias = medias.filter((media) => media.photographerId == photographerId);

    // Initialisation de la Lightbox
    const lightbox = lightboxFactory(photographerMedias);

    const mediaSection = document.getElementById("gallery");
    // Attacher un événement de clic sur chaque média pour ouvrir la Lightbox
    photographerMedias.forEach((media, index) => {
        //Utiliser mediaTemplate pour générer la chaîne HTML
        const mediaHTML = mediaTemplate(media);
        //Convertir la chaîne HTML en un élément DOM
        const template = document.createElement("template");
        template.innerHTML = mediaHTML.trim(); // Supprimer les espaces blancs inutiles
        const mediaDOM = template.content.firstElementChild;

        //Ajouter un gestionnaire d'événement pour ouvrir la Lightbox
        mediaDOM.addEventListener("click", () => {
            lightbox.openLightbox(index); 
        });

        //Ajouter l'élément converti au DOM
        mediaSection.appendChild(mediaDOM);
    });

    // Calculer la somme des likes
    const totalLikes = photographerMedias.reduce((sum, media) => sum + media.likes, 0);

    // Afficher l'encart avec les likes et le tarif journalier
    const ratingSection = document.querySelector(".photographer-rating");
    const ratingModel = photographerRatingTemplate(totalLikes, photographer.price);
    ratingSection.innerHTML = ratingModel.getRatingDOM();

    // Ajouter l'événement de fermeture de la modale à l'icône de fermeture
    const closeButton = document.querySelector(".close-modal-icon");
    if (closeButton) {
        closeButton.addEventListener("click", closeModal);
    }
}

// Initialisation
fetchAndDisplayPhotographer();