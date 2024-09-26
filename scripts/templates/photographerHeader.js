class PhotographerHeader {
  constructor({ name, portrait, city, country, tagline, price, id }) {
    this.name = name;
    this.portrait = `assets/photographers/${portrait}`;
    this.city = city;
    this.country = country;
    this.tagline = tagline;
    this.price = price;
    this.id = id;
  }
  // Méthode pour générer le DOM du header du photographe
  getPhotographerHeaderDOM() {
    const template = `
        <div class="photographer-info">
            <h1>${this.name}</h1>
            <h2>${this.city}, ${this.country}</h2>
            <p>${this.tagline}</p>
        </div>
        <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
        <img src="${this.portrait}" alt="${this.name}">
    `;
    return template;
  }
}
// Fonction pour créer une instance de PhotographerHeader
export function photographerHeaderTemplate(data) {
  return new PhotographerHeader(data);
}
