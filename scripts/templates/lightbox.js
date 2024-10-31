import { togglePageFocus } from "../utils/focusUtils.js";
import {
  toggleFocusOnBackground,
  trapFocusInElement,
  enableKeyboardNavigation,
} from "../utils/accessibility.js";

export class Lightbox {
  constructor(medias) {
    this.medias = medias;
    this.currentIndex = 0;
    this.lightboxElement = null;
    this.initLightbox();
  }

  initLightbox() {
    const lightboxHtml = `
      <div class="lightbox-overlay" id="lightboxOverlay" role="dialog" aria-label="Vue agrandie">
          <div class="lightbox-content">
              <button class="lightbox-close" aria-label="Fermer la vue agrandie">&times;</button>
              <div class="lightbox-media-container" id="lightboxMediaContainer"></div>
              <button class="lightbox-prev" aria-label="Média précédent">&#8249;</button>
              <button class="lightbox-next" aria-label="Média suivant">&#8250;</button>
               <h3 id="lightbox-media-title" aria-hidden="false"></h3>
          </div>
      </div>
    `;
    document.body.insertAdjacentHTML("beforeend", lightboxHtml);
    this.lightboxElement = document.getElementById("lightboxOverlay");
    this.attachEventListeners();
  }

  attachEventListeners() {
    const closeButton = this.lightboxElement.querySelector(".lightbox-close");
    closeButton.addEventListener("click", () => this.closeLightbox());

    const nextButton = this.lightboxElement.querySelector(".lightbox-next");
    const prevButton = this.lightboxElement.querySelector(".lightbox-prev");
    nextButton.addEventListener("click", () => this.navigate(1));
    prevButton.addEventListener("click", () => this.navigate(-1));

    document.addEventListener("keydown", (event) =>
      this.handleKeyboardNavigation(event)
    );
  }

  openLightbox(index) {
    this.currentIndex = index;
    this.updateLightboxMedia();
    this.lightboxElement.style.display = "flex";

    this.lightboxElement.querySelector(".lightbox-close").focus();
    toggleFocusOnBackground(false); // Désactiver le focus en arrière-plan
    trapFocusInElement(this.lightboxElement); // Piéger le focus dans la lightbox
    enableKeyboardNavigation(this.lightboxElement, {
      onNext: () => this.navigate(1),
      onPrev: () => this.navigate(-1),
      onClose: () => this.closeLightbox(),
    });
  }

  closeLightbox() {
    this.lightboxElement.style.display = "none";
    togglePageFocus(true); // Réactive le focus des éléments en arrière-plan
    toggleFocusOnBackground(true); // Réactiver le focus en arrière-plan
  }

  navigate(direction) {
    this.currentIndex =
      (this.currentIndex + direction + this.medias.length) % this.medias.length;
    this.updateLightboxMedia();
  }

  updateLightboxMedia() {
    const mediaContainer = this.lightboxElement.querySelector(
      "#lightboxMediaContainer"
    );
    mediaContainer.innerHTML = "";

    const currentMedia = this.medias[this.currentIndex];
    let mediaElement;

    if (currentMedia.image) {
      mediaElement = document.createElement("img");
      mediaElement.src = `assets/media/${currentMedia.image}`;
      mediaElement.alt = currentMedia.title;
    } else if (currentMedia.video) {
      mediaElement = document.createElement("video");
      mediaElement.src = `assets/media/${currentMedia.video}`;
      mediaElement.controls = true;

      // Lecture/Pause de la vidéo dans la lightbox avec la barre d'espace
      mediaElement.addEventListener("keydown", (event) => {
        if (event.key === " ") {
          event.preventDefault();
          mediaElement.paused ? mediaElement.play() : mediaElement.pause();
        }
      });
    }

    mediaContainer.appendChild(mediaElement);
    // Mettre à jour le titre avec aria-live pour que le lecteur d'écran l'annonce
    const mediaTitle = document.querySelector("#lightbox-media-title");
    mediaTitle.textContent = currentMedia.title;
    mediaTitle.setAttribute("aria-live", "polite");
  }

  handleKeyboardNavigation(event) {
    const mediaContainer = this.lightboxElement.querySelector(
      "#lightboxMediaContainer"
    );
    const mediaElement = mediaContainer.querySelector("video");

    if (event.key === "ArrowRight") {
      this.navigate(1);
    } else if (event.key === "ArrowLeft") {
      this.navigate(-1);
    } else if (event.key === "Escape") {
      this.closeLightbox();
    } else if (event.key === " " && mediaElement) {
      // Espace pour vidéo
      event.preventDefault(); // Empêche le comportement par défaut
      if (mediaElement.paused) {
        mediaElement.play();
      } else {
        mediaElement.pause();
      }
    }
  }
}
export function lightboxFactory(medias) {
  return new Lightbox(medias);
}
