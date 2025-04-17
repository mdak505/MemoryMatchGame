const emojis = ['🍎', '🐶', '🎈', '🚗', '🍩', '🌟', '🎁', '🧸'];
let level = 1;
let timer = 0;
let timerInterval;
let matches = 0;
let firstCard, secondCard;
let canFlip = true;

function startGame() {
  clearInterval(timerInterval);
  timer = 0;
  matches = 0;
  document.getElementById('message').textContent = '';
  document.getElementById('score').textContent = matches;
  document.getElementById('level').textContent = level;
  document.getElementById('timer').textContent = timer;

  // Level-based emoji count
  const levelEmojis = emojis.slice(0, level + 2);
  const cards = shuffle([...levelEmojis, ...levelEmojis]);
  renderBoard(cards);
  startTimer();
}

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

function renderBoard(cards) {
  const board = document.getElementById('game-board');
  board.innerHTML = '';
  const size = Math.ceil(Math.sqrt(cards.length));
  board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

  cards.forEach((emoji, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.index = index;
    card.dataset.emoji = emoji;
    card.textContent = '❓';
    card.addEventListener('click', () => flipCard(card));
    board.appendChild(card);
  });
}

function flipCard(card) {
  if (!canFlip || card.classList.contains('revealed')) return;

  card.textContent = card.dataset.emoji;
  card.classList.add('revealed');

  if (!firstCard) {
    firstCard = card;
  } else {
    secondCard = card;
    canFlip = false;

    if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
      document.getElementById('match-sound').play();
      matches++;
      document.getElementById('score').textContent = matches;
      firstCard = null;
      secondCard = null;
      canFlip = true;

      if (matches === (document.querySelectorAll('.card').length / 2)) {
        level++;
        document.getElementById('message').textContent = '🎉 You Win! Click to go next level!';
        clearInterval(timerInterval);
      }
    } else {
      setTimeout(() => {
        firstCard.textContent = '❓';
        secondCard.textContent = '❓';
        firstCard.classList.remove('revealed');
        secondCard.classList.remove('revealed');
        firstCard = null;
        secondCard = null;
        canFlip = true;
      }, 1000);
    }
  }
}

function startTimer() {
  timerInterval = setInterval(() => {
    timer++;
    document.getElementById('timer').textContent = timer;
  }, 1000);
}

// Start game initially
startGame();
