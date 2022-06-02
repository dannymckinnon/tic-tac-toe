//player factory
const Player = (team) => {

  return {team};
};


const playerOne = Player('X');
const playerTwo = Player('O');





//gameboard object
const gameBoard = (() => {
  const board = [
    '', '', '',
    '', '', '',
    '', '', ''
  ];

  return {board};
})();





//display contents on webpage
const displayController = (() => {
  const square = document.querySelectorAll('.square');

  function createEventListeners() {
    for (let i = 0; i < square.length; i++) {
      square[i].addEventListener('click', gameController.selectSquare);
    }
  }

  function removeEventlisteners() {
    for (let i = 0; i < square.length; i++) {
      square[i].removeEventListener('click', gameController.selectSquare);
    }
  }

  function displayBoard(gameboard) {
    for (let i = 0; i < gameboard.length; i++) {
      square[i].textContent = gameboard[i];
    }
  }

  return {displayBoard, createEventListeners, removeEventlisteners};
})();





//keep track of game score and player selection
const gameController = (() => {
  let lastPlayer = playerOne;

  function checkWin(gameboard, player) {
    //make new arrays out of board array with all 8 combinations of win scenarios
    for 
  }

  function selectSquare(e) {
    const index = e.target.getAttribute('data-index');
    if (gameBoard.board[index] === '') {
      gameBoard.board[index] = lastPlayer.team;
      displayController.displayBoard(gameBoard.board);
      lastPlayer = (lastPlayer === playerOne) ? playerTwo : playerOne;
    }
  }

  return {selectSquare};
})();





displayController.createEventListeners();

// when working in a module IIFE, since they run immediately, i cannot access variables that are defined AFTER the module. 
// So does that mean I have to place my module design pattern code AFTER any variables that it references, just like globally scoped code?


// ok then would it make sense to think of module design patterns as behaving similiar to global code except that it has 
// the added benefit of its own namespacing, scope, and closure?