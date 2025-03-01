let lockBoard = false;
let firstCard = null;
let secondCard = null;
let timer;
let seconds = 0;


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


function handleCardClick(event) {
    if (lockBoard) return;

    const cardInner = event.target.closest('.card-inner');
    if (!cardInner || cardInner.classList.contains('is-flipped')) return;

    flipCard(cardInner);

    if (!firstCard) {
        firstCard = cardInner;
        if (seconds === 0) startTimer();
        console.log(seconds);
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
    const isMatch = firstCard.querySelector('.card-front img').alt ===
     secondCard.querySelector('.card-front img').alt;


    isMatch ? handleMatch() : handleNotmatch();
}

function handleMatch() {
    firstCard.removeEventListener('click', handleCardClick);
    secondCard.removeEventListener('click', handleCardClick);
    resetTurn();
}
function handleNotmatch() {
    setTimeout(() => {
        firstCard.classList.remove('is-flipped');
        secondCard.classList.remove('is-flipped');
        resetTurn();
    }, 1000);
}
function resetTurn() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

function startTimer() {
    timer = setInterval(() => {
        seconds++;
    }, 1000);
}

function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}


