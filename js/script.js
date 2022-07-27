const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingCount= document.querySelector(".remaining span");
const message= document.querySelector(".message");
const playAgain = document.querySelector(".play-again");

const word= "magnolia"; 

const guessedLetters= [];

//Create placeholder for text in boxes.

const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word ){
        console.log(letter);
        placeholderLetters.push("●");
    }

    wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

guessButton.addEventListener("click", function(e){
    e.preventDefault();

    //Empty message 
    message.innerText = "";

    //collects user input
    const guess = letterInput.value;

    // validates that input is a single letter
    const goodGuess = validateInput(guess);

    //ensure that the user's input returns a letter
    if (goodGuess){
        makeGuess(guess);
    }

    //console.log(guess);
    letterInput.value = "";

    //console.log(validateInput(guess));

});

const validateInput = function(input){
    //regular argument for alphabet only
    const acceptedLetter = /[a-zA-Z]/;

    //if nothing is entered
    if (input.length === 0){
        message.innerText = "Dont be shy, go on and guess.";
    
    //if multiple letters are entered
    } else if (input.length >1){
        message.innerText = "That's a lot! Only one letter, please.";
    
    //if input is anything outside of a letter 
    } else if (!input.match(acceptedLetter)){
        message.innerText = "Oh oh! only A to Z allowed, sorry.";
    
    //if the acceptable singular letter is used
    } else {
        return input;
    }
};

const makeGuess = function(guess){
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)){
     message.innerText= "Great guess! Too bad you can only use it once.";   
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        guessLettersDisplay();
        updateWordInProgress(guessedLetters);
    }
};

// Show the letters guessed on screen 

const guessLettersDisplay= function(){

    //Clear the unordered list
    guessedLettersElement.innerText= "";
    for (const letter of guessedLetters) {
        const li= document.createElement("li");
        li.innerText= letter;
        guessedLettersElement.append (li);
    }
};

//Function to update the word in progress symbols with letters guessed 

const updateWordInProgress = function (guessedLetters){
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");

    //console.log(wordArray);
    const revealWord = [];

    for (const letter of wordArray){
        if (guessedLetters.includes(letter)){
            revealWord.push(letter.toUpperCase());

        } else {
            revealWord.push("●");
        }
    }
   //console.log(revealWord);

    wordInProgress.innerText = revealWord.join ("");
    playerWinCheck();
};

// Checks if the entire word was guessed correctly

const playerWinCheck = function (){
    if (word.toUpperCase()=== wordInProgress.innerText){
        message.classList.add("win");
        message.innerHTML = `<p class="highlight"> You guessed the correct word! Congrats! </p>`;
    }
};