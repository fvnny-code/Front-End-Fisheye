export function sortMedias(medias, sortType) {
    const sortedMedias = [...medias]; // Cloner le tableau des médias pour ne pas modifier l'original
    switch (sortType) {
        case "popularity":
            return sortedMedias.sort((a, b) => b.likes - a.likes);
        case "date":
            return sortedMedias.sort((a, b) => new Date(b.date) - new Date(a.date));
        case "title":
            return sortedMedias.sort((a, b) => a.title.localeCompare(b.title));
        default:
            return sortedMedias; // Retourne les médias non triés par défaut
    }
}