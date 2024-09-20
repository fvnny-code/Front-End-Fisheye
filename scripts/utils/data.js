
import Api from './Api.js';  // Importer la classe Api

export async function getPhotographers() {
    const api = new Api('../data/photographers.json');  // Spécifier l'URL du fichier JSON
    const data = await api.get();  // Utiliser la méthode get() pour récupérer les données
    return data;
}

