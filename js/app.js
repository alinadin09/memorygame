     
// Card flipping and matching created with help from Mike Wales https://www.youtube.com/watch?reload=9&reload=9&v=_rUH-sEs68Y&app=desktop

 let cards = [
 	'fa-diamond','fa-diamond',
 	'fa-paper-plane-o','fa-paper-plane-o',
 	'fa-anchor','fa-anchor',
 	'fa-bolt','fa-bolt',
 	'fa-cube','fa-cube',
 	'fa-leaf','fa-leaf',
 	'fa-bicycle','fa-bicycle',	
 	'fa-bomb','fa-bomb'
 ];

let matches = document.getElementsByClassName('match');
let timer = document.getElementById("timer");
let moves = document.getElementById('moves');
let clicks = 0;
let moveCount = 0;
let modal = document.getElementById('modal');
let modalContent = document.getElementsByClassName('modal-content')[0];
let closeOut = document.getElementsByClassName("close")[0];
let seconds = 0;
let minutes = 0;
let playAgain = document.getElementById('playAgain');
let stars = document.getElementById('stars');


// Populates the cards array dynamically and creates its HTML
 function generateCard(card) {
 	return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
 }
 
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function initGame() {
 	var deck = document.querySelector('.deck');	
  var cardHTML = shuffle(cards).map(function(card) {
 		return generateCard(card);
 	});

 	deck.innerHTML = cardHTML.join('');
}

initGame();

var allCards = document.querySelectorAll('.card');
var openCards = [];
var restart = document.querySelector('.fa-repeat');

function startGame(){
// When 2 cards are clicked, it adds them to the openCards array
allCards.forEach(function(card) {
 	card.addEventListener('click', function(e) {   

 		if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
 			openCards.push(card);
 			card.classList.add('open', 'show');

      // start timer
      clicks++;
      if (clicks === 1) {
        setTimer();
      }

	 		// if the cards match
	 		if (openCards.length == 2) {
	 			if (openCards[0].dataset.card == openCards[1].dataset.card) {
	 				openCards[0].classList.add('match', 'open', 'show');
          openCards[1].classList.add('match', 'open', 'show');
          openCards = [];
         

	 			} else {

  	 			// If no match, hide
  	 			setTimeout(function() {
  	 				openCards.forEach(function(card) {
  	 					card.classList.remove('open','show');
  	 				});

  	 				openCards = [];
  	 			}, 1000);
        }
        moveCount++;
        console.log(moveCount);
 			} 
      moveCounter();
      win();
 		}    
 	});  
});
}

startGame();

// clicking the restart button to refresh the page
restart.addEventListener('click', function(e) {
    location.reload();
});


// closing the modal popup:
closeOut.onclick = function() {
    modal.style.display = "none";
  }

// do you want to play again? button
    playAgain.onclick = function() {
      location.reload();
    }

// updating the move counter and star rating
function moveCounter() {
    if (moveCount <= 16) {
      console.log("haven't lost a star yet")
      
    } else if (moveCount > 17) {
      stars.removeChild(stars.childNodes[0]);
      
    } else if (moveCount > 35) {
      stars.removeChild(stars.childNodes[0]);
    }
  moves.innerText = (`${moveCount} Moves`);
}  

let div = document.createElement('div');


//setting a timer
function setTimer() {
  timer2 = setInterval(function() {
    timer.innerHTML = (`${minutes} Minutes ${seconds} Seconds`);
    seconds++;
    if (seconds === 60) {
      minutes++;
      seconds = 0;
    } 
    div.innerHTML = (`<p>You Won!</p><p>Total Time: ${timer.innerHTML}</p><p>Score: ${stars.childElementCount} stars</p>`);   
  }, 1000);  
}

// clearing the timer
  function clearTimer() {
    clearInterval(timer2);
  }

function win() {
  if (matches.length == 16) {
    console.log("Winner!");
    clearTimer();
    modalContent.insertBefore(div, modalContent.childNodes[2]);
    modal.style.display = "block";
  }
}