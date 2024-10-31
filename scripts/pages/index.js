import { getPhotographers } from "../utils/data.js";
import { photographerFactory } from "../factories/photographerFactory.js";
import { enableKeyboardNavigation } from "../utils/accessibility.js";

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();

    // Créer un élément wrapper pour gérer le focus et les attributs ARIA
    const wrapper = document.createElement("div");
    wrapper.innerHTML = userCardDOM;
    wrapper.classList.add("photographer-card"); // Classe pour le style

    // Ajouter tabindex et rôle pour l’accessibilité
    wrapper.setAttribute("tabindex", "0"); // Rendre focusable
    wrapper.setAttribute("role", "link"); // Indiquer qu'il s'agit d'un lien interactif
    wrapper.setAttribute(
      "aria-label",
      `Accédez au profil de ${photographer.name}`
    );

    // Ajouter un gestionnaire d'événements pour activer le lien au clavier
    wrapper.addEventListener("click", () => {
      window.location.href = `photographer.html?id=${photographer.id}`;
    });
    wrapper.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        window.location.href = `photographer.html?id=${photographer.id}`;
      }
    });

    // Ajouter la carte à la section des photographes
    photographersSection.appendChild(wrapper);
  });

  // Activer la navigation au clavier
  enableKeyboardNavigation(photographersSection, {
    onSelect: (event) => event.target.click(),
  });
}

async function init() {
  const { photographers } = await getPhotographers(); // Utilise l'API pour récupérer les données
  displayData(photographers);
}

init();
