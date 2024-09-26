import { getPhotographers, getMedias } from '../utils/data.js';
import { photographerHeaderTemplate } from '../templates/photographerHeader.js';
import { mediaTemplate } from '../templates/mediaTemplate.js';  // Nouveau template pour les médias

async function fetchAndDisplayPhotographer() {
    const photographerId = new URLSearchParams(window.location.search).get('id');  // Récupère l'ID du photographe

    if (!photographerId) {
        console.error("Aucun ID de photographe trouvé dans l'URL.");
        return;
    }

    const { photographers } = await getPhotographers();  // Récupère les photographes
    const photographer = photographers.find(p => p.id == photographerId);  // Vérifie l'ID du photographe

    if (!photographer) {
        console.error(`Aucun photographe trouvé avec l'ID ${photographerId}`);
        return;
    }

    // Afficher les informations du photographe dans le header
    const photographerHeader = document.querySelector(".photograph-header");
    const photographerModel = photographerHeaderTemplate(photographer);
    photographerHeader.innerHTML = photographerModel.getPhotographerHeaderDOM();

    // Récupérer et afficher les médias du photographe
    const { medias } = await getMedias();
    const photographerMedias = medias.filter(media => media.photographerId == photographerId);  // Filtre les médias du photographe

    const mediaSection = document.getElementById("gallery");  // Utilise l'ID de la div photograph-gallery
    photographerMedias.forEach(media => {
        const mediaDOM = mediaTemplate(media);  // Utilise le template pour générer l'affichage
        mediaSection.innerHTML += mediaDOM;
    });
}

// Initialisation
fetchAndDisplayPhotographer();