import { getDigimons } from "./api.js";
import { displayDigimons } from "./ui.js";

let allDigimons = [];

async function init() {
try{
     allDigimons = await getDigimons();
     displayDigimons(allDigimons);

 const searchInput= document.querySelector("#search");

 if(searchInput){
  searchInput.addEventListener("input", (e) => {
    const searchIerm = e.target.value.toLowerCase().trim();

    const filtereDigimons = allDigimons.filter(digimon =>
      digimon.name.toLowerCase().includes(searchIerm)
    );

    displayDigimons(filtereDigimons);
  });
 }

 console.log("Les Digimons sont affichés avec succés !");
}catch(error){
 console.error("Erreur lors de l'initialisation:", error);
  }
}
init();