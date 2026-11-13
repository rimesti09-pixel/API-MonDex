export function displayDigimons(digimons){
    const container =document.getElementById("grid");

    if (!container){
        console.error("Erreur: Le conteneur #digimon-container est introuvable !");
        return;
    
}

container.innerHTML="";

if (!Array.isArray(digimons)){
    return;
}

digimons.forEach(digimon => {
    const card=document.createElement("div");
    card.classList.add("digimon-card");

    card.innerHTML=`
    <img src="${digimon.image}" alt="${digimon.name}">
    <h3>${digimon.name}</h3>
    <P>ID : #${digimon.id}</p>
    `;
    container.appendChild(card);   
});
}