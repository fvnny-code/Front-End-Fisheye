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
    const template = `
       <article>
            <img src="${this.portrait}" alt="Portrait de ${this.name}">
            <h2>
              <a href="photographer.html?id=${this.id}" aria-label="Aller à la page du photographe ${this.name}">${this.name}</a>
            </h2>
            <p>${this.city}, ${this.country}</p>
            <p>${this.tagline}</p>
            <span>${this.price} €/jour</span>
        </article>
        `;

    return template;
  }

 
}
// Fonction Factory pour créer une instance de Photographer
export function photographerFactory(data) {
  return new Photographer(data);
}
