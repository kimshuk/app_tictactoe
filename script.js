var canClick = true,
    playCount = 0,
    winArray = [
        [0,1,2],
        [3, 4, 5],
        [6, 7, 8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ],

   mushroomPiece = {
    name: "mushroom",
    image: "assets/images/piece_mushroom.png"
},
   pepperPiece = {
    name: "greenPepper",
    image: "assets/images/piece_green_pepper.png"
},
    pepperoniPiece = {
        name: "pepperoni",
        image: "assets/images/piece_pepperoni.png"
    },
    player1 = {
        name: "Player 1",
        piece: mushroomPiece
    },
    player2 = {
        name: "Player 2",
        piece: pepperoniPiece
    };

    var gameState = localStorage.getItem("gameState");

    if(!gameState){
        gameState = {
        boardState: [null, null, null, null, null, null, null, null, null],
        currentPlayer: player1
        };
    } else{
        gameState = JSON.parse(gameState);
    }

function checkWin(playerPiece){
    var playerArray = [];
    for(i=0; i < gameState.boardState.length; i++){
        //loop through gameState array for existing img srcs
        if(gameState.boardState[i] === playerPiece.piece.image){
            // if there is a src match push that index to playerArray
            playerArray.push(i);
            // console.log(playerArray);
        }
    }
    for (i = 0; i < winArray.length; i++) {
        //enter into each item in winArray
        isWinner = true;
        //isWinner will be set to false whenever a subArray does not meet win condition
        for (j = 0; j < winArray[i].length; j++) {
            //check each item in subArrays of winArray
            if(playerArray.indexOf(winArray[i][j])===-1){
                //if subArray[j] is not in playerArray, not a winner
                isWinner = false;
                // console.log("isWinner inside 2nd for loop: " + isWinner);
                break;
                //break out of current subArray loop and move to next one
            }
        }
        //check if isWinner is true, if so, there was a win condition, current player wins
        if(isWinner === true){
            canClick = false;
            var $h3WinMessage = $("<h3>"+ playerPiece.name + " wins!" + "</h3>");
            $("#player-board").append($h3WinMessage);
        }
    }
    if(playCount === 9 && isWinner === false){
        //if all cells have been filled and there's no winner, it's a tie
        canClick = false;
        var $h3TieMessage = $("<h3>" + "game is a tie." + "</h3>");
        $("#player-board").append($h3TieMessage);
    }

}

$(document).ready(function(){

    $(".game-cell").each(function(){
        //get ID of cell div
        var $id = $(this).attr("id");
        var index = $id[$id.length-1];

        if(gameState.boardState[index]){
            var $img = $("<img>").attr("src", gameState.boardState[index]);
            $(this).html($img);
        }
    });

    //run function to assign piece objects to player objects (run again on new game button click
    $(".game-cell").on("click",function() {
        if (canClick === true) {

        var $this = $(this);

        var $id = $this.attr("id");

        var index = $id[$id.length-1];

        if(!gameState.boardState[index]) {
            console.log(gameState.currentPlayer.piece.image);
            //if the html is empty
            // create an image element with a src equal to current player's piece image

            gameState.boardState[index] = gameState.currentPlayer.piece.image;

            var $img = $("<img>").attr("src", gameState.boardState[index]);

            //insert it into the cell clicked on
            $this.html($img);
            //update play count
            playCount++;
            // check for win
            checkWin(gameState.currentPlayer);
            // switch player to other player
            if(gameState.currentPlayer === player1){
                gameState.currentPlayer = player2;
            }else {
                gameState.currentPlayer = player1;
            }

            localStorage.setItem("gameState", JSON.stringify(gameState));
            console.log(localStorage.getItem("gameState"));
        }
    }


    });









});