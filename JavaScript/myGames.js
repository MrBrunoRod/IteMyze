const collectionList = document.querySelector("#collection-list");
const countText = document.querySelector("#collection-count");
const emptyMessage = document.querySelector("#collection-empty");

function removeGame(gameId) {
    const collection = loadCollection().filter((game) => game.id !== gameId);

    saveCollection(collection);
    showCollection();
}

function createCollectionCard(game) {
    const card = createGameCard(game);

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "Remove";
    removeButton.setAttribute("aria-label", `Remove ${game.title} from your collection`);
    removeButton.addEventListener("click", () => removeGame(game.id));

    card.append(removeButton);
    return card;
}

function showCollection() {
    const collection = loadCollection();

    collectionList.replaceChildren();

    for (const game of collection) {
        collectionList.append(createCollectionCard(game));
    }

    if (collection.length === 1) {
        countText.textContent = "1 game";
    }
    else {
        countText.textContent = `${collection.length} games`;
    }

    emptyMessage.hidden = collection.length > 0;
}

showCollection();