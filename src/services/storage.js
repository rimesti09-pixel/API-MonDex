const FAV_KEY ="favorites"
const SEARCH_KEY = "lastSearch";

export function getFavorites(){
    return JSON.parse(localStorage.getItem(FAV_KEY)) || [];
}

export function toggleFavorite(creature){
    let favs=getFavorites();
    if(favs.some((c) => c.id === creature.id)) {
        favs = favs.filter((c)=> c.id !== creature.id);
    }else{
        favs.push(creature);
    }
    localStorage.setItem(FAV_KEY, JSON.stringify(favs));
}
export function saveSearch(text){
 sessionStorage.setItem(SEARCH_KEY, text);
}
export function getLastSearch(){
return sessionStorage.getItem(SEARCH_KEY) || "";
}