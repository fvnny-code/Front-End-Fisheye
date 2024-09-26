
import Api from './Api.js'; 

export async function getPhotographers() {
    const api = new Api('../data/photographers.json');  // Spécifier l'URL du fichier JSON
    const data = await api.get();  
    return data;
}

export async function getMedias() {
    try {
        const fetchMedias = await fetch("data/photographers.json");
        if (!fetchMedias.ok) {
            throw new Error('Erreur récup data');
        }
        const dataMedias = await fetchMedias.json();
        const medias = dataMedias.media;
        return { medias };
    } catch (error) {
        console.error("Erreur: ", error);
        return {
            medias: []
        };
    }
}

