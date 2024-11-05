import { mediaFactory } from "./mediaFactory.js";
import { lightboxFactory } from "./lightboxFactory.js";

export class MediaGallery {
  constructor(medias, mediaSection, updateLikesDisplay, incrementLikes) {
    this.medias = medias;
    this.mediaSection = mediaSection;
    this.updateLikesDisplay = updateLikesDisplay;
    this.incrementLikes = incrementLikes;
    this.lightbox = lightboxFactory(medias);
  }

  // Fonction d'affichage et de tri
  displayMedias() {
    this.mediaSection.innerHTML = "";
    this.medias.forEach((media, index) => {
      const mediaHTML = mediaFactory(media);
      const template = document.createElement("template");
      template.innerHTML = mediaHTML.trim();
      const mediaDOM = template.content.firstElementChild;
      this.mediaSection.appendChild(mediaDOM);

      const mediaIdPrefix = `media-${media.id}`;
      const likeButton = mediaDOM.querySelector(`#${mediaIdPrefix}-like`);
      const lightboxOpener = mediaDOM.querySelector(
        `#${mediaIdPrefix}-openLightBox`
      );
      const videoElement = mediaDOM.querySelector("video");

      // Gestion des événements
      lightboxOpener.addEventListener("click", () =>
        this.lightbox.openLightbox(index)
      );
      likeButton.addEventListener("click", () => {
        this.incrementLikes(media, this.medias);
        likeButton.setAttribute("aria-pressed", "true");
      });

      if (videoElement) {
        videoElement.addEventListener("keydown", (event) => {
          if (event.key === " ") {
            event.preventDefault();
            videoElement.paused ? videoElement.play() : videoElement.pause();
          }
        });
      }
    });
  }

  // Fonction de tri et rafraîchissement de l'affichage
  sortAndDisplayMedias(sortType) {
    this.medias.sort((a, b) => {
      if (sortType === "popularity") return b.likes - a.likes;
      if (sortType === "date") return new Date(b.date) - new Date(a.date);
      return a.title.localeCompare(b.title);
    });
    this.displayMedias();
  }
}
