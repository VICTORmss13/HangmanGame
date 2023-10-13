const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");

let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

const resetGame = () => {
    // Reseting all game variables and UI elements
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(() => '<li class="letter"></li>').join("");
    gameModal.classList.remove("show");
}

const getRandomWord = () => {
    // Selecting a random word and hint from the wordList
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    // console.log(word, "=", hint);
    // console.log(word);
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
    
}

const gameOver = (isVictory) => {
    // After 600ms of game complete shows modal with relevant information
    setTimeout(() => {
        const modalText = isVictory ? 'You found the word' : 'The correct word was:';
        gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
        gameModal.querySelector("h4").innerText = `${isVictory ? 'Congrats!' : 'Game Over!'}`;
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameModal.classList.add("show");
    }, 300)
}

const initGame = (button, clickedLetter) => {
    // Checking if clickedLetter exists on the currentWord
    // console.log(button, clickedLetter);
    if(currentWord.includes(clickedLetter)) {
        // Showing all correct letters on the word displayed
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        })
        // console.log(clickedLetter, " is on the word");
    } else {
        // If clicked letter doesn't exist then update the wrongGuessCount and hangman image
        // console.log(clickedLetter, " is not on the word");
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    }

    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    // Calling gameOver function if any of these condition meets
    if(wrongGuessCount === maxGuesses) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);
}

// Creating keyboard buttons and adding event listeners
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);  
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);