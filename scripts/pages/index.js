import { getPhotographers } from "../utils/data.js";
import { photographerTemplate } from '../templates/photographer.js';

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.innerHTML += userCardDOM;
    });
}

async function init() {
    const { photographers } = await getPhotographers();  // Utilise l'API pour récupérer les données
    displayData(photographers);
}

init();