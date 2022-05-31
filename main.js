//gameboard object
const gameBoard = (() => {
  const board = [
    '', '', '',
    '', '', '',
    '', '', ''
  ];
  return {board};
})();





//keep track of game score
const gameController = (() => {
  function selectSquare(e) {
    const index = e.target.getAttribute('data-index');
    gameBoard.board[index] = 'X';
    displayController.displayBoard(gameBoard.board);
  }
  return {selectSquare}
})();





//display contents on webpage
const displayController = (() => {
  const square = document.querySelectorAll('.square');

  for (let i = 0; i < square.length; i++) {
    square[i].addEventListener('click', gameController.selectSquare);
  }


  function displayBoard(gameboard) {
    for (let i = 0; i < gameboard.length; i++) {
      square[i].textContent = gameboard[i];
    }
  }
  return {displayBoard};
})();





//player factory
const Player = (team) => {
  return {team};
};





const playerOne = Player('X');
const playerTwo = Player('O');


displayController.displayBoard(gameBoard.board);