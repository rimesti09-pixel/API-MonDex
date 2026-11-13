const BASE_URL = "https://digi-api.com/api/v1/digimon";
const PAGE_SIZE = 20;

  async function requis(url){
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
        image: data.image?.[0]?.herf ??"",
        type : data.types?.[0]?.type ??"Inconnu",
        level: data.levels?.[0]?.level??"Inconnu",
        description:
        data.description?.find((d)=>d.language === "en_us")?.description?? "",
      };
    }
    export async function getCreature(idOrName) {
      const data = await request(`${BASE_URL}/${idOrName}`);
      return toCreature(data);
    }

    export async function getCreature(page = 0) {
      const data = await request(`${BASE_URL}?pageSize=${PAGE_SIZE}&page=${page}`);
  return Promise.all(data.content.map((item) => getCreature(item.id)));
}
      
    