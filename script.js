const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color, "card");

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
const gameContainer = document.getElementById("game");
const currentScore = document.getElementById("displayScore");
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchingPairs = 0;
let cardsFlipped = 0;
let scores = [];

currentScore.innerText = cardsFlipped;


function handleCardClick(event) {
  currentScore.innerText = cardsFlipped;
  if (lockBoard) return;
  if (event.target === firstCard) return;

  const card = event.target;
  card.style.backgroundColor = card.classList[0];
  cardsFlipped++;
  currentScore.innerText = cardsFlipped;

  if (!firstCard) {
    firstCard = card;
    return;
  } else {
    secondCard = card;
    lockBoard = true;
    checkForMatch();
  }
}

function checkForMatch() {
  let isMatch = firstCard.className === secondCard.className;

  if (isMatch) {
    matchingPairs++;
    disableCards();
    checkForWin();
  } else {
    unFlipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener("click", handleCardClick);
  secondCard.removeEventListener("click", handleCardClick);
  resetBoard();
}

function unFlipCards() {
  setTimeout(() => {
    firstCard.style.backgroundColor = "";
    secondCard.style.backgroundColor = "";
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

function resetAllCards() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.style.backgroundColor = "white";
  });
}


function checkForWin() {
  if (matchingPairs === shuffledColors.length / 2) {
    setTimeout(() => {
      alert(`You've won the game in ${cardsFlipped} moves! Congrats.`);
      
      const leaderBoard = JSON.parse(localStorage.getItem("leaderBoard")) || [];
      leaderBoard.push(cardsFlipped);
      localStorage.setItem("leaderBoard", JSON.stringify(leaderBoard));
      displayLeaderBoard();
      
      cardsFlipped = 0
      currentScore.innerText = cardsFlipped;
      resetAllCards();
      location.reload();
    }, 1000);
  }
}


function displayLeaderBoard() {
  const leaderBoardContainer = document.getElementById("leaderBoard");
  const leaderBoard = JSON.parse(localStorage.getItem("leaderBoard")) || [];
  leaderBoard.sort((a, b) => a - b);

  const scoreTable = document.createElement("table");
  const headerRow = document.createElement("tr");
  const rankHeader = document.createElement("th");
  rankHeader.innerText = "Rank";
  headerRow.appendChild(rankHeader);
  const scoreHeader = document.createElement("th");
  scoreHeader.innerText = "Score";
  headerRow.appendChild(scoreHeader);
  scoreTable.appendChild(headerRow);

  for (let i = 0; i < 5; i++) {
    const score = leaderBoard[i];
    const row = document.createElement("tr");

    const rankColumn = document.createElement("td");
    rankColumn.innerText = i + 1;
    row.appendChild(rankColumn);

    const scoreColumn = document.createElement("td");
    scoreColumn.innerText = score;
    row.appendChild(scoreColumn);

    scoreTable.appendChild(row);
  }

  leaderBoardContainer.appendChild(scoreTable);
}



window.addEventListener("load", function () {
  displayLeaderBoard();
});

// when the DOM loads
createDivsForColors(shuffledColors);

/* */