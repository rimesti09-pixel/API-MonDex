export function showLoading(zoneId){
    document.getElementById(zoneId).innerHTML = `
    <div class ="col-span-full flex justify-center py-10">
      <div class ="h-10 w-10 animate-spin rounded-full border-4 border-line border-t-brand"></div>
    </div>
    `;
}

export function showEmpty (text){
    document.getElementById("grid").innerHTML=
    `<p class="col-span-full text-muted py-8">${text}</p>`;
}

export function showError(message, retryFunction, zoneId) {
    const zone = document.getElementById(zoneId);
    zone.innerHTML=`
    <div class="col-span-full text-center py-8">
    <p class="text-red-500 mb-3">${message}</p>
    <button class ="retry border-2 border-ink px-4 py-2 rounded-xl font-bold">Réessayer</button>
    </div>
    `;
    zone.querySelector(".retry").addEventListener("click", retryFunction);

}


export function showCards(list, favIds) {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  list.forEach((c) => {
    let star = "☆";
    if (favIds.includes(c.id)) {
      star = "★";
    }

    grid.innerHTML += `
      <article data-id="${c.id}" class="relative flex w-full max-w-md flex-col gap-3 rounded-card bg-white p-4 border border-line cursor-pointer hover:shadow-md transition">
        <button type="button" data-fav="${c.id}" class="absolute right-3 top-3 text-2xl">${star}</button>
        <img src="${c.image}" alt="${c.name}" class="h-36 w-full object-contain">
        <div class="flex items-center justify-between gap-2">
          <h3 class="font-display text-xl font-semibold">${c.name}</h3>
          <span class="rounded-full bg-brand-light px-3 py-1 text-sm font-bold text-brand-dark">${c.type}</span>
        </div>
        <p class="text-sm text-muted">#${c.id} · ${c.level}</p>
      </article>`;
  });
}

export function showDetail(c, isFav) {
  
  let bars = "";
  for (const label in c.stats) {
    const value = c.stats[label];
    let percent = value * 10;
    if (percent > 100) {
      percent = 100;
    }
    bars += `
      <div class="grid grid-cols-[90px_1fr_40px] items-center gap-2">
        <span class="font-bold">${label}</span>
        <span class="h-3 rounded-full bg-ground">
          <span class="block h-3 rounded-full bg-brand" style="width:${percent}%"></span>
        </span>
        <span class="text-right font-mono">${value}</span>
      </div>`;
  }

  let favText = "☆ Ajouter aux favoris";
  if (isFav) {
    favText = "★ Retirer des favoris";
  }

  document.getElementById("detail").innerHTML = `
    <div class="flex flex-col gap-3 p-4">
      <p class="font-mono text-sm font-bold text-muted">#${c.id} · Détail</p>
      <img src="${c.image}" alt="${c.name}" class="h-48 object-contain">
      <div class="flex items-center justify-between">
        <h2 class="font-display text-2xl font-bold">${c.name}</h2>
        <span class="rounded-full bg-brand-light px-3 py-1 text-sm font-bold text-brand-dark">${c.type}</span>
      </div>
      <p class="text-sm">${c.description}</p>
      <p class="text-sm text-muted">Niveau : ${c.level} · Sortie : ${c.releaseDate}</p>
      <div class="flex flex-col gap-2 text-sm">${bars}</div>
      <button type="button" data-detail-fav="${c.id}" class="border-2 border-ink py-2 rounded-xl font-bold">${favText}</button>
    </div>`;
}
