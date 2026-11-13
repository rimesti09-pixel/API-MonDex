const BASE_URL = "https://digi-api.com/api/v1/digimon";
const PAGE_SIZE = 20;

  async function request(url){
    const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Erreur ${response.status}`);
      }
      return response.json();
    }
    function toCreature(data){
      return{
        id:data.id,
        name:data.name,
        image: data.images?.[0]?.href ??"",
        type : data.types?.[0]?.type ??"Inconnu",
        level: data.levels?.[0]?.level??"Inconnu",
        description:
        data.descriptions?.find((d)=>d.language === "en_us")?.description ||
              "Pas de description.",
    releaseDate: data.releaseDate ?? "Inconnue",
    stats: {
      Skills: data.skills?.length ?? 0,
      Evolutions:
        (data.priorEvolutions?.length ?? 0) + (data.nextEvolutions?.length ?? 0),
      Attributs: data.attributes?.length ?? 0,
    },
      };
    }
    export async function getCreature(idOrName) {
      const data = await request(`${BASE_URL}/${idOrName}`);
      return toCreature(data);
    }

    export async function getCreatures(page = 0) {
      const data = await request(`${BASE_URL}?pageSize=${PAGE_SIZE}&page=${page}`);
  return Promise.all(data.content.map((item) => getCreature(item.id)));
}
      
    