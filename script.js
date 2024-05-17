let playerOne;
let playerTwo;

const gameboard = (function() {
    let initializeBoard = ["","","","","","","","",""];
    const p1ScoreLabel = document.querySelector(".p1-score-label");
    const p2ScoreLabel = document.querySelector(".p2-score-label");
    const getBoard = () => initializeBoard;

    const drawBoard = (input) => {
        const countO = gameboard.getBoard().filter(e => e === "O").length;
        const countX = gameboard.getBoard().filter(e => e === "X").length;
        if (countO <= countX) {
            if (initializeBoard[input] === "") {
                initializeBoard.splice(input, 1, playerOne.symbol);
                printBoard();
                setTimeout(() => {return gameControl.winCondition()}, 20);
            } else {
                alert("Invalid input")
                return "Invalid"
            }
        } else {
            if (initializeBoard[input] === "") {
                initializeBoard.splice(input, 1, playerTwo.symbol);
                printBoard();
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
                item.setAttribute("class", "boardfield x");
            } else if (gameboard.getBoard()[index] === "O"){
                item.setAttribute("class", "boardfield o")
            } else {
                item.setAttribute("class", "boardfield")
            }
        });
    };

    const printScore = () => {
        p1ScoreLabel.innerHTML = `${playerOne.name} score: <br><span class="score" id="p1-score">${playerOne.getScore()}</span>`;
        p2ScoreLabel.innerHTML = `${playerTwo.name} score: <br><span class="score" id="p2-score">${playerTwo.getScore()}</span>`;
        }

    const resetBoard = () => {
        return initializeBoard = ["","","","","","","","",""];
    };
    return {getBoard, drawBoard, resetBoard, printBoard, printScore};
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
    const contBtn = document.querySelector("#continue-button");
    const DOMgameboard = document.querySelectorAll(".boardfield");
    const player1Input = document.querySelector(".p1-input");
    const player2Input = document.querySelector(".p2-input");
    const output = document.querySelector(".output");
    let pause = true;
    let turn = "p1";

    const pauseToggle = () => {
        if (getPause() === true) {
            DOMgameboard.forEach(e => {
                e.setAttribute("disabled", false)
            });
            pause = false;
        } else {
            DOMgameboard.forEach(e => {
                e.setAttribute("disabled", true)
            });
            pause = true;
        }
        };

    const getPause = () => pause;
    const getTurn = () => turn;

    const setfirstTurn = () => { 
        if (Math.random() > 0.5){
        turn = "p1"
    } else {
        turn = "p2"
    }};

    const startGame = () => {
        if (gameboard.getBoard().filter(e => e==="").length === 0){
           setfirstTurn();
        }
        playBtn.disabled = true;
        return getTurn();
    };

    const winCondition = () => {
        let board = gameboard.getBoard();
        let checkDraw = gameboard.getBoard().filter(e => e === "").length;
        if ((board[0] === board[1] && board[0] === board[2] && board[0] !== "") ||
            (board[0] === board[3] && board[0] === board[6] && board[0] !== "") ||
            (board[0] === board[4] && board[0] === board[8] && board[0] !== "")){
                if (board[0] === "O"){
                    playerOne.win();
                    output.hidden = false;
                    output.innerHTML = `${playerOne.name} wins!`;
                    gameboard.resetBoard();
                    pauseToggle();
                    return contBtn.disabled = false;
                } else {
                    playerTwo.win();
                    output.hidden = false;
                    output.innerHTML = `${playerTwo.name} wins!`;
                    gameboard.resetBoard();
                    pauseToggle();
                    return contBtn.disabled = false;
                }
            } else if ((board[1] === board[4] && board[1] === board[7] && board[1] !== "")){
                if (board[1] === "O"){
                    playerOne.win()
                    output.hidden = false;
                    output.innerHTML = `${playerOne.name} wins!`;
                    gameboard.resetBoard();
                    pauseToggle();
                    return contBtn.disabled = false;
                } else {
                    playerTwo.win();
                    output.hidden = false;
                    output.innerHTML = `${playerTwo.name} wins!`;
                    gameboard.resetBoard();
                    pauseToggle();
                    return contBtn.disabled = false;
                }
            } else if ((board[3] === board[4] && board[3] === board[5] && board[3] !== "")){
                if (board[3] === "O"){
                    playerOne.win()
                    output.hidden = false;
                    output.innerHTML = `${playerOne.name} wins!`;
                    gameboard.resetBoard();
                    pauseToggle();
                    return contBtn.disabled = false;
                } else {
                    playerTwo.win();
                    output.hidden = false;
                    output.innerHTML = `${playerTwo.name} wins!`
                    gameboard.resetBoard();
                    pauseToggle();
                    return contBtn.disabled = false;
                }
            } else if ((board[2] === board[5] && board[2] === board[8] && board[2] !== "") ||
                       (board[2] === board[4] && board[2] === board[6] && board[2] !== "")){
                if (board[2] === "O"){
                    playerOne.win()
                    output.hidden = false;
                    output.innerHTML = `${playerOne.name} wins!`;
                    gameboard.resetBoard();
                    pauseToggle();
                    return contBtn.disabled = false;
                } else {
                    playerTwo.win();
                    output.hidden = false;
                    output.innerHTML = `${playerTwo.name} wins!`
                    gameboard.resetBoard();
                    pauseToggle();
                    return contBtn.disabled = false;
                        }
            } else if ((board[6] === board[7] && board[6] === board[8] && board[6] !== "")){
                if (board[6] === "O"){
                    playerOne.win()
                    output.hidden = false;
                    output.innerHTML = `${playerOne.name} wins!`;
                    gameboard.resetBoard();
                    pauseToggle();
                    return contBtn.disabled = false;
                } else {
                    playerTwo.win();
                    output.hidden = false;
                    output.innerHTML = `${playerTwo.name} wins!`;
                    gameboard.resetBoard();
                    pauseToggle();
                    return contBtn.disabled = false;
                }
            } else if (checkDraw === 0){
                output.hidden = false;
                output.innerHTML = "It's a tie.";
                gameboard.resetBoard();
                pauseToggle();
                return contBtn.disabled = false;
            }
    };

    const cont = contBtn.addEventListener("click", () => {
        output.innerHTML = "";
        output.hidden = true;
        pauseToggle();
        contBtn.disabled = true;
        gameboard.printScore();
        DOMgameboard.forEach(e => e.setAttribute("class", "boardfield"));
    });

    const fieldBtn = DOMgameboard.forEach(e => {
            e.addEventListener("click", () =>{
                if (output.innerHTML !== "") {
                    output.innerHTML = "";
                    output.hidden = true;
                }
                if (e.getAttribute("disabled") === "false"){
                    return gameboard.drawBoard(e.getAttribute("arrindex"));
                }
                
            })
    });

    const btnPress = playBtn.addEventListener("click", () => {
        if (player1Input.value !== "" && player2Input.value !== "") {
            output.innerHTML = "";
            output.hidden = true;
            playerOne = generatePlayer(player1Input.value, "O");
            playerTwo = generatePlayer(player2Input.value, "X");
            gameboard.printScore();
            player1Input.disabled = true;
            player2Input.disabled = true;
            pauseToggle();
            startGame();
        }else{
            output.hidden = false;
            output.innerHTML = "Please enter player names"
        }
    })

    return {startGame, winCondition, DOMgameboard, getPause, pauseToggle};
})();

