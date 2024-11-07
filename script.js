;(() => {
    const inputs = document.querySelector(".word"),
        gameBox = document.querySelector(".wrapper"),
        hintTag = document.querySelector(".hint span"),
        guessLeft = document.querySelector(".guess span"),
        mistakes = document.querySelector(".wrong span"),
        resetBtn = document.querySelector(".reset"),
        restartBtn = document.querySelector(".restart"),
        hintBtn = document.querySelector(".showhint"),
        closeBtn = document.querySelector(".close"),
        hintElement = document.querySelector(".hint"),
        topicElement = document.querySelector(".topic"),
        popupElement = document.querySelector(".popup"),
        popupText = document.querySelector(".pp-text"),
        typeInput = document.querySelector(".type-input");
        

    // Inizializing variables
    let word, incorrectLetters = [], correctLetters = [], maxGuesses;

    // Starting new game
    function startNewGame() {

        showInitialPopup();

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
            
        } else if (maxGuesses < 1) {

            
            for(let i = 0; i < word.length; i++) {

                // Fill inputs with correct words
                inputs.querySelectorAll("input")[i].value = word[i];
            }
            showGameOverScreen();
        }

        // Clear input field
        typeInput.value = "";
        
    }

    // Show hint element
    function showHintElement(){
        hintElement.style.display = "block";
        hintElement.style.opacity = "1";
    }

    function showInitialPopup() {

        gameBox.style.display = "none";
        popupElement.style.display = "block";
        restartBtn.style.display = "none";
        closeBtn.innerText = "Let's go!";
        popupText.innerText = "Starting Game!";
    }

    function closeInitialPopup(){
        gameBox.style.display = "block";
        popupElement.style.display = "none";
        
    }

    function showGameOverScreen() {
        gameBox.style.display = "none";
        popupElement.style.display = "block";
        restartBtn.style.display = "block";
        closeBtn.innerText = "Close";
        popupText.innerText = "Game Over! You Don't Have Remaining Guesses!";
    }

    function showWinnerScreen() {
        gameBox.style.display = "none";
        popupElement.style.display = "block";
        restartBtn.style.display = "block";
        closeBtn.innerText = "Close";
        popupText.innerText = `Congrats! You Found the Word ${word.toUpperCase()}`;

    }

    // Setup buttons
    resetBtn.addEventListener('click', startNewGame);
    restartBtn.addEventListener('click', startNewGame);
    hintBtn.addEventListener('click', showHintElement);
    closeBtn.addEventListener('click', closeInitialPopup);
    typeInput.addEventListener('input', handleInput);
    inputs.addEventListener('click', () => typeInput.focus());
    document.addEventListener('keydown', () => typeInput.focus());

    startNewGame();
})()