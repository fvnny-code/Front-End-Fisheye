// Template pour afficher les médias du photographe
export function mediaTemplate(media) {
    const { title, image, video, likes, date, price, id } = media;
    media.isLiked = media.isLiked || false; // Initialiser isLiked à false si ce n'est pas déjà fait

    // Si le média est une image
    const mediaDOM = `
        <div class= "gallery-item">
            <article class="item">
                ${image ? `<img src="assets/media/${image}" alt="${title}" id="${id}-media-openLightBox"/>` : ''}
                ${video ? `<video controls><source src="assets/media/${video}" type="video/mp4" id="${id}-media-openLightBox"></video>` : ''}
                <div class="media">
                     <h3 class="media-title">${title}</h3>
                     <p id="${id}-media-like" class="media-likes">${likes} ❤</p>
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