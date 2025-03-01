async function fetchCard()
{   
    try{
        let res = await fetch('card.json');
        let data = await res.json();
        const mixedCards = mixCard(data);
        createGameBoard(mixedCards);

    }catch(error)
    {
        console.error('Error fetching data:', error);
    }
    
}
fetchCard();

function mixCard(array)
{
    for ( let i =array.length -1; i > 0 ;i--)
        {
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

function createCard(card, index)
{
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
    return cardElement;
}

fetchCard();