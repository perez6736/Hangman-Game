// user starts with 7 guesses
var maxGuesses = 7;

//counter of number of guesses user is on
var currentGuesses = 0; 

//array of possible game words
var words =['Cardinals','Falcons','Ravens','Bills','Panthers','Bears','Bengals','Browns','Cowboys','Broncos','Lions','Packers','Texans','Colts','Jaguars','Chiefs','Dolphins','Vikings','Patriots','Saints','Giants','Jets','Raiders','Eagles','Steelers','Chargers','49ers','Seahawks','Rams','Buccaneers','Titans','Redskins',];

//the game word. Takes a random number between 0 and length of array and uses that number to select what index of the array to pick. 
var gameWord = words[Math.floor(Math.random()*words.length)];
//make the game word lowercase
gameWord = gameWord.toLowerCase();

// keeps tracks of letters already guessed. 
var guessedLetters = [];

//split the gameWord to an array
var gameWordArr = gameWord.split("");

// this is ran whenever a key is pressed - event.key will be the key pressed. 
document.onkeyup = function(event){
	// store the letter the user guessed. 
	var letterGuessed = event.key;
	console.log(letterGuessed);

	// loop through the word to check if the key pressed matches a letter in the word.
	for(i=0;i<gameWordArr.length;i++){
		if(event.key == gameWordArr[i]){
			console.log("correct guess.");
			return;
		}
	}
	console.log("wrong guess.");





}


