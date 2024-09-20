// récupération de tous les photographes
export async function getPhotographers (){
  
        const response = await fetch("../data/photographers.json");
        const data  = response.json();
        return data;

}
