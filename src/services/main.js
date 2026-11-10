import { getDigimons } from "./api.js";

async function init() {
    const digimons = await getDigimons();
    console.log("Voici les Digimons récupérés",digimons);
}
init();