
import Api from './Api.js'; 

export async function getPhotographers() {
    const api = new Api('../data/photographers.json');  // Spécifier l'URL du fichier JSON
    const data = await api.get();  
    return data;
}

