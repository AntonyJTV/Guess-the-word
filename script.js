const inputs = document.querySelector(".word"),
    gameBox = document.querySelector(".wrapper"),
    hintTag = document.querySelector(".hint span"),
    guessLeft = document.querySelector(".guess span"),
    mistakes = document.querySelector(".wrong span"),
    resetBtn = document.querySelector(".reset"),
    hintBtn = document.querySelector(".showhint"),
    closeBtn = document.querySelector(".close"),
    hintElement = document.querySelector(".hint"),
    topicElement = document.querySelector(".topic"),
    popupElement = document.querySelector(".popup"),
    startPopup = document.querySelector(".starting-text"),
    winPopup = document.querySelector(".victory-text"),
    winText = document.querySelector("v-text"),
    losePopup = document.querySelector(".losing-text"),
    typeInput = document.querySelector(".type-input");
    

// Inizializing variables
let word, incorrectLetters = [], correctLetters = [], maxGuesses;

// Starting new game
function startNewGame() {

    showPopup();

    // Hide hint element
    hintElement.style.display = "none";
    hintElement.style.opacity = "0";

    // Select random word from list and set up game
    const ranWord = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranWord.word;
    topicElement.innerHTML = ranWord.topic;
    
    
    // If word chars >= 5 then max guess = 8 else max guess = 6
    maxGuesses = word.length >= 5 ? 8 : 6;
    incorrectLetters = [];
    correctLetters = [];
    hintTag.innerHTML = ranWord.hint;
    guessLeft.innerText = maxGuesses;
    mistakes.innerText = incorrectLetters;

    // Create input for each letter of word
    inputs.innerHTML = "";
    for (let i = 0; i < word.length; i++){
        const input = document.createElement("input");
        input.type = "text";
        input.disabled = true;
        inputs.appendChild(input);
    }
    
}

// Input and game updates manager
function handleInput(e){

    // Ignore non-letters input and letters that have already guessed
    const key = e.target.value.toLowerCase();

    if (key.match(/^[A-Z||a-z]+$/i) && !incorrectLetters.includes(`${key}`) && !correctLetters.includes(`${key}`)) {
        // Check if the letter is in word 

        if(word.includes(key)){
            // Update correct guess
            for (let i = 0; i < word.length; i++) {
                if(word[i] === key){
                    correctLetters.push(key);
                    inputs.querySelectorAll("input")[i].value = key;

                }
            }
            
        } else {

            // Update incorrect guess
            maxGuesses--;
            incorrectLetters.push(`${key}`);
            mistakes.innerText = incorrectLetters;
        }
        
    }

    // Update remain guess and check for win-lose conditions
    guessLeft.innerText = maxGuesses;
    if (correctLetters.length === word.length){
        showWinnerScreen();
        alert(`Congrats! You Found the Word ${word.toUpperCase()}`);
        
    } else if (maxGuesses < 1) {

        showGameOverScreen();
        for(let i = 0; i < word.length; i++) {

            // Fill inputs with correct words
            inputs.querySelectorAll("input")[i].value = word[i];
        }
    }

    // Clear input field
    typeInput.value = "";
    
}

// Show hint element
function showHintElement(){
    hintElement.style.display = "block";
    hintElement.style.opacity = "1";
}

function showPopup() {

    gameBox.style.display = "none";
    popupElement.style.display = "block";
    startPopup.style.display = "block";
    winPopup.style.display = "none";
    losePopup.style.display = "none";
}

function closePopup(){
    gameBox.style.display = "block";
    popupElement.style.display = "none";
    startPopup.style.display = "none";
    winPopup.style.display = "none";
    losePopup.style.display = "none";
    
}

function showGameOverScreen() {
    gameBox.style.display = "none";
    popupElement.style.display = "block";
    startPopup.style.display = "none";
    winPopup.style.display = "none";
    losePopup.style.display = "block";
}

function showWinnerScreen() {
    gameBox.style.display = "none";
    popupElement.style.display = "block";
    startPopup.style.display = "none";
    winPopup.style.display = "block";
    losePopup.style.display = "none";
    winText.innerText = `Congrats! You Found the Word ${word.toUpperCase()}`;

}

// Setup buttons
resetBtn.addEventListener('click', startNewGame);
hintBtn.addEventListener('click', showHintElement);
closeBtn.addEventListener('click', closePopup);
typeInput.addEventListener('input', handleInput);
inputs.addEventListener('click', () => typeInput.focus());
document.addEventListener('keydown', () => typeInput.focus());

startNewGame();
