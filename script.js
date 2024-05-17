let playerOne;
let playerTwo;

const gameboard = (function() {
    let initializeBoard = ["","","","","","","","",""];
    const getBoard = () => initializeBoard;

    const p1DrawBoard = () => {
        let choice = parseInt(prompt("P1 Enter index"));
        
        if (initializeBoard[choice] === "") {
            return initializeBoard.splice(choice, 1, playerOne.symbol);        
        } else {
            alert("Invalid input")
            return "Invalid"
        }
    };
    const p2DrawBoard = () => {
        let choice = parseInt(prompt("P2 Enter index"));
        if (initializeBoard[choice] === "") {
            return initializeBoard.splice(choice, 1, playerTwo.symbol);
        } else {
            alert("Invalid input")
            return "Invalid"
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

    const resetBoard = () => {
        DOMgameboard.forEach(e => e.innerHTML = "");
        return initializeBoard = ["","","","","","","","",""];
    };
    return {getBoard, p1DrawBoard, p2DrawBoard, resetBoard, printBoard};
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
    const output = document.querySelector(".output");
    const startGame = () => {
        if (gameboard.getBoard().filter(e => e==="").length === 0){
            if (Math.random() > 0.5){
                turn = "p1"
            } else {
                turn = "p2"
            }
        }
        return play()
    };
    let turn = "p1" 
    const play = () => {
        /* const countO = gameboard.getBoard().filter(e => e === "O").length;
        const countX = gameboard.getBoard().filter(e => e === "X").length; */
        /* if (countO <= countX) {
            gameboard.p1DrawBoard();
        } else {
            gameboard.p2DrawBoard();
        }
        */
        
        if (turn === "p1") {
            let result = gameboard.p1DrawBoard();
            if ( result === "Invalid"){
                turn = "p1"
            } else {
                turn = "p2"
            }
        } else {
            let p2Result = gameboard.p2DrawBoard();
            if (p2Result === "Invalid"){
                turn = "p2"
            } else {
                turn = "p1"
            }
        }

        gameboard.printBoard();
        return winCondition();
    };

    const winCondition = () => {
        let board = gameboard.getBoard();
        let checkDraw = gameboard.getBoard().filter(e => e === "").length;
        if ((board[0] === board[1] && board[0] === board[2] && board[0] !== "") ||
            (board[0] === board[3] && board[0] === board[6] && board[0] !== "") ||
            (board[0] === board[4] && board[0] === board[8] && board[0] !== "")){
                if (board[0] === "O"){
                    playerOne.win();
                    gameboard.resetBoard();
                    return alert(`${playerOne.name} wins!`);
                } else {
                    playerTwo.win();
                    gameboard.resetBoard();
                    return alert(`${playerTwo.name} wins!`);
                }
            } else if ((board[1] === board[4] && board[1] === board[7] && board[1] !== "")){
                if (board[1] === "O"){
                    playerOne.win()
                    gameboard.resetBoard();
                    return alert(`${playerOne.name} wins!`);
                } else {
                    playerTwo.win();
                    gameboard.resetBoard();
                    return alert(`${playerTwo.name} wins!`);
                }
            } else if ((board[3] === board[4] && board[3] === board[5] && board[3] !== "")){
                if (board[3] === "O"){
                    playerOne.win()
                    gameboard.resetBoard();
                    return alert(`${playerOne.name} wins!`);
                } else {
                    playerTwo.win();
                    gameboard.resetBoard();
                    return alert(`${playerTwo.name} wins!`);
                }
            } else if ((board[2] === board[5] && board[2] === board[8] && board[2] !== "") ||
                       (board[2] === board[4] && board[2] === board[6] && board[2] !== "")){
                        if (board[2] === "O"){
                            playerOne.win()
                            gameboard.resetBoard();
                            return alert(`${playerOne.name} wins!`);
                        } else {
                            playerTwo.win();
                            gameboard.resetBoard();
                            return alert(`${playerTwo.name} wins!`);
                        }
            } else if ((board[6] === board[7] && board[6] === board[8] && board[6] !== "")){
                if (board[6] === "O"){
                    playerOne.win()
                    gameboard.resetBoard();
                    return alert(`${playerOne.name} wins!`);
                } else {
                    playerTwo.win();
                    gameboard.resetBoard();
                    return alert(`${playerTwo.name} wins!`);
                }
            } else if (checkDraw === 0){
                gameboard.resetBoard();
                return alert("It's a tie!")
            } else {
                //gameControl.play();
            }   
    };

    const fieldBtn = DOMgameboard.forEach(e => {
        e.addEventListener("click", () =>{
            return e.innerHTML
        })
    })

    const btnPress = playBtn.addEventListener("click", () => {
        if (player1Input.value !== "" && player2Input.value !== "") {
            output.innerHTML = "";
            playerOne = generatePlayer(player1Input.value, "O");
            playerTwo = generatePlayer(player2Input.value, "X");
            player1Input.disabled = true;
            player2Input.disabled = true;
            startGame();
        }else{
            output.innerHTML = "Please enter player names"
        }
    })

    return {startGame, play, winCondition, DOMgameboard, turn};
})();

