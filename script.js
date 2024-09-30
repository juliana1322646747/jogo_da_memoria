const board = document.getElementById('gameBoard');
const restartButton = document.getElementById('restartButton');
const cards = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let flippedCards = [];
let matchedCards = [];
let lockBoard = false;
let timerInterval;
let timeElapsed = 0;

function createBoard() {
    // Limpa o tabuleiro antes de criar um novo
    board.innerHTML = '';

    // Embaralha as cartas
    const shuffledCards = cards.sort(() => 0.5 - Math.random());

    // Cria um elemento para cada carta no tabuleiro
    shuffledCards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.card = card;
        cardElement.dataset.index = index;
        cardElement.addEventListener('click', onCardClick);
        board.appendChild(cardElement);
    });
    startTimer();

}

function onCardClick(event) {
    const card = event.target;

    // Impede a interação se o tabuleiro estiver bloqueado, a carta já estiver virada ou já for uma carta combinada
    if (lockBoard || card.classList.contains('flipped') || matchedCards.includes(card.dataset.index)) {
        return;
    }

    card.classList.add('flipped');
    card.textContent = card.dataset.card;
    flippedCards.push(card);

    // Verifica se duas cartas foram viradas
    if (flippedCards.length === 2) {
        lockBoard = true;
        setTimeout(checkMatch, 1000);
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.card === card2.dataset.card) {
        matchedCards.push(card1.dataset.index, card2.dataset.index);
        checkGameOver(); // Verifica se o jogo terminou
    } else {
        // Se não forem iguais, vira as cartas de volta
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.textContent = '';
        card2.textContent = '';
    }

    flippedCards = [];
    lockBoard = false; // Desbloqueia o tabuleiro
}

function checkGameOver() {
    // Verifica se todos os pares foram encontrados
    if (matchedCards.length === cards.length) {
        setTimeout(() => {
            alert('Parabéns! Você venceu!');
        }, 500);
    }
}

// Função para reiniciar o jogo
function restartGame() {
    flippedCards = [];
    matchedCards = [];
    lockBoard = false;
    createBoard();
}

// Inicializa o jogo
createBoard();

// Adiciona o evento de clique ao botão de reiniciar
restartButton.addEventListener('click', restartGame);
