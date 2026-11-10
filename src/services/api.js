const BASE_URL = "https://digi-api.com/api/v1/digimon";

  export async function getDigimons(){
    try{
        const response= await fetch(`{BASE_URL}?pageSize=20page=0`)
        const data = await response.json();
        data.content;
    }catch(error){
      console.log("Erreur lors de la récupération des Digimons")
    }
    
}mta