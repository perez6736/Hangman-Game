//GLOBAL VARIABLES -------------------------------------------------------------

var guessesLeft = 7; //how many guesses the user has left
//array of possible game words
var wins = 0; //number of wins
var losses = 0; //number of losses
var words =['Cardinals','Falcons','Ravens','Bills','Panthers','Bears','Bengals','Browns','Cowboys','Broncos','Lions','Packers','Texans','Colts','Jaguars','Chiefs','Dolphins','Vikings','Patriots','Saints','Giants','Jets','Raiders','Eagles','Steelers','Chargers','49ers','Seahawks','Rams','Buccaneers','Titans','Redskins',];
//the game word. Takes a random number between 0 and length of array and uses that number to select what index of the array to pick. 
var gameWord = words[Math.floor(Math.random()*words.length)];
var letterGuessed; //the letter guessed which gets assigned to a letter when the user presses a key. 
var underScores = []; // array of underscores
var underScoresDisplay;
var guessedLetters = []; // keeps tracks of letters already guessed. 
var guessedLettersDisplay = ' ';
var validLetters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9']; //valid guesses 
var positionOfGuessedLetter = []; //index saying where the letter is in the game word. 
var winsHTML = document.getElementById("wins");
var lossesHTML = document.getElementById("losses");
var guessesLeftHTML = document.getElementById("guesses-left");
var underScoresHTML = document.getElementById("word");
var guessedLettersHTML = document.getElementById("guessed-letters");
var footballTeamLogoHTML = document.getElementById("football-team-logo");
var winMessageHTML = document.getElementById("win-message");
var lossMessageHTML = document.getElementById("loss-message");
var messageHTML = document.getElementById("error-message");
//HELPER FUNCTIONS ---------------------------------------------------------------------

//compare guess with game word  - return boolean
function isGuessCorrect(){
	if(gameWord.indexOf(letterGuessed) > -1){
		return true;
	}
	else{
		if(!wasLetterGuessed()){
			guessesLeft = guessesLeft -1; //takes guess away for incorrect guess. 
		}
		return false; 
	}
}

//check to see if guess was valid guess - return boolean 
function wasLetterGuessedValid(){
	for (i=0; i<validLetters.length; i++){
		if(validLetters[i] == letterGuessed){
			return true;
		}
	}
	return false;
}

// check to see if guess was already guessed or not - return boolean
function wasLetterGuessed(){ 
	for (i=0; i<guessedLetters.length; i++){
		if(guessedLetters[i] == letterGuessed){
			return true;
		}
	}
	return false;
}

// add letter guessed to list of guessed letters
function addLettertoguessedList(){
	//check to see if it wasnt guessed and if its valid to add it to the list. 
	if(!wasLetterGuessed() && wasLetterGuessedValid()){
		guessedLetters.push(letterGuessed); // push the letter guessed into the guessed letter array.
	}
	guessedLettersDisplay = guessedLetters.join(' ');//make the display variable for the HTML 
	return guessedLetters;
}

// make the under scores 
function generateUnderScore(){
	for(i=0; i<gameWord.length;i++){
		underScores.push('_');
	}
	underScoresDisplay = underScores.join(' ');
	return underScores;

}

//get positions of guessed letter from the game word - returns array with position of letter in gameword 
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
	getPositionOfGuessedLetter(); // get position of guessed letters. 
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
		// TODO - Remove the alert and put this message in a div - 
		lossMessageHTML.innerHTML = "Game over. The word was " + gameWord;
		winMessageHTML.innerHTML = " " // clear the old message. 
		//restart game function 
		newGame();
	}
	return guessesLeft;
}

//check if user guessed the word
function checkGameWord(){
	underScores = underScores.join(''); //turn the array into a string to compare. 
	if (underScores === gameWord){
		// TODO - Remove the alert and put this message in a div - 
		winMessageHTML.innerHTML = "You win! You guessed " + gameWord + " correctly!";
		lossMessageHTML.innerHTML = " "// clear the old message. 
		footballTeamLogoHTML.innerHTML = "<img src='assets/images/"+ gameWord +".gif'>"
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
	guessedLetters = []; //new guesses for new game. 
	guessedLettersDisplay = ' '; // clear guessed list
	generateUnderScore();
	//set guesses to 7 again 
	guessesLeft = 7;
}

function refreshDisplay(){
	guessesLeftHTML.innerHTML = guessesLeft;
	winsHTML.innerHTML = wins;
	lossesHTML.innerHTML = losses;
	underScoresHTML.innerHTML = underScoresDisplay; 
	guessedLettersHTML.innerHTML = guessedLettersDisplay;
}


// GAME STARTS HERE ----------------------------------------------------------------------------------------------

gameWord = gameWord.toLowerCase(); //make the game word lowercase
generateUnderScore(); // generate the initial array of underscores that matches the length of the gameword.

refreshDisplay(); // displays stuff on HTML

footballTeamLogoHTML.innerHTML = "<img src='assets/images/NFLlogo.png'>"

// this is ran whenever a key is pressed - event.key will be the key pressed. 
document.onkeyup = function(event){

	letterGuessed = event.key; // assign the variable to the button pressed 
	messageHTML.innerHTML = " ";
	//check to see if guess was a valid guess.
	if (!wasLetterGuessedValid()){
		guessesLeft++; // need to return the guess for invalid guesses. 
		messageHTML.innerHTML = "'" + letterGuessed + "'" + " is not a valid guess";
	}

	//check if letter was guessed. 
	if(wasLetterGuessed()){
		messageHTML.innerHTML = "'" + letterGuessed + "'" + " letter was guessed already";
	}

	isGuessCorrect(); //check to see if the guess is correct
	addLettertoguessedList(); // after all that add the letter to the list of guessed letters 
	
	replaceUnderScores();
	
	//update the html with the new value 
	refreshDisplay();
	checkGuessCount();
	checkGameWord();
	//update the html with the new value 
	refreshDisplay();


}

