// Template pour afficher les médias du photographe
export function mediaTemplate(media) {
    const { title, image, video, likes, date, price } = media;

    // Si le média est une image
    const mediaDOM = `
        <div class= "gallery-item">
            <article class="item">
                ${image ? `<img src="assets/media/${image}" alt="${title}" />` : ''}
                ${video ? `<video controls><source src="assets/media/${video}" type="video/mp4"></video>` : ''}
                <div class="media">
                     <h2 class="media-title">${title}</h2>
                     <p class="media-likes">${likes} ❤</p>
                 </div>
          </article>
       </div> 
    `;

    return mediaDOM;
}