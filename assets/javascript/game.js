// Variables

var wordOptions = ["keyboard", "mouse", "monitor", "case", "motherboard", "processor", "fans", "microphone", "mousepad", "psu", "gpu", "memory"];
var selectedWord = "";
var lettersinWord = [];
var numBlanks = 0;
var blanksandSuccesses = [];
var wrongLetters = [];

var winCount = 0;
var lossCount = 0;
var guessesLeft = 9;

// Functions

function startGame () {
	selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
	lettersinWord =  selectedWord.split("");
	numBlanks = lettersinWord.length;

	guessesLeft = 9;
	wrongLetters = [];
	blanksandSuccesses = [];

	for (var i=0; i<numBlanks; i++){
		blanksandSuccesses.push("_");
	}

	document.getElementById("wordToGuess").innerHTML = blanksandSuccesses.join(" ");
	document.getElementById("numGuesses").innerHTML = guessesLeft;
	document.getElementById("winCounter").innerHTML = winCount;
	document.getElementById("lossCounter").innerHTML = lossCount;

}


function checkLetters(letter) {

	var isLetterInWord = false;

	for (var i=0; i<numBlanks; i++){
		if(selectedWord[i] === letter) {
			isLetterInWord = true;
		}
	}

	if(isLetterInWord) {
		for (var i=0; i<numBlanks; i++) {
			if(selectedWord[i] === letter) {
			blanksandSuccesses[i] = letter;
			}
		}
	}

	else {
		wrongLetters.push(letter);
		guessesLeft--
	}

}

function roundComplete(){
	console.log("Win Count:" + winCount + " | Loss Count: " + lossCount + " | Guesses Left: " + guessesLeft);

	document.getElementById("numGuesses").innerHTML = guessesLeft;
	document.getElementById("wordToGuess").innerHTML = blanksandSuccesses.join(" ");
	document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" ");

	if (lettersinWord.toString() === blanksandSuccesses.toString()) {
		winCount++;
		alert("YOU WON!");
	
		document.getElementById("winCounter").innerHTML = winCount;
		
		startGame();
	}

	else if (guessesLeft === 0) {
		lossCount++;
		alert ("YOU LOST!");

		document.getElementById("lossCounter").innerHTML = lossCount;

		startGame();
	}

}

startGame();

document.onkeyup = function(event) {
	var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
	checkLetters(letterGuessed);
	roundComplete();

}