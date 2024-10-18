import { getPhotographers, getMedias } from "../utils/data.js";
import { photographerHeaderTemplate } from "../templates/photographerHeader.js";
import { mediaTemplate, getTotalLikes } from "../templates/mediaTemplate.js";
import { photographerRatingTemplate } from "../templates/photographerRatingTemplate.js";
import { lightboxFactory } from "../templates/lightbox.js";
import { displayModal, closeModal } from "../utils/contactForm.js";
import { sortMedias } from "../utils/sort.js";

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
  let photographerMedias = medias.filter(
    (media) => media.photographerId == photographerId
  );

  // Initialisation de la Lightbox
  const lightbox = lightboxFactory(photographerMedias);

  const mediaSection = document.getElementById("gallery");

  // Fonction pour afficher les médias triés
  function displaySortedMedias(sortedMedias) {
    mediaSection.innerHTML = ""; // Vider la galerie avant d'ajouter les médias triés

    sortedMedias.forEach((media, index) => {
      const mediaHTML = mediaTemplate(media);
      const template = document.createElement("template");
      template.innerHTML = mediaHTML.trim();
      const mediaDOM = template.content.firstElementChild;

      // Ajouter un gestionnaire d'événements pour la Lightbox et les likes
      mediaSection.appendChild(mediaDOM);
      document
        .getElementById(`${media.id}-media-openLightBox`)
        .addEventListener("click", () => {
          lightbox.openLightbox(index);
        });
      document
        .getElementById(`${media.id}-media-like`)
        .addEventListener("click", () => {
          incrementLikes(media, photographerMedias, photographer, mediaDOM);
        });
    });
  }

  // Appel initial pour afficher les médias non triés
  displaySortedMedias(photographerMedias);

  // Gestion du tri
  const dropdownSelected = document.querySelector(".dropdown-selected");
  const dropdownContent = document.querySelector(".dropdown-content"); // Sélection du contenu du dropdown

  // Gestionnaire d'événements pour afficher/masquer le menu
dropdownSelected.addEventListener("click", () => {
  const isExpanded = dropdownSelected.getAttribute("aria-expanded") === "true" || false;
  dropdownSelected.setAttribute("aria-expanded", !isExpanded);
  dropdownContent.classList.toggle("show"); // Afficher/masquer la liste
});

  // Sélection des items de dropdown
  const dropdownItems = document.querySelectorAll(".dropdown-item");
  dropdownItems.forEach((item) => {
    item.addEventListener("click", (event) => {
      const selectedValue = event.target.textContent;
      const sortType = event.target.getAttribute("data-value");

      // Mettre à jour le texte du bouton avec l'item sélectionné
      dropdownSelected.innerHTML = `${selectedValue} <span class="chevron">▼</span>`;
      // Trier les médias
      photographerMedias = sortMedias(photographerMedias, sortType);
      // Réafficher les médias triés
      displaySortedMedias(photographerMedias);

      // masquer l'élément sélectionné
      event.target.classList.add("hidden");
      // réaffichage de l'élément anciennement sélectionné
      const formerSort = dropdownSelected.getAttribute("data-value");
      const formerSelectedItem = document.querySelector(`.dropdown-item[data-value=${formerSort}]`);
      formerSelectedItem.classList.remove("hidden");
      
      dropdownSelected.setAttribute("data-value",sortType);
      
      // Fermer le menu si on clique à l'extérieur
      window.addEventListener("click", (event) => {
        if (!event.target.matches(".dropdown-selected")) {
          if (dropdownContent.classList.contains("show")) {
            dropdownContent.classList.remove("show");
          }
        }
      });
    });
  });

  // Calculer la somme des likes et afficher dans l'encart
  updateLikesDisplay(photographerMedias, photographer.price);

  // Ajouter l'événement de fermeture de la modale à l'icône de fermeture
  const closeButton = document.querySelector(".close-modal-icon");
  if (closeButton) {
    closeButton.addEventListener("click", closeModal);
  }
}

// Fonction pour incrémenter les likes et mettre à jour l'affichage
function incrementLikes(media, medias, photographer, mediaDOM) {
  if (!media.isLiked) {
    media.likes += 1;
    media.isLiked = true;

    const mediaLikesElement = mediaDOM.querySelector(".media-likes");
    if (mediaLikesElement) {
      mediaLikesElement.textContent = `${media.likes} ❤`;
    }

    updateLikesDisplay(medias, photographer.price);
  } else {
    console.log("Vous avez déjà liké ce média !");
  }
}

// Fonction pour mettre à jour l'affichage des likes dans ratingSection
function updateLikesDisplay(medias, price) {
  const totalLikes = getTotalLikes(medias);
  const ratingSection = document.querySelector(".photographer-rating");
  const ratingModel = photographerRatingTemplate(totalLikes, price);

  if (ratingSection) {
    ratingSection.innerHTML = ratingModel.getRatingDOM();
  } else {
    console.error("La section des likes et du prix est introuvable");
  }
}

// Initialisation
fetchAndDisplayPhotographer();
