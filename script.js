// script.js
const symbols = ['🍎', '🍌', '🍒', '🍇', '🍉', '🍓', '🍍', '🥝'];
let gameSymbols = [...symbols, ...symbols]; // Duplicar para formar pares
gameSymbols = gameSymbols.sort(() => Math.random() - 0.5); // Mezclar

const gameGrid = document.getElementById('gameGrid');
let flippedCards = [];
let matchedPairs = 0;

// Crear las cartas
gameSymbols.forEach(symbol => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.symbol = symbol;
  card.addEventListener('click', handleCardClick);
  gameGrid.appendChild(card);
});

function handleCardClick(e) {
  const clickedCard = e.target;

  // Evitar que una carta volteada o pareja sea clickeada de nuevo
  if (flippedCards.length === 2 || clickedCard.classList.contains('flipped')) return;

  clickedCard.textContent = clickedCard.dataset.symbol;
  clickedCard.classList.add('flipped');
  flippedCards.push(clickedCard);

  if (flippedCards.length === 2) {
    setTimeout(checkMatch, 1000);
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.symbol === card2.dataset.symbol) {
    card1.classList.add('hidden');
    card2.classList.add('hidden');
    matchedPairs++;
    if (matchedPairs === symbols.length) {
      alert('¡Has ganado!');
    }
  } else {
    card1.textContent = '';
    card1.classList.remove('flipped');
    card2.textContent = '';
    card2.classList.remove('flipped');
  }

  flippedCards = [];
}
