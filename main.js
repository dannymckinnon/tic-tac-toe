// gameboard object
const gameBoard = (() => {
  const board = [
    'x', 'o', 'x',
    'o', 'x', 'o',
    'x', 'o', 'x'
  ];
  // function that changes board array and runs display function
  return {};
})();


// object to control flow of game
const game = (() => {
  return {};
})();


// display contents on webpage
  // event listener that runs gameboard function that changes board array
const displayController = (() => {
  return {};
})();


// player factory
const Player = (name, team) => {
  const getName = () => name;
  const getTeam = () => team;
  return {getTeam, getName};
};
