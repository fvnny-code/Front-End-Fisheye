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
    const fetchMedias = await fetch("data/photographers.json");
    if (!fetchMedias.ok) {
      throw new Error("Erreur récup data");
    }
    const dataMedias = await fetchMedias.json();
    const medias = dataMedias.media;
    return { medias };
  } catch (error) {
    console.error("Erreur: ", error);
    return {
      medias: [],
    };
  }
}
