const gameboard = {
    fields: ["1","2","3","4","5","6","7","8","9"],
}

function generatePlayer(name, symbol){
    const playerName = name;
    const playerSymbol = symbol;
    let score = 0;
    const getScore = () => score;
    const win = () => score++;
    return {name: playerName, symbol: playerSymbol, getScore, win}
}

const playerOne = generatePlayer(prompt("Player 1: Enter Name", ), "O");
const playerTwo = generatePlayer(prompt("Player 2: Enter Name", ), "X");
   