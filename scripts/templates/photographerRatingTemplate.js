class PhotographerRating {
    constructor(likes, price) {
        this.likes = likes;
        this.price = price;
    }

    // Méthode pour générer le DOM de l'encart des likes et du tarif
    getRatingDOM() {
        const template = `
            <div class="rating-container">
                <p class="likes">
                    ${this.likes} ❤
                </p>
                <p class="price">
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