const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan= document.querySelector(".remaining span");
const message= document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word= "magnolia"; 
const guessedLetters= [];
let remainingGuesses = 8;

//Pull words to guess from text library.

const getWord = async function (){
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray= words.split("\n");
    const randomIndex= Math.floor (Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
};

//Plays game with random words.

getWord();

//Create placeholder for text in boxes.

const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word ){
        //console.log(letter);
        placeholderLetters.push("●");
    }

    wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

guessLetterButton.addEventListener("click", function(e){
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
        updateGuessesRemaining(guess);
        showGuessedLetters();
        updateWordInProgress(guessedLetters);
    }
};

// Show the letters guessed on screen 

const showGuessedLetters= function(){

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

//Function that counts remaining guesses 

const updateGuessesRemaining= function (guess){
    const upperWord= word.toUpperCase();
    if (!upperWord.includes(guess)){
        message.innerText =`Sorry, there's no ${guess}.`;
        remainingGuesses -=1;
    } else {
        message.innerText = ` Great guess! ${guess} is correct.`;
    }

// Edits span to say how many guesses remaining. 

    if (remainingGuesses === 0) {
        message.innerHTML =  `Game over! The word was <span class= "highlight">${word}</span>`;
        remainingGuessesSpan.innerText= `${remainingGuesses} guesses remaining`;
    } else if (remainingGuesses === 1 ){
        remainingGuessesSpan.innerText = `${remainingGuesses} guess remaining`;
    } else {
        remainingGuessesSpan.innerText= `${remainingGuesses} guesses remaining`;
    }

}; 


// Checks if the entire word was guessed correctly

const playerWinCheck = function (){
    if (word.toUpperCase()=== wordInProgress.innerText){
        message.classList.add("win");
        message.innerHTML = `<p class="highlight"> You guessed the correct word! Congrats! </p>`;
    }
};

 


