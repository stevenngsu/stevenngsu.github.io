const gameContainer = document.getElementById("game");

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
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let firstColor, secondColor;
let matches = 0;

function compareCards() {
  // Compare colors of first and second colors
  if (firstColor.className !== secondColor.className) {
    firstColor.style.removeProperty('background-color');
    secondColor.style.removeProperty('background-color');
  } else {
    matches++;
  }
  // End of game condition
  if (matches === COLORS.length/2) {
    alert('Congratulations! You matched all of the squares!');
  }
  // Reset variables and start over
  firstColor = undefined;
  secondColor = undefined;
  gameContainer.style.removeProperty('pointer-events');
}


function handleCardClick(event) {
  // Can't repick the same tile as a match
  while (!event.target.style.backgroundColor) {
    event.target.style.backgroundColor = this.className;
    if (firstColor) {
      secondColor = event.target;
    } else {
      firstColor = event.target;
    }
  
    if (secondColor) {
      // Disable click
      gameContainer.style.pointerEvents = 'none';
      setTimeout(compareCards, 1000);
    }
  }
} 

// when the DOM loads
createDivsForColors(shuffledColors);
