var player = "X";
var winArray = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [],
    [],
    [],
    [],
    []
];

$(document).ready(function(){
    $(".cell").on("click",function(){
        var $this = $(this);
//     $this.css("background-color", "red");
        if(player === "X"){
            $this.text("X");
            player = "O";
        }else{
            $this.text("O");
            player = "X";
        }



    });









});