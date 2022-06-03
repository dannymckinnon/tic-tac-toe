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
  let movesPlayed = 0;

  function checkWin(gameboard, player) {
    //divide up the gameboard into winning combos
    const rowSlice1 = gameboard.slice(0, 3);
    const rowSlice2 = gameboard.slice(3, 6);
    const rowSlice3 = gameboard.slice(6, 9);
    const colSlice1 = [gameboard[0], gameboard[3], gameboard[6]]; 
    const colSlice2 = [gameboard[1], gameboard[4], gameboard[7]]; 
    const colSlice3 = [gameboard[2], gameboard[5], gameboard[8]]; 
    const diagSlice1 = [gameboard[0], gameboard[4], gameboard[8]];
    const diagSlice2 = [gameboard[2], gameboard[4], gameboard[6]];

    const sliceArray = [rowSlice1, rowSlice2, rowSlice3,
                        colSlice1, colSlice2, colSlice3,
                        diagSlice1, diagSlice2];

    for (let i = 0; i < sliceArray.length; i++) {
      const allEqual = arr => arr.every(val => val === player.team);
      const result = allEqual(sliceArray[i]);
      if (result) {
        displayController.removeEventlisteners();
        console.log(`${player.team} has won!`);
        return;
      } 
    }
    if (movesPlayed === 9) {
      displayController.removeEventlisteners();
      console.log('its a tye');
    }
  }

  function selectSquare(e) {
    const index = e.target.getAttribute('data-index');
    if (gameBoard.board[index] === '') {
      gameBoard.board[index] = lastPlayer.team;
      displayController.displayBoard(gameBoard.board);
      movesPlayed++;
      console.log(movesPlayed);
      checkWin(gameBoard.board, lastPlayer);
      lastPlayer = (lastPlayer === playerOne) ? playerTwo : playerOne;
    }
  }

  return {selectSquare};
})();





displayController.createEventListeners();

