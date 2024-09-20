export function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `../assets/photographers/${portrait}`;

    //texte affiché dans l'attribut alt de la balise a
    const ariaLink = `lien vers le profil du photographe ${name} `;
    //lien  vers le profil du photographe via son id
    const link = `photographer.html?id=${id}`;




    function getUserCardDOM() {
        const article = document.createElement('article');

        //ajout de l'élément clickable vers le profile du photographe
        const profileLink = document.createElement('a');
        //définition du texte alternatif pour le lien
        profileLink.setAttribute("aria-label", ariaLink);
        //lien (vide pour le moment)
        profileLink.setAttribute("href", link);
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", `photo de profil de ${name}`);
        const h2 = document.createElement('h2');
        h2.textContent = name;

        profileLink.appendChild(img);
        profileLink.appendChild(h2);

        //ville, tagline, price
        const h3 = document.createElement('h3');
        h3.textContent = `${city}, ${country}`;
        const p = document.createElement('p');
        p.textContent = tagline;
        const span = document.createElement('span');
        span.textContent = `${price}€/jour`;

        article.appendChild(profileLink);
        article.appendChild(h3);
        article.appendChild(p);
        article.appendChild(span);

        return (article);
    }


    return { name, picture, getUserCardDOM }
}
