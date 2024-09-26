import { getPhotographers } from '../utils/data.js';
import { photographerHeaderTemplate } from '../templates/photographerHeader.js';  // Import correct pour le header

async function fetchAndDisplayPhotographer() {
    const photographerId = new URLSearchParams(window.location.search).get('id');  // Récupère l'ID du photographe

    if (!photographerId) {
        console.error("Aucun ID de photographe trouvé dans l'URL.");
        return;
    }

    const { photographers } = await getPhotographers();  // Récupère les photographes
    const photographer = photographers.find(p => p.id == photographerId);

    if (!photographer) {
        console.error(`Aucun photographe trouvé avec l'ID ${photographerId}`);
        return;
    }

    // Affiche les informations dans le header
    const photographerHeader = document.querySelector(".photograph-header");
    const photographerModel = photographerHeaderTemplate(photographer);
    photographerHeader.innerHTML = photographerModel.getPhotographerHeaderDOM();  // Utilise la méthode du header
}

// Initialisation
fetchAndDisplayPhotographer();