# DigiDex · Dex connecté à l'API Digimon

Application web qui affiche les Digimon depuis l'API **Digi-API** (https://digi-api.com).

Site en ligne : LIEN_GITHUB_PAGES

## Fonctionnalités
- Liste de 20 Digimon par page, bouton « Charger plus »
- Recherche par nom exact et bouton « Effacer »
- Détail d'un Digimon au clic (image, type, description, barres de statistiques)
- Les 4 états : chargement, succès, vide, erreur avec bouton « Réessayer »
- Favoris (LocalStorage) avec filtre « Favoris »
- Dernière recherche conservée (SessionStorage)
- Filtre par type (sur les Digimon déjà chargés)

## Rôle des fichiers
- `src/services/api.js` : appels à l'API (fetch) et transformation du JSON en objets simples
- `src/services/storage.js` : LocalStorage (favoris) et SessionStorage (dernière recherche)
- `src/services/ui.js` : affichage (cartes, détail, chargement, vide, erreur)
- `src/services/main.js` : point de départ, écoute les clics et appelle les autres fichiers

## Lancer le projet
1. `npm install`
2. `npm run build` (compile Tailwind)
3. Ouvrir `index.html` avec Live Server

## Remarque sur les statistiques
Digi-API ne fournit pas de PV/Attaque/Défense. Les barres affichent le nombre de skills, d'évolutions et d'attributs.

## Bonus
Aucun.

## md
Vidéo de démonstration : https://drive.google.com/file/d/1SIuiEJ4lhvfRAtzSh_L4k0k6xbqN3sCd/view?usp=sharing
Voici le lien de la vidéo après les modifications : https://drive.google.com/file/d/1DyD0m-s_uNYKl58yc3GsTarK9QtJkg-1/view?usp=sharing
