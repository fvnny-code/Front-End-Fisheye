class PhotographerRating {
  constructor(likes, price) {
    this.likes = likes;
    this.price = price;
  }

  // Méthode pour générer le DOM de l'encart des likes et du tarif
  getRatingDOM() {
    const template = `
        <div class="rating-container" aria-label="Encart des likes et tarif journalier">
            <p class="likes" aria-live="polite" aria-label="Nombre total de likes">
                <span id="total-likes">${this.likes}</span> ❤
            </p>
            <p class="price" aria-label="Tarif journalier">
                ${this.price}€/jour
            </p>
        </div>
    `;
    return template;
  }
}

// Fonction factory pour créer une instance de PhotographerRating
export function photographerRatingTemplate(likes, price) {
  return new PhotographerRating(likes, price);
}
