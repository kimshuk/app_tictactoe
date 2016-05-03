var player = "X",
    canClick = true,
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
    ];

function checkWin(playerPiece){
    var playerArray = [];
    $(".game-cell").each(function(){//iterate through each cell on board and save IDs of cells with current player's pieces in them
        var $cell = $(this);
        var $cellId = $cell.attr('id');

        if($cell.text() === playerPiece){
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
            var $h3WinMessage = $("<h3>"+ playerPiece + " wins!" + "</h3>");
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
    $(".game-cell").on("click",function() {
        if (canClick === true) {
        playCount++;
        var $this = $(this);

        if (player === "X") {

            $this.text("X");
            checkWin(player);
            player = "O";

        } else {

            $this.text("O");
            checkWin(player);
            player = "X";

        }
    }


    });









});