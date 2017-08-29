var guessesLeft = 7; //how many guesses the user has left
//array of possible game words
var wins = 0; //number of wins
var losses = 0; //number of losses
var words =['Cardinals','Falcons','Ravens','Bills','Panthers','Bears','Bengals','Browns','Cowboys','Broncos','Lions','Packers','Texans','Colts','Jaguars','Chiefs','Dolphins','Vikings','Patriots','Saints','Giants','Jets','Raiders','Eagles','Steelers','Chargers','49ers','Seahawks','Rams','Buccaneers','Titans','Redskins',];
//the game word. Takes a random number between 0 and length of array and uses that number to select what index of the array to pick. 
var gameWord = words[Math.floor(Math.random()*words.length)];
gameWord = gameWord.toLowerCase(); //make the game word lowercase
var letterGuessed; //the letter guessed which gets assigned to a letter when the user presses a key. 
var underScores = []; // array of underscores
var underScoresDisplay;
var guessedLetters = []; // keeps tracks of letters already guessed. 
var correctLetters = []; //letters that were guessed correctly 
var wrongLetters = []; //letters that were guessed incorrectly 
var positionOfGuessedLetter = []; //index saying where the letter is in the game word. 


//compare guess with game word 
function compareGuess(){
	if(gameWord.indexOf(letterGuessed) > -1){
		guessedLetters.push(letterGuessed);
		correctLetters.push(letterGuessed);
		console.log(true);
		return true;
	}
	else{
		guessedLetters.push(letterGuessed);
		guessesLeft = guessesLeft -1; 
		console.log(guessesLeft);
		console.log(false);
		return false; 
	}
}

//Add a was guessed function 
function letterWasGuessed(){
	// compare the guess with the guessed array and return true or false. 
}

// make the under scores 
function generateUnderScore(){
	for(i=0; i<gameWord.length;i++){
		underScores.push('_');
	}
	underScoresDisplay = underScores.join(' ');
	console.log(underScores);
	console.log(gameWord);
	return underScores;

}

//get positions of guessed letter from the game word
function getPositionOfGuessedLetter(){
	for(i=0; i<gameWord.length; i++){
		if(gameWord[i] === letterGuessed){
			positionOfGuessedLetter.push(i);
		}
	}
	return positionOfGuessedLetter;
}

//Change the underscores to the letter guessed if correct
function replaceUnderScores(){
	//need to replace underScores[positionOfGuessedLetter[x]] with the letter guessed.
	for (i=0; i<positionOfGuessedLetter.length;i++){
		underScores[positionOfGuessedLetter[i]] = letterGuessed;
	}
	//need to clear the position of guessed array for new guess.
	positionOfGuessedLetter = [];
	underScoresDisplay = underScores.join(' ');
	return underScores;
}

//Check the number of guess and restart game when guess count = 0 
function checkGuessCount(){
	if (guessesLeft == 0){
		losses = losses + 1;
		alert("Game over. The word was " + gameWord);
		//restart game function 
		newGame();
	}
	return guessesLeft;
}

//check if user guessed the word
function checkGameWord(){
	underScores = underScores.join(''); //turn the array into a string to compare. 
	if (underScores === gameWord){
		alert("You win! You guessed " + gameWord + " correctly!");
		wins = wins + 1; 
		//RESTART GAME FUNCTION. 
		newGame();
		return underScores;

	}
	// got to turn it back to an array so we can continue playing.  
	underScores = underScores.split('');
	return underScores;
}

//function to choose new word and restart guesses
function newGame(){
	// pick a new word
	gameWord = words[Math.floor(Math.random()*words.length)];
	gameWord = gameWord.toLowerCase();
	// set new underscores
	underScores = []; // make empty array so the generateunderscore function creates a good array. 
	generateUnderScore();
	//set guesses to 7 again 
	guessesLeft = 7;
}

generateUnderScore(); // generate the initial array of underscores that matches the length of the gameword.

var winsHTML = document.getElementById("wins");
winsHTML.innerhtml = wins; // put number of wins on screen

var lossesHTML = document.getElementById("losses");
lossesHTML.innerHTML = losses;// put number of losses

var guessesLeftHTML = document.getElementById("guesses-left");// put number of guesses on screen 
guessesLeftHTML.innerHTML = guessesLeft;

var underScoresHTML = document.getElementById("word");// put the underscores on screen
underScoresHTML.innerHTML = underScoresDisplay;

var wrongLettersHTML = document.getElementById("wrongLetters");// display the wrong guessed letters 
wrongLettersHTML.innerHTML = wrongLetters;
 



// this is ran whenever a key is pressed - event.key will be the key pressed. 
document.onkeyup = function(event){

	letterGuessed = event.key;
	//TODO - check to see if guess was a letter or number - use typeof - if string make sure its a letter of the alphabet (check the its a vowel assignment)
	
	compareGuess();
	// TODO - function to check if guess was already made. need to check against the guessedLetters array. 
	getPositionOfGuessedLetter();
	replaceUnderScores()

	console.log(underScores);
	console.log(positionOfGuessedLetter)
	console.log(letterGuessed);

	//update the html with the new value 
	guessesLeftHTML.innerHTML = guessesLeft;
	winsHTML.innerHTML = wins;
	lossesHTML.innerHTML = losses;
	underScoresHTML.innerHTML = underScoresDisplay; 

	checkGuessCount();
	checkGameWord();
}

