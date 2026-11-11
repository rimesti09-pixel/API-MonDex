export function displayDigimons(digimons){
    const container =document.getElementById("digimon-container");
    if (!container){
        console.error("Erreur: Le conteneur #digimon-container est introuvable !");
        return;
    
}

container.innerHTML="";
digimons.array.forEach(digimon => {
    const card=document.createElement("div");
    card.classList.add("digimon-card");

    card.innerHTML=`
    <img scr="${digimon.image}" alt="${digimon.name}">
    <h3>${digimon.name}</h3>
    <P>Niveau: ${digimon.level || 'Inconnu'}</p>
    `;
    container.appendChild(card);   
});
}