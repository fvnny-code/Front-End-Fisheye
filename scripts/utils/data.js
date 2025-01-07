import Api from "./Api.js";

export async function getPhotographers() {
  const baseUrl =
    window.location.hostname === "localhost"
      ? "../data/photographers.json"
      : "https://fvnny-code.github.io/Front-End-Fisheye/data/photographers.json";
  const api = new Api(baseUrl);
  const data = await api.get();
  return data;
}

export async function getMedias() {
  try {
    // Déterminer le chemin de base dynamique pour les ressources
    const baseUrl =
      window.location.hostname === "localhost"
        ? "../assets/Media/"
        : "https://fvnny-code.github.io/Front-End-Fisheye/assets/Media";

    // Récupérer les données des médias depuis le fichier JSON
    const fetchMedias = await fetch("data/photographers.json");
    if (!fetchMedias.ok) {
      throw new Error("Erreur récup data");
    }
    const dataMedias = await fetchMedias.json();
    const medias = dataMedias.Media;

    // Mettre à jour le chemin des médias pour qu'il soit dynamique
    const mediasWithFullPath = medias.map((Media) => {
      return {
        ...Media,
        // Ajout du chemin complet pour chaque média
        src: `${baseUrl}${Media.fileName}`,
      };
    });

    return { medias: mediasWithFullPath };
  } catch (error) {
    console.error("Erreur: ", error);
    return {
      medias: [],
    };
  }
}
