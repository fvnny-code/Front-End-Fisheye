export default class Api {
  constructor(url) {
    this.url = url;
  }

  async get() {
    try {
      const response = await fetch(this.url);
      if (!response.ok) {
        throw new Error(
          `Erreur lors de la récupération des données : ${response.status}`
        );
      }
      const data = await response.json();
      return data;
    } catch (err) {
      throw new Error(`Erreur lors de l'appel à l'API : ${err.message}`);
    }
  }
}
