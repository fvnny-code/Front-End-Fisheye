// Template pour afficher les médias du photographe
export function mediaTemplate(media) {
  const { title, image, video, likes, id, date, price } = media;
  media.isLiked = media.isLiked || false;

  const mediaIdPrefix = `media-${id}`;

  const mediaDOM = `
      <div class="gallery-item">
        <article class="item" tabindex="0" aria-label="Media titled ${title}">
          ${
            image
              ? `<img src="assets/media/${image}" alt="${title}" id="${mediaIdPrefix}-openLightBox" tabindex="0" />`
              : ""
          }
          ${
            video
              ? `<video controls tabindex="0" id="${mediaIdPrefix}-openLightBox" aria-label="Video titled ${title}">
                   <source src="assets/media/${video}" type="video/mp4">
                 </video>`
              : ""
          }
          <div class="media">
            <h3 class="media-title">${title}</h3>
            <p 
              id="${mediaIdPrefix}-like" 
              class="media-likes" 
              aria-pressed="${media.isLiked}" 
              tabindex="0" 
              role="button"
            >
              ${likes} ❤
            </p>
          </div>
        </article>
      </div> 
    `;

  return mediaDOM;
}

// Fonction pour calculer le total des likes
export function getTotalLikes(medias) {
  return medias.reduce((total, media) => total + media.likes, 0);
}
