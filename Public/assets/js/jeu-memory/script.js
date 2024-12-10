const themes = {
    noel: [
        { name: 'card1', img: '/assets/js/jeu-memory/images/noel_card1.jpg' },
        { name: 'card2', img: '/assets/js/jeu-memory/images/noel_card2.jpg' },
        { name: 'card3', img: '/assets/js/jeu-memory/images/noel_card3.jpg' },
        { name: 'card4', img: '/assets/js/jeu-memory/images/noel_card4.jpg' },
        { name: 'card5', img: '/assets/js/jeu-memory/images/noel_card5.jpg' },
        { name: 'card6', img: '/assets/js/jeu-memory/images/noel_card6.jpg' },
    ],
    drapeau: [
        { name: 'card7', img: '/assets/js/jeu-memory/images/drapeau_card7.jpg' },
        { name: 'card8', img: '/assets/js/jeu-memory/images/drapeau_card8.jpg' },
        { name: 'card9', img: '/assets/js/jeu-memory/images/drapeau_card9.jpg' },
        { name: 'card10', img: '/assets/js/jeu-memory/images/drapeau_card10.jpg' },
        { name: 'card11', img: '/assets/js/jeu-memory/images/drapeau_card11.jpg' },
        { name: 'card12', img: '/assets/js/jeu-memory/images/drapeau_card12.jpg' },
        { name: 'card13', img: '/assets/js/jeu-memory/images/drapeau_card13.jpg' },
        { name: 'card14', img: '/assets/js/jeu-memory/images/drapeau_card14.jpg' },
    ],
    logo: [
        { name: 'card15', img: '/assets/js/jeu-memory/images/logo_card15.jpg' },
        { name: 'card16', img: '/assets/js/jeu-memory/images/logo_card16.jpg' },
        { name: 'card17', img: '/assets/js/jeu-memory/images/logo_card17.jpg' },
        { name: 'card18', img: '/assets/js/jeu-memory/images/logo_card18.jpg' },
        { name: 'card19', img: '/assets/js/jeu-memory/images/logo_card19.jpg' },
        { name: 'card20', img: '/assets/js/jeu-memory/images/logo_card20.jpg' },
        { name: 'card21', img: '/assets/js/jeu-memory/images/logo_card21.jpg' },
        { name: 'card22', img: '/assets/js/jeu-memory/images/logo_card22.jpg' },
        { name: 'card23', img: '/assets/js/jeu-memory/images/logo_card23.jpg' },
        { name: 'card24', img: '/assets/js/jeu-memory/images/logo_card24.jpg' },
    ],
    monument: [
        { name: 'card25', img: '/assets/js/jeu-memory/images/monument_card25.jpg' },
        { name: 'card26', img: '/assets/js/jeu-memory/images/monument_card26.jpg' },
        { name: 'card27', img: '/assets/js/jeu-memory/images/monument_card27.jpg' },
        { name: 'card28', img: '/assets/js/jeu-memory/images/monument_card28.jpg' },
        { name: 'card29', img: '/assets/js/jeu-memory/images/monument_card29.jpg' },
        { name: 'card30', img: '/assets/js/jeu-memory/images/monument_card30.jpg' },
        { name: 'card31', img: '/assets/js/jeu-memory/images/monument_card31.jpg' },
        { name: 'card32', img: '/assets/js/jeu-memory/images/monument_card32.jpg' },
        { name: 'card33', img: '/assets/js/jeu-memory/images/monument_card33.jpg' },
        { name: 'card34', img: '/assets/js/jeu-memory/images/monument_card34.jpg' },
        { name: 'card35', img: '/assets/js/jeu-memory/images/monument_card35.jpg' },
        { name: 'card36', img: '/assets/js/jeu-memory/images/monument_card36.jpg' },
    ]
};

let selectedTheme = themes.noel;
let selectedLevel = null; 
let cardsChosen = [];
let cardsChosenId = [];
let cardsWon = [];
let score = 0;
let timer;
let countdown = null;
let audio = document.getElementById('backgroundMusic'); 
let modal = document.getElementById("rulesModal");
let btn = document.getElementById("rulesButton");
let span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
    modal.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function setTheme(theme) {
    selectedTheme = themes[theme];
    createBoard();
}

function selectLevel(level) {
    selectedLevel = level;

    document.getElementById('startButtonContainer').style.display = 'flex';
}

function createBoard() {
    const gameBoard = document.querySelector('.memory-game');
    gameBoard.innerHTML = '';

    const columns = selectedTheme === themes.monument ? 6 : Math.ceil(Math.sqrt(selectedTheme.length * 2));
    gameBoard.style.gridTemplateColumns = `repeat(${columns}, 100px)`;

    const doubledCardsArray = [...selectedTheme, ...selectedTheme].sort(() => 0.5 - Math.random());
    doubledCardsArray.forEach((item, index) => {
        const card = document.createElement('img');
        card.setAttribute('src', '/assets/js/jeu-memory/images/Logo.jpg');
        card.setAttribute('data-id', index);
        card.setAttribute('data-name', item.name);
        card.setAttribute('data-img', item.img);
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    const cardId = this.getAttribute('data-id');
    if (cardsChosenId.includes(cardId) || cardsChosenId.length === 2) return;

    cardsChosen.push(this.getAttribute('data-name'));
    cardsChosenId.push(cardId);
    this.setAttribute('src', this.getAttribute('data-img'));

    if (cardsChosen.length === 2) setTimeout(checkForMatch, 500);
}

function checkForMatch() {
    const cards = document.querySelectorAll('.memory-game img');
    const [optionOneId, optionTwoId] = cardsChosenId;
    const [cardOne, cardTwo] = [cards[optionOneId], cards[optionTwoId]];

    if (cardsChosen[0] === cardsChosen[1]) {
        cardOne.removeEventListener('click', flipCard);
        cardTwo.removeEventListener('click', flipCard);
        cardsWon.push(cardsChosen);
        score += 10;
    } else {
        setTimeout(() => {
            cardOne.setAttribute('src', '/assets/js/jeu-memory/images/Logo.jpg');
            cardTwo.setAttribute('src', '/assets/js/jeu-memory/images/Logo.jpg');
        }, 500);
        score -= 2;
    }
    updateScore(score);
    cardsChosen = [];
    cardsChosenId = [];

    if (cardsWon.length === selectedTheme.length) {
        clearInterval(timer);
        setTimeout(() => alert(`Félicitations, vous avez terminé le jeu ! Votre score est ${score}`), 500);
        if (audio) audio.pause(); 
    }
}

function updateScore(score) {
    document.getElementById('scoreBoard').innerHTML = `Score : ${score}`;
}

function updateTimer(countdown) {
    document.getElementById('timer').innerHTML = countdown !== null ? countdown : '';
}

function resetUI() {
    score = 0;
    cardsChosen = [];
    cardsChosenId = [];
    cardsWon = [];
    updateScore(score);
    updateTimer('');
    clearInterval(timer);
    if (audio) audio.pause();
}

function startGame() {
    resetUI();
    createBoard();

    if (selectedLevel === 'easy') {
        countdown = null;
        updateTimer('Pas de chronomètre');
    } else if (selectedLevel === 'medium') {
        countdown = 60;
        updateTimer(countdown);
    } else if (selectedLevel === 'hard') {
        countdown = 45;
        updateTimer(countdown);
    }

    if (countdown !== null) {
        timer = setInterval(() => {
            countdown -= 1;
            updateTimer(countdown);
            if (countdown <= 0) {
                clearInterval(timer);
                alert('Dommage, le temps est écoulé. Réessayez!');
                if (audio) audio.pause(); 
            }
        }, 1000);
    }

    audio = new Audio('/assets/js/jeu-memory/musique/background-music.mp3');
    audio.loop = true; 
    audio.play();
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.btn-easy').addEventListener('click', () => selectLevel('easy'));
    document.querySelector('.btn-medium').addEventListener('click', () => selectLevel('medium'));
    document.querySelector('.btn-hard').addEventListener('click', () => selectLevel('hard'));  
});
