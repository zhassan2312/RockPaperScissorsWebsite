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

function playGame(playerChoice) {
    const computerChoice = getComputerChoice();
    let result = '';

    if (playerChoice === computerChoice) {
        result = 'Tie';
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        result = 'You win';
    } else {
        result = 'You lose';
    }

    alert(`You picked ${playerChoice}. The computer picked ${computerChoice}. \n ${result}`);
}