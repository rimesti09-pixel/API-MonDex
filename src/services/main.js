import { getDigimons } from "./api.js";
import { displayDigimons } from "./ui.js";

let allDigimons = [];
let currentFilter="Tous";
let currentSearch =""

async function init() {
try{
     allDigimons = await getDigimons();
     filterAndRender();

 const searchInput= document.querySelector("#search");
 if(searchInput){
  searchInput.addEventListener("input", (e) => {
      currentSearch = e.target.value.toLowerCase().trim();
     filterAndRender();
  });
 }
 const filterButtons=document.querySelectorAll("#filters button");
 if(filterButtons.length > 0) {
  filterButtons.forEach(btn=>{
    btn.addEventListener("click", () => {
      filterButtons.forEach(btn=>{
      btn.className = "chip shrink-0 px-3 py-1.5 rounded-full border-2 border-line hover:border-brand transition";
          });
          btn.className = "chip bg-ink text-white border-ink shrink-0 px-4 py-2 rounded-full font-bold";

          currentFilter = btn.textContent.trim();
          filterAndRender();
        });
  });
    }
     
    console.log("Les Digimons sont affichés avec succés !");
  }catch(error){
    console.error("Erreur lors de l'initialisation:", error);
  }
}

function filterAndRender(){
let result = allDigimons;

if (currentFilter !== "Tous"){
  result = result.filter(digimon =>
    digimon.type && digimon.type.toLowerCase() === currentFilter.toLowerCase()
 );
}

if (currentSearch !== ""){
  result=result.filter(digimon =>
    digimon.name.toLowerCase().includes(currentSearch)
  );
}

displayDigimons(result);
}
init();