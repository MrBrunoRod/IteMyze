const CATALOG_URL = "../data/games.json";

const COLLECTION_KEY = "collection";

async function fetchCatalog() {
    const response = await fetch(CATALOG_URL);

    if (!response.ok) {
        throw new Error(`Unable to load games (status ${response.status})`);
    }

    return response.json();

}

function loadCollection() {
    const savedCollection = localStorage.getItem(COLLECTION_KEY);

    if (savedCollection === null) {
        return [];
    }

    try {
        return JSON.parse(savedCollection);
    }
    catch (error) {
        console.error("Saved collection could not be read:", error);
        return [];
    }
}

function saveCollection(collection) {
    localStorage.setItem(COLLECTION_KEY, JSON.stringify(collection));
}

function getReleaseYear(releaseDate) {
    if (!releaseDate) {
        return "Unknown";
    }

    return releaseDate.slice(0, 4);
}

function createGameCard(game) {
    const card = document.createElement("article");
    card.classList.add("game-card");

    const image = document.createElement("img");
    image.src = game.thumbnail;
    image.alt = `${game.title} cover art`;
    image.loading = "lazy";

    const title = document.createElement("h3");
    title.textContent = game.title;

    const details = document.createElement("p");
    details.classList.add("game-details");
    details.textContent = `${game.developer} · ${getReleaseYear(game.release_date)}`;

    card.append(image, title, details);
    return card;

}