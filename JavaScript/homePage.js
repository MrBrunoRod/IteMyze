const filterForm = document.querySelector("#filter-form");
const searchInput = document.querySelector("#game-search");
const filterToggle = document.querySelector("#filter-toggle");
const filterPanel = document.querySelector("#filter-panel");
const genreFilter = document.querySelector("#genre-filter");
const yearSlider = document.querySelector("#year-filter");
const yearValue = document.querySelector("#year-value");
const developerSearch = document.querySelector("#developer-search");
const resultsList = document.querySelector("#game-results");
const statusMessage = document.querySelector("#results-message");
const showMoreButton = document.querySelector("#show-more");

const PAGE_SIZE = 10;

let catalog = [];
let filteredGames = [];
let shownCount = 0;

function fillGenreFilter(games) {
    const genres = [];

    for (const game of games) {
        const genre = game.genre.trim();

        if (!genres.includes(genre)) {
            genres.push(genre);
        }
    }

    genres.sort();

    for (const genre of genres) {
        const option = document.createElement("option");
        option.value = genre;
        option.textContent = genre;
        genreFilter.append(option);
    }
}

function setupYearSlider(games) {
    const years = games
        .map((game) => Number(getReleaseYear(game.release_date)))
        .filter((year) => year > 0)

    yearSlider.min = Math.min(...years);
    yearSlider.max = Math.max(...years);
    yearSlider.value = yearSlider.min;

    updateYearLabel();
}

function updateYearLabel() {
    yearValue.textContent = `${yearSlider.value} or later`;
}

function toggleFilterPanel() {
    const isOpen = filterToggle.getAttribute("aria-expanded") === "true";

    filterToggle.setAttribute("aria-expanded", String(!isOpen));
    filterPanel.hidden = isOpen;
}

function getFitleredGames() {
    const searchText = searchInput.value.trim().toLowerCase();
    const genre = genreFilter.value;
    const minYear = Number(yearSlider.value);
    const developer = developerSearch.value.trim().toLowerCase();

    return catalog.filter((game) => {
        const year = Number(getReleaseYear(game.release_date));

        const matchesSearch = game.title.toLowerCase().includes(searchText);
        const matchesGenre = genre === "all" || game.genre.trim() === genre;
        const matchesYear = Number.isNaN(year) || year >= minYear;
        const matchesDev = game.developer.toLowerCase().includes(developer);

        return matchesSearch && matchesGenre && matchesYear && matchesDev;
    });
}

function addGame(game) {
    const collection = loadCollection();

    collection.push({
        id: game.id,
        title: game.title,
        thumbnail: game.thumbnail,
        developer: game.developer,
        release_date: game.release_date
    });

    saveCollection(collection);
}

function markAsAdded(button) {
    button.textContent = "In collection";
    button.disabled = true;
    button.classList.add("added");
}

function createCatalogCard(game, isSaved) {
    const card = createGameCard(game);

    const addButton = document.createElement("button");
    addButton.type = "button";
    addButton.textContent = "Add to collection";
    addButton.setAttribute("aria-label", `Add ${game.title} to your collection`);

    if (isSaved) {
        markAsAdded(addButton);
    }

    addButton.addEventListener("click", () => {
        addGame(game);
        markAsAdded(addButton);
    });

    card.append(addButton);
    return card;
}

function showMoreGames() {
    const savedIds = loadCollection().map((game) => game.id);
    const nextGames = filteredGames.slice(shownCount, shownCount + PAGE_SIZE);

    for (const game of nextGames) {
        resultsList.append(createCatalogCard(game, savedIds.includes(game.id)));
    }

    shownCount += nextGames.length;
    showMoreButton.hidden = shownCount >= filteredGames.length;
}

function showResults() {
    filteredGames = getFitleredGames();
    shownCount = 0;

    resultsList.replaceChildren();
    showMoreGames();

    if (filteredGames.length === 0) {
        statusMessage.textContent = "No games match your filters";
    }
    else {
        statusMessage.textContent = "";
    }
}

function applyFilters(event) {
    event.preventDefault();
    showResults();
}

async function startHomePage() {
    try {
        catalog = await fetchCatalog();
        fillGenreFilter(catalog);
        setupYearSlider(catalog);
        showResults();
    }
    catch (error) {
        console.error(error);
        statusMessage.textContent = "Game couldn't be loaded."
    }
}

filterToggle.addEventListener("click", toggleFilterPanel);
yearSlider.addEventListener("input", updateYearLabel);
filterForm.addEventListener("submit", applyFilters);
showMoreButton.addEventListener("click", showMoreGames);

startHomePage();