class Lightbox {
  constructor(medias) {
    this.medias = medias;
    this.currentIndex = 0;
    this.lightboxElement = null;
    this.initLightbox();
  }

  initLightbox() {
    // Créer la structure HTML de la lightbox
    const lightboxHtml = `
            <div class="lightbox-overlay" id="lightboxOverlay" role="dialog" aria-label="Vue agrandie">
                <div class="lightbox-content">
                    <button class="lightbox-close" aria-label="Fermer la vue agrandie">&times;</button>
                    <div class="lightbox-media-container" id="lightboxMediaContainer"></div>
                    <button class="lightbox-prev" aria-label="Média précédent">&#8249;</button>
                    <button class="lightbox-next" aria-label="Média suivant">&#8250;</button>
                     <h3 id="lightbox-media-title"></h3>
                </div>
            </div>
        `;
    document.body.insertAdjacentHTML("beforeend", lightboxHtml);
    this.lightboxElement = document.getElementById("lightboxOverlay");
    this.attachEventListeners();
  }

  attachEventListeners() {
    // Gestion de la fermeture
    const closeButton = this.lightboxElement.querySelector(".lightbox-close");
    closeButton.addEventListener("click", () => this.closeLightbox());

    // Gestion de la navigation
    const nextButton = this.lightboxElement.querySelector(".lightbox-next");
    const prevButton = this.lightboxElement.querySelector(".lightbox-prev");
    nextButton.addEventListener("click", () => this.navigate(1));
    prevButton.addEventListener("click", () => this.navigate(-1));

    // Gestion des événements clavier
    document.addEventListener("keydown", (event) =>
      this.handleKeyboardNavigation(event)
    );
  }

  openLightbox(index) {
    this.currentIndex = index;
    this.updateLightboxMedia();
    this.lightboxElement.style.display = "flex";
  }

  closeLightbox() {
    this.lightboxElement.style.display = "none";
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
    }

    mediaContainer.appendChild(mediaElement);
    const mediaTitle = document.querySelector("#lightbox-media-title");
    mediaTitle.textContent= currentMedia.title; 
  }

  handleKeyboardNavigation(event) {
    if (event.key === "ArrowRight") {
      this.navigate(1);
    } else if (event.key === "ArrowLeft") {
      this.navigate(-1);
    } else if (event.key === "Escape") {
      this.closeLightbox();
    }
  }
}

// Fonction Factory pour créer une Lightbox
export function lightboxFactory(medias) {
  return new Lightbox(medias);
}
