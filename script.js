
const deck = [];
const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const faceUpCards = [];
let discardPile = [];
let currentDeckCount = 52;

// Initialize the deck
function createDeck() {
    for (let suit of suits) {
        for (let rank = 2; rank <= 14; rank++) {
            deck.push({ rank, suit });
        }
    }
    shuffleDeck();
}

// Shuffle the deck
function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// Deal initial face-up cards
function dealFaceUpCards() {
    for (let i = 0; i < 9; i++) {
        faceUpCards.push(deck.pop());
    }
    updateFaceUpDisplay();
}

// Update face-up cards display
function updateFaceUpDisplay() {
    const faceUpContainer = document.getElementById('face-up-cards');
    faceUpContainer.innerHTML = '';
    faceUpCards.forEach((card, index) => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        cardDiv.innerText = `${card.rank} of ${card.suit}`;
        cardDiv.addEventListener('click', () => selectCard(index));
        faceUpContainer.appendChild(cardDiv);
    });
}

// Handle card selection and guesses
function selectCard(index) {
    const selectedCard = faceUpCards[index];
    const guess = prompt("Guess (H)igher, (L)ower, or (E)qual?");
    const drawnCard = deck.pop();

    if (
        (guess === 'H' && drawnCard.rank > selectedCard.rank) ||
        (guess === 'L' && drawnCard.rank < selectedCard.rank) ||
        (guess === 'E' && drawnCard.rank === selectedCard.rank)
    ) {
        faceUpCards[index] = drawnCard;
        updateFaceUpDisplay();
        alert('Correct guess!');
    } else {
        discardPile.push(selectedCard, drawnCard);
        faceUpCards.splice(index, 1);
        updateFaceUpDisplay();
        alert('Wrong guess! Cards discarded.');
    }

    document.getElementById('deck-count').innerText = deck.length;
    document.getElementById('discard-count').innerText = discardPile.length;

    if (faceUpCards.length === 0 || deck.length === 0) {
        alert('Game over!');
    }
}

// Start the game
createDeck();
dealFaceUpCards();
