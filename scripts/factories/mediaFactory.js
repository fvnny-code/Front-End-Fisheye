export function mediaFactory(media) {
  const { title, image, video, likes, id } = media;
  media.isLiked = media.isLiked || false;

  const mediaIdPrefix = `media-${id}`;

  const mediaDOM = `
      <div class="gallery-item">
        <article class="item" tabindex="0" aria-label="Media titled ${title}">
          ${
            image
              ? `<img src="assets/Media/${image}" alt="${title}" id="${mediaIdPrefix}-openLightBox" tabindex="0" />`
              : ""
          }
          ${
            video
              ? `<video controls tabindex="0" id="${mediaIdPrefix}-openLightBox" aria-label="Video titled ${title}">
                   <source src="assets/Media/${video}" type="video/mp4">
                 </video>`
              : ""
          }
          <div class="media">
            <h3 id= "media-title-${id}"class="media-title">${title}</h3>
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
