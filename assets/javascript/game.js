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

// make the under scores 
function generateUnderScore(){
	for(i=0; i<gameWord.length;i++){
		underScores.push('_');
	}
	console.log(underScores);
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

//Change the underscores to the letterguessed if correct
function replaceUnderScores(){
	//need to replace underScores[positionOfGuessedLetter[x]]
	for (i=0; i<positionOfGuessedLetter.length;i++){
		underScores[positionOfGuessedLetter[i]] = letterGuessed;
	}
	//need to clear the positionofguessed array for new guess.
	positionOfGuessedLetter = [];
	return underScores;
}

//Check the number of guess and restart game when guess count = 0 
function checkGuessCount(){
	if (guessesLeft == 0){
		losses = losses + 1;
		alert("game over.");
	}
	return guessesLeft;
}

//check if user guessed the word
function checkGameWord(){
	underScores = underScores.join(''); //trun the array into a string
	if (underScores === gameWord){
		alert("you win!");
		wins = wins + 1; 
		return underScores;

	}
	// got to turn it back to an array 
	underScores = underScores.split('');
	return underScores;
}


document.getElementById("wins").innerHTML = wins;// put number of wins on screen
document.getElementById("losses").innerHTML = losses;// put number of losses
document.getElementById("guesses-left").innerHTML = guessesLeft;// put number of guesses on screen 
document.getElementById("word").innerHTML = underScores;// put the underscores on screen
document.getElementById("wrongLetters").innerHTML = wrongLetters;// display the wrong guessed letters 
// TODO - display the under score array  on the html
generateUnderScore(); // generate the inital array of underscores that matches the length of the gameword. 
console.log(gameWord);

// this is ran whenever a key is pressed - event.key will be the key pressed. 
document.onkeyup = function(event){

	letterGuessed = event.key;
	getPositionOfGuessedLetter();
	compareGuess();
	// TODO - function to check if guess was already made. 
	replaceUnderScores()

	console.log(underScores);
	console.log(positionOfGuessedLetter)
	console.log(letterGuessed);

	checkGuessCount();
	checkGameWord();

	//update the html with the new value 
	document.getElementById("guesses-left").innerHTML = guessesLeft;
	document.getElementById("wins").innerHTML = wins;
	document.getElementById("losses").innerHTML = losses;
	// TODO add the updated under score array here. 
}

