import { getDigimons } from "./api.js";
import { getDigimons } from "./ui.js";
async function init() {
try{
    const digimons = await getDigimons();
 displayDigimons(digimons);

 console.log("Les Digimons sont affichés avec succés !");
}catch(error){
 console.error("Erreur lors de l'initialisation:", error);
  }
}
init();