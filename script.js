function getComputerChoice() {
    const randomNumber = Math.random();
    if (randomNumber < 0.34) {
        return 'rock';
    } else if (randomNumber <= 0.67) {
        return 'paper';
    } else {
        return 'scissors';
    }
}

// Initialize score if it doesn't exist in localStorage
let score = JSON.parse(localStorage.getItem('score')) || { wins: 0, losses: 0, ties: 0 };

function playGame(playerChoice) {
    const computerChoice = getComputerChoice();
    let result = '';

    if (playerChoice === computerChoice) {
        result = 'Tie';
        score.ties++;
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        result = 'You win';
        score.wins++;
    } else {
        result = 'You lose';
        score.losses++;
    }

    // Save updated score back to localStorage
    localStorage.setItem('score', JSON.stringify(score));
    
    // Navigate to result page with query parameters
    window.location.href = `resultPage.html?playerChoice=${playerChoice}&computerChoice=${computerChoice}&result=${result}`;
}

function updateScoreElement(playerChoice, computerChoice, result) {
    document.querySelector(".yourChoice").innerHTML = `You picked ${playerChoice}`;
    document.querySelector(".computerChoice").innerHTML = `The computer picked ${computerChoice}.`;
    document.querySelector(".result").innerHTML = result;
    document.querySelector(".wins").innerHTML = score.wins;
    document.querySelector(".losses").innerHTML = score.losses;
    document.querySelector(".ties").innerHTML = score.ties;
}



// Initialize the score display on page load
document.addEventListener('DOMContentLoaded', () => {
    updateScoreElement('', '', '');

    // Add event listeners to the buttons
    document.getElementById('rockButton').addEventListener('click', () => playGame('rock'));
    document.getElementById('paperButton').addEventListener('click', () => playGame('paper'));
    document.getElementById('scissorsButton').addEventListener('click', () => playGame('scissors'));
});

function playAgain() {
    window.location.href = 'RockPaperScissors.html';
}
function resetScore() {
    score = { wins: 0, losses: 0, ties: 0 };
    localStorage.setItem('score', JSON.stringify(score));
    
    updateScoreElement('', '', 'Score reset');
}
// Function to handle displaying results on the result page
function displayResults() {
    const urlParams = new URLSearchParams(window.location.search);
    const playerChoice = urlParams.get('playerChoice');
    const computerChoice = urlParams.get('computerChoice');
    const result = urlParams.get('result');

    document.getElementById('playerChoiceImage').src = `Assets/${playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)}.svg`;
    document.getElementById('computerChoiceImage').src = `Assets/${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}.svg`;

    const resultTextElement = document.getElementById('resultText');
    resultTextElement.innerHTML = result;

    if (result === 'You win') {
        resultTextElement.style.color = 'green';
    } else if (result === 'You lose') {
        resultTextElement.style.color = 'darkred';
    } else {
        resultTextElement.style.color = 'orange';
    }

    // Update score display
    document.querySelector(".wins").innerHTML = score.wins;
    document.querySelector(".losses").innerHTML = score.losses;
    document.querySelector(".ties").innerHTML = score.ties;
}

// Call displayResults if on the result page
if (window.location.pathname.endsWith('resultPage.html')) {
    displayResults();
}