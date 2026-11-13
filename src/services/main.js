import { getCreatures, getCreature } from "./api.js";
import { getFavorites, toggleFavorite, saveSearch, getLastSearch } from "./storage.js";
import { showLoading, showEmpty, showError, showCards, showDetail } from "./ui.js";

let allCreatures = [];
let searchResult = null;
let page = 0;
let currentFilter = "Tous";
let busy = false;

const searchInput = document.getElementById("search");
const filters = document.getElementById("filters");

// ----- Boutons li kaykhelqhom JS (ma kaynin-ch f index.html) -----
const searchBtn = document.createElement("button");
searchBtn.type = "button";
searchBtn.textContent = "Rechercher";
searchBtn.className = "bg-ink text-white border-2 border-ink px-4 py-2.5 rounded-xl font-bold";

const clearBtn = document.createElement("button");
clearBtn.type = "button";
clearBtn.textContent = "Effacer";
clearBtn.className = "border-2 border-ink px-4 py-2.5 rounded-xl font-bold hover:bg-ink hover:text-white transition";

const actions = document.createElement("div");
actions.className = "flex gap-2";
actions.append(searchBtn, clearBtn);
searchInput.closest("label").insertAdjacentElement("afterend", actions);

const loadMoreBtn = document.createElement("button");
loadMoreBtn.type = "button";
loadMoreBtn.textContent = "Charger plus";
loadMoreBtn.className = "self-start border-2 border-ink px-5 py-2 rounded-xl font-bold hover:bg-ink hover:text-white transition";
filters.insertAdjacentElement("afterend", loadMoreBtn);

const favBtn = document.createElement("button");
favBtn.type = "button";
favBtn.textContent = "Favoris";
favBtn.className = filters.querySelectorAll("button")[1].className;
filters.appendChild(favBtn);

function setBusy(value) {
  busy = value;
  searchBtn.disabled = value;
  clearBtn.disabled = value;
  loadMoreBtn.disabled = value;
}

function getFavIds() {
  return getFavorites().map((f) => f.id);
}

function getErrorMessage(error) {
  if (error.message.startsWith("Erreur")) {
    return error.message;
  }
  return "Pas de connexion ou serveur en panne.";
}

function render() {
  let list = allCreatures;
  if (searchResult !== null) {
    list = searchResult;
  }

  if (currentFilter === "Favoris") {
    list = getFavorites();
  } else if (currentFilter !== "Tous") {
    list = list.filter((c) => c.type.toLowerCase() === currentFilter.toLowerCase());
  }

  if (list.length === 0) {
    showEmpty("Aucune créature trouvée.");
  } else {
    showCards(list, getFavIds());
  }

  loadMoreBtn.hidden = searchResult !== null;

  const count = document.getElementById("creature-count");
  if (count) count.textContent = allCreatures.length;
}

async function loadList() {
  if (busy) return;
  setBusy(true);

  if (allCreatures.length === 0) {
    showLoading("grid");
  }

  try {
    const newCreatures = await getCreatures(page);
    allCreatures = allCreatures.concat(newCreatures);
    page = page + 1;
    render();
  } catch (error) {
    showError(getErrorMessage(error), loadList, "grid");
  } finally {
    setBusy(false);
  }
}

async function search() {
  const term = searchInput.value.trim();
  if (term === "" || busy) return;

  saveSearch(term);
  setBusy(true);
  showLoading("grid");

  try {
    const creature = await getCreature(term.toLowerCase());
    searchResult = [creature];
    render();
  } catch (error) {
    if (error.message === "Erreur 404") {
      searchResult = [];
      showEmpty("Aucune créature trouvée pour « " + term + " »");
    } else {
      showError(getErrorMessage(error), search, "grid");
    }
  } finally {
    setBusy(false);
  }
}

function clearSearch() {
  searchInput.value = "";
  saveSearch("");
  searchResult = null;

  if (allCreatures.length === 0) {
    loadList();
  } else {
    render();
  }
}

async function openDetail(id) {
  showLoading("detail");
  try {
    const creature = await getCreature(id);
    showDetail(creature, getFavIds().includes(creature.id));
  } catch (error) {
    showError(getErrorMessage(error), () => openDetail(id), "detail");
  }
}

function toggleFav(id) {
  const all = allCreatures.concat(searchResult || [], getFavorites());
  const creature = all.find((c) => String(c.id) === String(id));
  if (!creature) return;

  toggleFavorite(creature);
  render();
}


document.getElementById("grid").addEventListener("click", (e) => {
  const star = e.target.closest("[data-fav]");
  if (star) {
    toggleFav(star.dataset.fav);
    return;
  }

  const card = e.target.closest("article");
  if (card) {
    openDetail(card.dataset.id);
  }
});

document.getElementById("detail").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-detail-fav]");
  if (btn) {
    toggleFav(btn.dataset.detailFav);
    openDetail(btn.dataset.detailFav);
  }
});

const filterButtons = document.querySelectorAll("#filters button");
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => {
      b.className = "chip shrink-0 px-3 py-1.5 rounded-full border-2 border-line hover:border-brand transition";
    });
    btn.className = "chip bg-ink text-white border-ink shrink-0 px-4 py-2 rounded-full font-bold";
    currentFilter = btn.textContent.trim();
    render();
  });
});

searchBtn.addEventListener("click", search);
clearBtn.addEventListener("click", clearSearch);
loadMoreBtn.addEventListener("click", loadList);
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") search();
});

const lastSearch = getLastSearch();
if (lastSearch !== "") {
  searchInput.value = lastSearch;
  search();
} else {
  loadList();
}