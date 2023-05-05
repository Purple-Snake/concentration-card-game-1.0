"use strict";

const urlParams = new URLSearchParams(window.location.search);

const setCardNumber = parseInt(urlParams.get("cardNumber"));

const gameOverModal = document.getElementById("game-over-modal");
const modalScore = document.getElementById("modal-score");

class boardSquare {
  constructor(element, color) {
    this.element = element;

    this.element.addEventListener("click", this, false);

    this.isFaceUp = false;
    this.isMatched = false;
    this.setColor(color);
  }

  setColor(color) {
    const faceUpElement = this.element.getElementsByClassName("faceup")[0];

    this.color = color;

    faceUpElement.classList.add(color);
  }

  handleEvent(event) {
    switch (event.type) {
      case "click":
        // check if isFaceUp or isMatched are false
        if (this.isFaceUp || this.isMatched) {
          // if true do nothing

          return;
        }

        // if both are false set isFaceUp true and add the flipped class to the square
        this.isFaceUp = true;
        this.element.classList.add("flipped");

        squareFlipped(this);
    }
  }

  reset() {
    this.isFaceUp = false;
    this.isMatched = false;
    this.element.classList.remove("flipped");
  }

  matchFound() {
    this.isFaceUp = true;
    this.isMatched = true;

    const isAllMatched = boardSquares.every((square) => square.isMatched);

    if (isAllMatched) {
      // reset the board and shuffle colors
      setTimeout(() => {
        setUpGame();
        changeRoundCounter()
      }, 1000);
    }
  }
}

let round = 1;

function generateRoundCounter() {
  document.getElementById("rounds").innerHTML = `
  <b>Raundas <span>${round}</span></b>
  `
}

function changeRoundCounter() {
  document.getElementById("rounds").innerHTML = `
  <b>Raundas <span>${++round}</span></b>
  `
}

function generateHTMLForBoardSquares() {
  const numberOfSquares = setCardNumber;
  let squaresHTML = "";

  for (let i = 0; i < numberOfSquares; i++) {
    if (setCardNumber == 16) {
      squaresHTML += `
	    <div class="col-3 board-square card-style-16">
	        <div class="face-container">
	            <div class="facedown"></div>
	            <div class="faceup"></div>
	        </div>
	    </div>`;
    }
    if (setCardNumber == 24) {
      squaresHTML += `
	    <div class="col-3 board-square card-style-24">
	        <div class="face-container">
	            <div class="facedown"></div>
	            <div class="faceup"></div>
	        </div>
	    </div>`;
    }
    if (setCardNumber == 32) {
      squaresHTML += `
	    <div class="col-3 board-square card-style-32">
	        <div class="face-container">
	            <div class="facedown"></div>
	            <div class="faceup"></div>
	        </div>
	    </div>`;
    }
  }
  if (setCardNumber == 24) {
    let test = document.getElementsByClassName("test")[0];
    test.classList.toggle("nested-container-16");
    test.classList.toggle("nested-container-24");
  }
  if (setCardNumber == 32) {
    let test = document.getElementsByClassName("test")[0];
    test.classList.toggle("nested-container-16");
    test.classList.toggle("nested-container-32");
  }

  const boardElement = document.getElementById("gameboard");
  boardElement.innerHTML = squaresHTML;
}

const colorPairs = [];

function generateColorPairs() {
  if (colorPairs.length > 0) {
    return colorPairs;
  } else {
    for (let i = 0; i < setCardNumber / 2; i++) {
      colorPairs.push("color-" + i);
      colorPairs.push("color-" + i);
    }
    return colorPairs;
  }
}

function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function shuffleColors() {
  const colorPairs = generateColorPairs();
  return shuffle(colorPairs);
}

const boardSquares = [];

// const theScore = document.getElementsByClassName(".score-bottom")

function setUpGame() {
  generateHTMLForBoardSquares();
  generateRoundCounter()

  const randomColorPairs = shuffleColors();

  const squareElements = document.getElementsByClassName("board-square");

  // Use for loop to add objects for the squares
  for (let i = 0; i < squareElements.length; i++) {
    const element = squareElements[i];
    const color = randomColorPairs[i];

    const square = new boardSquare(element, color);

    boardSquares.push(square);
  }
}

setUpGame();

let firstFaceUpSquare = null;

function squareFlipped(square) {
  if (firstFaceUpSquare === null) {
    // check if the to be flipped square is the first one
    firstFaceUpSquare = square;
    return;
  }

  // if the selected square is the second square check if the colors match
  if (firstFaceUpSquare.color == square.color) {
    // if they do set both boardSquare objects to matched and clear the firstFaceUpSquare var.
    firstFaceUpSquare.matchFound();
    square.matchFound();
    addpoints();

    firstFaceUpSquare = null;
  } else {
    // if not reset
    const a = firstFaceUpSquare;
    const b = square;

    firstFaceUpSquare = null;

    setTimeout(function () {
      a.reset();
      b.reset();
    }, 400);
  }
}

let TIME_LIMIT = parseInt(urlParams.get("time"));

window.addEventListener("load", () => {
  
  if (TIME_LIMIT > 120) {
    TIME_LIMIT = 120
    return TIME_LIMIT
  }else {
    return TIME_LIMIT
  }
});

let timePassed = 0;
let timeLeft = TIME_LIMIT;

let timerInterval = null;

function startTimer() {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;

    if (timeLeft == 0) {
      clearInterval(timerInterval);
      showGameOverModal();
      checkIfReachedNewHighScore();
    }

    document.querySelector(".time-bottom").innerHTML = timeLeft;
  }, 1000);
}

startTimer();

function showGameOverModal() {
  gameOverModal.style.display = "block";
  modalScore.innerHTML = `Jūsų taškai: ${score}`;
}

let score = document.querySelector(".score-bottom").innerHTML = 0;
function addpoints() {
  score += 100;
  document.querySelector(".score-bottom").innerHTML = score;
}

// Save the score


const endpoint = "http://localhost:3000/api/users";
function patchScore() { 
 
  const dataobject = {
    userName: sessionStorage.getItem("userName"),
    newHighScore: score
  }

  updateHighScore(endpoint+"/updateHighscore", dataobject);
};


function updateHighScore(endpoint, dataobject) {
  const options = {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(dataobject),
    credentials: "include",
  };

  fetch(endpoint, options)
    .then((response) => response.json())
    .then((data) => {
      sessionStorage.setItem("highScore", data.highScore);
      window.location.href = "http://127.0.0.1:5500/frontend/index.html";
    })
    .catch((err) => {
      console.log(err);
    });
}
function checkIfReachedNewHighScore() {
  const usersHighscore = sessionStorage.getItem("highScore")
  if (usersHighscore > score) {
    return
  } else if (usersHighscore < score){
    patchScore()
  }
}


window.addEventListener("load", () => {
  const userName = sessionStorage.getItem("userName");
  
  if (!userName) {
    return;
  }});