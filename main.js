//player factory
const Player = (team) => {
  let name = '';
  let wins = 0;
  
  return {team, name, wins};
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
  const submitName = document.querySelector('.set-player button');
  const twoPlayer = document.querySelector('.two-player');
  const onePlayer = document.querySelector('.one-player');
  const playerNumber = document.querySelector('.player-number');

  function createEventListeners() {
    for (let i = 0; i < square.length; i++) {
      square[i].addEventListener('click', gameController.selectSquare);
    }

    const reset = document.querySelector('.reset');
    reset.addEventListener('click', resetBoard);

    twoPlayer.addEventListener('click', () => {
      const setPlayer = document.querySelector('.set-player');
      setPlayer.style.display = 'grid';
      playerNumber.style.display = 'none';
    })

    onePlayer.addEventListener('click', () => {
      playerNumber.style.display = 'none';
      aiController.startCpu();
      });
  }

  function removeEventlisteners() {
    for (let i = 0; i < square.length; i++) {
      square[i].removeEventListener('click', gameController.selectSquare);
    }
  }

  function resetBoard() {
    gameBoard.board = [
      '', '', '',
      '', '', '',
      '', '', ''
    ];
    displayController.createEventListeners();
    displayBoard(gameBoard.board);
    const message = document.querySelector('.message');
    message.textContent = '';
    gameController.reset();
  }

  function startGame() {
    submitName.addEventListener('click', () => {
      const playerOneName = document.querySelector('#name').value;
      const playerTwoName = document.querySelector('#name2').value;
      const setPlayer = document.querySelector('.set-player');
      const container = document.querySelector('.container');
      const reset = document.querySelector('.reset');
      const message = document.querySelector('.message');
      
      playerOne.name = playerOneName;
      playerTwo.name = playerTwoName;
      displayName(playerOneName, playerTwoName);
      setPlayer.style.display = 'none';
      container.style.display = 'grid';
      reset.style.display = 'block';
      message.style.display = 'block';
      displayController.createEventListeners();
    })
  }

  function displayName (name1, name2) {
    const player1 = document.querySelector('.player-one-stats h1');
    const player2 = document.querySelector('.player-two-stats h1');
    player1.textContent = name1;
    player2.textContent = name2;
  }

  function displayBoard(gameboard) {
    for (let i = 0; i < gameboard.length; i++) {
      square[i].textContent = gameboard[i];
    }
  }

  function updateWin (player) {
    const scoreP1 = document.querySelector('.player-one-stats h2');
    const scoreP2 = document.querySelector('.player-two-stats h2');

    player.team === 'X' ? scoreP1.textContent = player.wins : scoreP2.textContent = player.wins;
  }

  function setName(player, newName, playerDiv, opponentDiv) {
    player.name = newName;
    playerDiv.style.display = 'none';
    opponentDiv.style.display = 'flex';
  }

  return {displayBoard, displayName, createEventListeners, removeEventlisteners, startGame, updateWin};
})();





//keep track of game score and player selection
const gameController = (() => {
  let lastPlayer = playerOne;
  let movesPlayed = 0;

  function reset() {
    lastPlayer = playerOne;
    movesPlayed = 0;
  }

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
    const message = document.querySelector('.message');

    const sliceArray = [rowSlice1, rowSlice2, rowSlice3,
                        colSlice1, colSlice2, colSlice3,
                        diagSlice1, diagSlice2];

    for (let i = 0; i < sliceArray.length; i++) {
      const allEqual = arr => arr.every(val => val === player.team);
      const result = allEqual(sliceArray[i]);
      if (result) {
        displayController.removeEventlisteners();
        player.wins++;
        displayController.updateWin(player);
        movesPlayed = 0;
        message.textContent = `${player.name} has won!`;
        return;
      } 
    }
    if (movesPlayed === 9) {
      displayController.removeEventlisteners();
      movesPlayed = 0
      message.textContent = 'Tye game!';
      return;
    }
  }

  function selectSquare(e) {
    const index = e.target.getAttribute('data-index');
    if (playerTwo.name !== 'CPU') {
      if (gameBoard.board[index] === '') {
        gameBoard.board[index] = lastPlayer.team;
        displayController.displayBoard(gameBoard.board);
        movesPlayed++;
        // console.log(movesPlayed);
        checkWin(gameBoard.board, lastPlayer);
        lastPlayer = (lastPlayer === playerOne) ? playerTwo : playerOne;
        return;
      }
    }
    aiController.selectSquare(index);
  }

  return {selectSquare, reset, checkWin};
})();


const aiController = (() => {
  function startCpu() {
    const setPlayer = document.querySelector('.set-player');
    const container = document.querySelector('.container');
    const reset = document.querySelector('.reset');
    const message = document.querySelector('.message');
    
    playerOne.name = 'Player';
    playerTwo.name = 'CPU';
    displayController.displayName(playerOne.name, playerTwo.name);
    setPlayer.style.display = 'none';
    container.style.display = 'grid';
    reset.style.display = 'block';
    message.style.display = 'block';
  }

  function selectSquare(index) {
    if (gameBoard.board[index] === '') {
      gameBoard.board[index] = playerOne.team;
      displayController.displayBoard(gameBoard.board);
      aiMove(parseInt(index));
    } 
  }

  function aiMove(index) {
    let emptyIndices = [];
    for (let i = 0; i < gameBoard.board.length; i++) {
      if (gameBoard.board[i] === '') {
        emptyIndices.push(i);
      }
    }
    gameController.checkWin(gameBoard.board, playerOne);
    console.log(emptyIndices);
  }
  
  return {startCpu, selectSquare};
})();


displayController.startGame();
displayController.createEventListeners();
