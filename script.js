var canClick = true,
    playCount = 0,
    winArray = [
        ["0","1","2"],
        ["3", "4", "5"],
        ["6", "7", "8"],
        ["0","3","6"],
        ["1","4","7"],
        ["2","5","8"],
        ["0","4","8"],
        ["2","4","6"]
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
    },
    currentPlayer = player1;



function checkWin(playerPiece){
    var playerArray = [];
    $(".game-cell").each(function(){//iterate through each cell on board and save IDs of cells with current player's pieces in them
        var $cell = $(this);
        var $cellId = $cell.attr('id');

        if($cell.find("img").attr("src") === playerPiece.piece.image){
            playerArray.push($cellId[$cellId.length-1]);
            //we only need to save the last character of the id - the #
        }
    });
    // console.log("array after each: ", playerArray);
    for (i = 0; i < winArray.length; i++) {
        // console.log("entering first for loop");
        //enter into each item in winArray
        isWinner = true;
        // console.log(isWinner);
        //isWinner will be set to false whenever a subArray does not meet win condition
        for (j = 0; j < winArray[i].length; j++) {
            // console.log("entering 2nd for loop");
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
    //run function to assign piece objects to player objects (run again on new game button click

    $(".game-cell").on("click",function() {
        if (canClick === true) {

        var $this = $(this);

        if($this.html()==="") {
            console.log(currentPlayer.piece.image);
            //if the html is empty
            // create an image element with a src equal to current player's piece image
            var $img = $("<img>").attr("src", currentPlayer.piece.image);
            //insert it into the cell clicked on
            $this.html($img);
            //update play count
            playCount++;
            // check for win
            checkWin(currentPlayer);
            // switch player to other player
            if(currentPlayer === player1){
                currentPlayer = player2;
            }else {
                currentPlayer = player1;
            }
        }
    }
    });
});