const gameboard = (function() {
    let initializeBoard = ["","","","","","","","",""];
    const getBoard = () => initializeBoard;
    const p1DrawBoard = () => {
        let choice = parseInt(prompt("P1 Enter index"));
        if (initializeBoard[choice] === "") {
            return initializeBoard.splice(choice, 1, playerOne.symbol)
        } else {
            return alert("Invalid input")
        }
    };
    const p2DrawBoard = () => {
        let choice = parseInt(prompt("P2 Enter index"));
        if (initializeBoard[choice] === "") {
            return initializeBoard.splice(choice, 1, playerTwo.symbol)
        } else {
            return alert("Invalid input")
        }
    };
    return {initializeBoard, getBoard, p1DrawBoard, p2DrawBoard};
})();

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

const gameControl = (function(){
    const startGame = () => gameboard.drawBoard();
    const play = () => {
        const countO = gameboard.getBoard().filter(e => e === "O").length;
        const countX = gameboard.getBoard().filter(e => e === "X").length;
        if (countO <= countX) {
            return gameboard.p1DrawBoard();
        } else {
            return gameboard.p2DrawBoard();
        }
    };
    return {startGame, play};
})();

