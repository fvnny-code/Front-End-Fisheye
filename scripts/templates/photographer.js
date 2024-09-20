// photographer.js

// Classe Photographer qui encapsule les données d'un photographe
class Photographer {
    constructor({ name, portrait, city, country, tagline, price, id }) {
        this.name = name;
        this.portrait = `assets/photographers/${portrait}`;
        this.city = city;
        this.country = country;
        this.tagline = tagline;
        this.price = price;
        this.id = id;
    }

    // Méthode pour générer la carte HTML du photographe
    getUserCardDOM() {
        const article = document.createElement('article');

        const img = document.createElement('img');
        img.setAttribute("src", this.portrait);
        img.setAttribute("alt", this.name);

        const h2 = document.createElement('h2');
        h2.textContent = this.name;

        const cityCountry = document.createElement('p');
        cityCountry.textContent = `${this.city}, ${this.country}`;

        const taglineEl = document.createElement('p');
        taglineEl.textContent = this.tagline;

        const priceEl = document.createElement('span');
        priceEl.textContent = `${this.price}€/jour`;

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(cityCountry);
        article.appendChild(taglineEl);
        article.appendChild(priceEl);

        return article;
    }
}

// Fonction factory pour créer une instance de Photographer
export function photographerTemplate(data) {
    return new Photographer(data);
}