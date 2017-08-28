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



//compare guess with game word 
function compareGuess(){
	if(gameWord.indexOf(letterGuessed) > -1){
		console.log(true);
	}
	else{
		console.log(false);
	}
}

// make the underscores 
function generateUnderScore(){
	for(i=0; i<gameWord.length;i++){
		underScores.push('_');
	}
	console.log(underScores);
}
losses

document.getElementById("wins").innerHTML = wins;// put number of wins on screen
document.getElementById("losses").innerHTML = losses;// put number of losses
document.getElementById("guesses-left").innerHTML = guessesLeft;// put number of guesses on screen 
document.getElementById("word").innerHTML = underScores;// put the underscores on screen
document.getElementById("wrongLetters").innerHTML = wrongLetters;// display the wrong guessed letters 
generateUnderScore();
// this is ran whenever a key is pressed - event.key will be the key pressed. 
document.onkeyup = function(event){

	letterGuessed = event.key;
	compareGuess();
	console.log(letterGuessed);

}

