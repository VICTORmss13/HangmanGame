const wordDisplay = document.querySelector(".word-display")
const keyboardDiv = document.querySelector(".keyboard");

let currentWord;


const getRandomWord = () => {
    // Selecting a random word and hint from the wordList
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    // console.log(word, "=", hint);
    console.log(word);
    document.querySelector(".hint-text b").innerText = hint;
    wordDisplay.innerHTML = word.split("").map(() => '<li class="letter"></li>').join("");
    
}

const initGame = (button, clickedLetter) => {
    // Checking if clickedLetter is exist on the currentWord
    // console.log(button, clickedLetter);
    if(currentWord.includes(clickedLetter)) {
        // Showing all correct letters on the word displayed
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter) {
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        })
        // console.log(clickedLetter, " is on the word");
    } else {
        // console.log(clickedLetter, " is not on the word");
    }
    
}

// Creating keyboard buttons and adding event listeners
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);  
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}

getRandomWord();