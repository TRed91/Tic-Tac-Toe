let playerOne;
let playerTwo;

const gameboard = (function() {
    let initializeBoard = ["","","","","","","","",""];
    const p1ScoreTrack = document.querySelector("#p1-score");
    const p2ScoreTrack = document.querySelector("#p2-score");
    const getBoard = () => initializeBoard;

    const drawBoard = (input) => {
        const countO = gameboard.getBoard().filter(e => e === "O").length;
        const countX = gameboard.getBoard().filter(e => e === "X").length;
        if (countO <= countX) {
            if (initializeBoard[input] === "") {
                initializeBoard.splice(input, 1, playerOne.symbol);
                printBoard();
                printScore();
                setTimeout(() => {return gameControl.winCondition()}, 20);
            } else {
                alert("Invalid input")
                return "Invalid"
            }
        } else {
            if (initializeBoard[input] === "") {
                initializeBoard.splice(input, 1, playerTwo.symbol);
                printBoard();
                printScore();
                setTimeout(() => {return gameControl.winCondition()}, 20);
                //return gameControl.winCondition();
            } else {
                alert("Invalid input")
                return "Invalid"
            }
        }
        
        
    };

    const printBoard = () => {
        gameControl.DOMgameboard.forEach((item, index) => {
            if (gameboard.getBoard()[index] === "X"){
                item.innerHTML = "⛌";
            } else if (gameboard.getBoard()[index] === "O"){
                item.innerHTML = "○";
            } else {
                item.innerHTML = "";
            }
        });
    };

    const printScore = () => {
            p1ScoreTrack.innerHTML = `${playerOne.getScore()}`;
            p2ScoreTrack.innerHTML = `${playerTwo.getScore()}`;
        }

    const resetBoard = () => {
        gameControl.DOMgameboard.forEach(e => e.innerHTML = "");
        return initializeBoard = ["","","","","","","","",""];
    };
    return {getBoard, drawBoard, resetBoard, printBoard};
})();

function generatePlayer (name, symbol){

    const playerName = name;
    const playerSymbol = symbol;
    let score = 0;
    const getScore = () => score;
    const win = () => score++;

    return {name: playerName, symbol: playerSymbol, getScore, win}
} 

const gameControl = (function(){
    const playBtn = document.querySelector("#play-button");
    const DOMgameboard = document.querySelectorAll(".boardfield");
    const player1Input = document.querySelector(".p1-input");
    const player2Input = document.querySelector(".p2-input");
    const p1ScoreLabel = document.querySelector(".p1-score-label");
    const p2ScoreLabel = document.querySelector(".p2-score-label");
    const output = document.querySelector(".output");
    const startGame = () => {
        if (gameboard.getBoard().filter(e => e==="").length === 0){
            if (Math.random() > 0.5){
                turn = "p1"
            } else {
                turn = "p2"
            }
        }
        playBtn.disabled = true;
        return turn
    };
    let turn = "p1" 

    const winCondition = () => {
        let board = gameboard.getBoard();
        let checkDraw = gameboard.getBoard().filter(e => e === "").length;
        if ((board[0] === board[1] && board[0] === board[2] && board[0] !== "") ||
            (board[0] === board[3] && board[0] === board[6] && board[0] !== "") ||
            (board[0] === board[4] && board[0] === board[8] && board[0] !== "")){
                if (board[0] === "O"){
                    playerOne.win();
                    gameboard.resetBoard();
                    return output.innerHTML = `${playerOne.name} wins!`;
                } else {
                    playerTwo.win();
                    gameboard.resetBoard();
                    return output.innerHTML = `${playerTwo.name} wins!`;
                }
            } else if ((board[1] === board[4] && board[1] === board[7] && board[1] !== "")){
                if (board[1] === "O"){
                    playerOne.win()
                    gameboard.resetBoard();
                    return output.innerHTML = `${playerOne.name} wins!`;
                } else {
                    playerTwo.win();
                    gameboard.resetBoard();
                    return output.innerHTML = `${playerTwo.name} wins!`;
                }
            } else if ((board[3] === board[4] && board[3] === board[5] && board[3] !== "")){
                if (board[3] === "O"){
                    playerOne.win()
                    gameboard.resetBoard();
                    return output.innerHTML = `${playerOne.name} wins!`;
                } else {
                    playerTwo.win();
                    gameboard.resetBoard();
                    return output.innerHTML = `${playerTwo.name} wins!`
                }
            } else if ((board[2] === board[5] && board[2] === board[8] && board[2] !== "") ||
                       (board[2] === board[4] && board[2] === board[6] && board[2] !== "")){
                        if (board[2] === "O"){
                            playerOne.win()
                            gameboard.resetBoard();
                            return output.innerHTML = `${playerOne.name} wins!`;
                        } else {
                            playerTwo.win();
                            gameboard.resetBoard();
                            return output.innerHTML = `${playerTwo.name} wins!`
                        }
            } else if ((board[6] === board[7] && board[6] === board[8] && board[6] !== "")){
                if (board[6] === "O"){
                    playerOne.win()
                    gameboard.resetBoard();
                    return output.innerHTML = `${playerOne.name} wins!`;
                } else {
                    playerTwo.win();
                    gameboard.resetBoard();
                    return output.innerHTML = `${playerTwo.name} wins!`;
                }
            } else if (checkDraw === 0){
                gameboard.resetBoard();
                return output.innerHTML = "It's a tie.";
            } else {
                //gameControl.play();
            }   
    };

    const fieldBtn = DOMgameboard.forEach(e => {
            e.addEventListener("click", () =>{
                if (output.innerHTML !== "") {
                    output.innerHTML = "";
                }
                return gameboard.drawBoard(e.getAttribute("arrindex"));
            })
    })

    const btnPress = playBtn.addEventListener("click", () => {
        if (player1Input.value !== "" && player2Input.value !== "") {
            output.innerHTML = "";
            playerOne = generatePlayer(player1Input.value, "O");
            playerTwo = generatePlayer(player2Input.value, "X");
            p1ScoreLabel.innerHTML = `${playerOne.name} score: <span class="score" id="p1-score">${playerOne.getScore()}</span>`;
            p2ScoreLabel.innerHTML = `${playerTwo.name} score: <span class="score" id="p2-score">${playerTwo.getScore()}</span>`;
            player1Input.disabled = true;
            player2Input.disabled = true;
            startGame();
        }else{
            output.innerHTML = "Please enter player names"
        }
    })

    return {startGame, winCondition, DOMgameboard};
})();

