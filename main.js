// gameboard object
const gameBoard = (() => {
  const board = [
    'x', 'o', 'x',
    'o', 'x', 'o',
    'x', 'o', 'x'
  ]; 
  return {};
})();

// player factory
const Player = (name, team) => {
  const getName = () => name;
  const getTeam = () => team;
  return {getTeam, getName};
};

// control flow of game object

// display contents on webpage