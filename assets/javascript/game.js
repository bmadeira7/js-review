// VARIABLES

// an array with all of the words I can guess
var wordsToGuess = [
    "vietcong",
    "napalm",
    "battalion",
    "grenade",
    "foxtrot",
    "infantry",
    "johnson",
    "bandolier",
    "firefight",
    "communism"

];
// keep track of all of the wins
var wins = 0;
var losses = 0;
var winsSpan = document.getElementById("wins");
// keep track of guesses left
var lossesSpan = document.getElementById("losses")
var guesses = 10;
var guessesSpan = document.getElementById("guessesRemaining");
// keep track of the word to be guessed
var currentWord;
// keep track of the letters from that word
var currentWordLetters = [];
// keep track of the blanks from the word letters
var currentWordLetterBlanks = [];
var currentWordSpan = document.getElementById("currentWordToGuess");
// keep track of the letters that have been guessed
var lettersGuessed = [];
var lettersGuessedSpan = document.getElementById("lettersGuessed");
// keep track of the correctly selected letters
var correctGuesses = 0;
var resultsSpan = document.getElementById("results")

var start = function () {
    reset()
    getWord();
    writeToDom();
    
    
    
}
var reset = function () {
    guesses = 10;
    currentWordLetters = [];
    currentWordLetterBlanks = [];
    lettersGuessed = [];
    correctGuesses = 0;
    
    
    
}
var SuperReset = function () {
    guesses = 10;
    currentWordLetters = [];
    currentWordLetterBlanks = [];
    lettersGuessed = [];
    correctGuesses = 0;
    wins = 0;
    losses = 0;
    getWord();
    



}

var writeToDom = function () {
    winsSpan.innerHTML = wins;
    lossesSpan.innerHTML = losses;
    guessesSpan.innerHTML = guesses;
    currentWordSpan.innerHTML = currentWordLetterBlanks.join(" ")
    lettersGuessedSpan.innerHTML = lettersGuessed.join(", ")
}

var getWord = function () {
    currentWord = wordsToGuess[Math.floor(Math.random() * wordsToGuess.length)]
    console.log(currentWord)

    for (var i = 0; i < currentWord.length; i++) {
        currentWordLetters.push(currentWord[i])
        currentWordLetterBlanks.push("_")
    }
    console.log(currentWordLetters);
    console.log(currentWordLetterBlanks)
}

document.onkeyup = function (event) {
    var userGuess = event.key.toLowerCase()
    checkIfLetterGuessed(userGuess)

}

var checkIfLetterGuessed = function (letter) {
    if (!lettersGuessed.includes(letter)) {
        lettersGuessed.push(letter)
        checkIfLetterWrong(letter)
        checkIfLetterRight(letter)
        console.log("i dont recognize that letter")
    }
}


var checkIfLetterWrong = function (letter) {
    if (!currentWordLetters.includes(letter)) {
        guesses--;
        if (guesses === 0) {
            resultsSpan.innerHTML = "YOU LOSE!"
            losses++;
            start()
        }
        else {
            writeToDom()
        }

    }
}


var checkIfLetterRight = function (letter) {
    for (var i = 0; i < currentWord.length; i++) {
        if (letter === currentWordLetters[i]) {
            currentWordLetterBlanks[i] = letter;
            writeToDom();
            correctGuesses++;
            if (correctGuesses === currentWordLetters.length) {
                wins++;
                resultsSpan.innerHTML = "YOU WIN!!!";
                start();
            }
        }
    }
}

start();

setTimeout(timeUp, 1000 * 60);

function timeUp() {
    
    
    $("#time-left").append("<h1>Time's Up!</h1>");
    SuperReset();
    }