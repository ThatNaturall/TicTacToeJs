function init(player,OPPONENT){

    const canvas = document.getElementById("cvs");
    const ctx = canvas.getContext("2d");

    //board variables 
    let board = [];
    const COLUMN = 3;
    const ROW = 3;
    const SPACE_SIZE =150;

    //store players moves 

    let gameData = new Array(9);

    // the first player to play is human

    let currentPlayer = player.man;

    //load X & O images 

    const xImage = new Image();
    xImage.src = "img/X.png";

    const oImage = new Image();
    oImage.src = "img/O.png";

    //winning combinations 

    const COMBOS = [[0,1,2],
                    [3,4,5],
                    [6,7,8],
                    [0,3,6],
                    [1,4,7],
                    [2,5,8],
                    [0,4,8],
                    [2,4,6]
                  ];

    let gameOver = false;

    //give every space a unique id 
    //so we can know to put the players move on the gameData array

    let id =0;
    function drawBoard(){

        for(let i = 0; i< ROW; i++){
            board[i]=[];
            for(let j = 0; j < COLUMN; j++){
                board[i][j] = id;
                id++;

                ctx.strokeStyle ="#000";
                ctx.strokeRect(j*SPACE_SIZE,i*SPACE_SIZE,SPACE_SIZE,SPACE_SIZE);
            }
        }
    }
    drawBoard();

    canvas.addEventListener("click",function(event){

     if(gameOver) return;

     // position of mouse click relative to the canvas 

     let X = event.clientX - canvas.getBoundingClientRect().x;
     let Y = event.clientY - canvas.getBoundingClientRect().y;

     // we calculate i & j of the clicked space 

     let i = Math.floor(Y/SPACE_SIZE);
     let j = Math.floor(X/SPACE_SIZE);

     // get id of space the player clicked on

     let id = board[i][j];


     //prevent player from playing the same move twice 

     if(gameData[id]) return;

     //store the players move to game data
     gameData[id] = currentPlayer;

     //draw the move on board 
     drawOnBoard(currentPlayer,i,j);

     //check if play wins 

     if(isWinner(gameData,currentPlayer)){
        showGameOver(currentPlayer);
        gameOver = true;
        return;
     }

     // check if its a tie
     if(isTie(gameData)){
        showGameOver("tie");
        gameOver = true;
        return;
     }

     //give turn to other player
     currentPlayer = currentPlayer == player.man ? player.friend : player.man;
    
    });


    //check for a winner 
    function isWinner(gameData,player){
        for(let i = 0; i < COMBOS.length; i++){
            let won = true ;

            for(let j = 0; j < COMBOS[i].length;j++){
                let id = COMBOS[i][j];
                won = gameData[id] == player && won;
            }
            if(won){
                return true;
            }
        }
        return false;
    }

    // check for a tie game 

    function isTie(gameData){
        let isBoardFill = true ;

        for(let i = 0; i < gameData.length; i++){
            isBoardFill = gameData[i] && isBoardFill;
        }
        if(isBoardFill){
            return true;
        }
        return false; 
    }

    //show game over 

    function showGameOver(player){
        let message = player == "tie" ? "It's a draw" : "The winner is";
        let imgSrc = `img/${player}.png`;

        gameOverElement.innerHTML= `
        <h1>${message}</h1>
        <img class="winner-img" src=${imgSrc} </img>
        <div class="play" onclick="location.reload()">Play Again!</div>
        `; 

        gameOverElement.classList.remove("hide");
    }

    function drawOnBoard(player,i,j){
        let img = player == "X"? xImage : oImage;
        ctx.drawImage(img,j*SPACE_SIZE, i*SPACE_SIZE);
    }


}