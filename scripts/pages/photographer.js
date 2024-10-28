import { getPhotographers, getMedias } from "../utils/data.js";
import { photographerHeaderTemplate } from "../templates/photographerHeader.js";
import { mediaTemplate, getTotalLikes } from "../templates/mediaTemplate.js";
import { photographerRatingTemplate } from "../templates/photographerRatingTemplate.js";
import { lightboxFactory } from "../templates/lightbox.js";
import { displayModal, closeModal } from "../utils/contactForm.js";
import { sortMedias } from "../utils/sort.js";

// Fonction pour activer ou désactiver le focus des éléments en arrière-plan
export function togglePageFocus(enable) {
  const elements = document.querySelectorAll("header, main, footer");
  elements.forEach((element) => {
    element.setAttribute("aria-hidden", !enable);
  });
}

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

      // Utiliser le même préfixe que dans mediaTemplate
      const mediaIdPrefix = `media-${media.id}`;

      // Sélection des éléments pour la Lightbox et les likes
      const lightboxOpener = mediaDOM.querySelector(
        `#${mediaIdPrefix}-openLightBox`
      );
      const likeButton = mediaDOM.querySelector(`#${mediaIdPrefix}-like`);
      const videoElement = mediaDOM.querySelector("video");

      lightboxOpener.addEventListener("click", (event) => {
        lightbox.openLightbox(index);
      });
      lightboxOpener.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          lightbox.openLightbox(index); // Simule un clic pour ouvrir la Lightbox
        }
      });
      // Lecture/Pause des vidéos avec le clavier
      if (videoElement) {
        videoElement.addEventListener("keydown", (event) => {
          if (event.key === " ") {
            event.preventDefault();
            videoElement.paused ? videoElement.play() : videoElement.pause();
          }
        });
      }

      // Gestion des likes
      likeButton.addEventListener("click", () => {
        incrementLikes(media, sortedMedias, photographer, mediaDOM);
        likeButton.setAttribute("aria-pressed", "true");
      });
      likeButton.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          likeButton.click(); // Simule un clic pour ajouter un like
        }
      });

      mediaSection.appendChild(mediaDOM);
    });
  }
  // Appel initial pour afficher les médias non triés
  displaySortedMedias(photographerMedias);

  // Gestion du tri
  const dropdownSelected = document.querySelector(".dropdown-selected");
  const dropdownContent = document.querySelector(".dropdown-content");

  // Ajouter des attributs d'accessibilité
  dropdownSelected.setAttribute("tabindex", "0"); // Rendre focusable
  dropdownSelected.setAttribute("role", "button"); // Indiquer son interactivité
  dropdownSelected.setAttribute("aria-haspopup", "listbox"); // Indiquer que le menu est une liste
  dropdownSelected.setAttribute("aria-expanded", "false"); // Indiquer que le menu est fermé par défaut

  // Fonction pour afficher/masquer le menu
  dropdownSelected.addEventListener("click", () => {
    const isExpanded =
      dropdownSelected.getAttribute("aria-expanded") === "true";
    dropdownSelected.setAttribute("aria-expanded", !isExpanded);
    dropdownContent.classList.toggle("show");
  });
  dropdownSelected.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      // Gérer Enter et Espace
      event.preventDefault();
      dropdownSelected.click(); // Simuler un clic pour ouvrir/fermer le menu
    }
  });

  // Sélection des items et gestion du tri
  const dropdownItems = document.querySelectorAll(".dropdown-item");
  dropdownItems.forEach((item) => {
    // Sélection au clic
    item.addEventListener("click", (event) => {
      const sortType = event.target.getAttribute("data-value");
      dropdownSelected.innerHTML = `${event.target.textContent} <span class="chevron">▼</span>`;

      // Trier et réafficher les médias
      photographerMedias = sortMedias(photographerMedias, sortType);
      displaySortedMedias(photographerMedias);

      // Gestion des classes d'affichage
      dropdownContent.classList.remove("show");
      dropdownItems.forEach((el) => el.classList.remove("hidden"));
      event.target.classList.add("hidden");
    });

    // Gestion du clavier
    item.addEventListener("keydown", (event) => {
      if (["ArrowDown", "ArrowUp"].includes(event.key)) {
        event.preventDefault();
        const currentIndex = [...dropdownItems].indexOf(event.target);
        const nextIndex =
          event.key === "ArrowDown" ? currentIndex + 1 : currentIndex - 1;
        dropdownItems[nextIndex]?.focus();
      }
      if (["Enter", " "].includes(event.key)) {
        event.preventDefault();
        item.click(); // Simuler un clic pour sélectionner
      }
    });

    // Ajouter un rôle et rendre focusable
    item.setAttribute("tabindex", "0");
    item.setAttribute("role", "menuitem");
  });

  // Focus sur le premier item au clic sur le dropdown
  dropdownSelected.addEventListener("click", () => {
    dropdownItems[0].focus();
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
