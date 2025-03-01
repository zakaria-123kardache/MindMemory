let lockBoard = false;
let firstCard = null;
let secondCard = null;


async function fetchCard() {
    try {
        let res = await fetch('card.json');
        let data = await res.json();
        const mixedCards = mixCard(data);
        createGameBoard(mixedCards);

    } catch (error) {
        console.error('Error fetching data:', error);
    }

}
fetchCard();

function mixCard(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createGameBoard(cards) {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    cards.forEach((card, index) => {
        const cardElement = createCard(card, index);
        gameBoard.appendChild(cardElement);
    });
}

function createCard(card, index) {
    const cardElement = document.createElement('div');
    cardElement.className = 'memory-card';
    cardElement.innerHTML = `
        <div class="card-inner" data-card-index="${index}">
            <div class="card-front">
                <img src="${card.image}" alt="${card.name}">
            </div>
            <div class="card-back">
                <span>Am here</span>
            </div>
        </div>
    `;
    cardElement.addEventListener('click', handleCardClick);
    return cardElement;
}

fetchCard();

function handleCardClick(event) {
    if (lockBoard) return;

    const cardInner = event.target.closest('.card-inner');
    if (!cardInner || cardInner.classList.contains('is-flipped')) return;

    flipCard(cardInner);

    if (!firstCard) {
        firstCard = cardInner;
        return;
    }

    secondCard = cardInner;
    checkForMatch();
}
function flipCard(card) {
    card.classList.add('is-flipped');
}

function checkForMatch() {
    lockBoard = true;
    const isMatch = firstCard.querySelector('.card-front span').textContent ===
        secondCard.querySelector('.card-front span').textContent;

    isMatch ? handleMatch() : handleNotmatch();
}

function handleMatch() {
    firstCard.removeEventListener('click', handleCardClick);
    secondCard.removeEventListener('click', handleCardClick);
    resetTurn();
}
function handleNotmatch() {
    firstCard.classList.remove('is-flipped');
    secondCard.classList.remove('is-flipped');
    resetTurn();
}
function resetTurn() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}


