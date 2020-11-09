//global variables
var playerCanClick = false;
var randomSequence = [];
var playerSequence =[]; // restarted when correct for the full sequence
var playerSeqI = 0;
var strictModeOn = true;

//event handlers

$("#1").click(()=>{
    console.log("clicked 1");
    playerInput(1);
});
$("#2").click(()=>{
  console.log("clicked 2");
  playerInput(2);
});
$("#3").click(()=>{
  console.log("clicked 3");
  playerInput(3);
});
$("#4").click(()=>{
  console.log("clicked 4");
  playerInput(4);
});
$("#START").click(()=>{
  console.log("clicked start");
  $("#START").text("RESTART");
  restart();
  });
$("#strictmode").click(()=>{
  strictModeOn = !strictModeOn;
  console.log("strictmode toggled to "+strictModeOn);
  $("#strictmode").toggleClass("strict-off");
  $("#strictmode").toggleClass("strict-on");
  strictModeOn ? $("#strictmode").html("STRICT MODE ON") : $("#strictmode").html("STRICT MODE OFF");
});

function soundAndLight(activeButton) {
  //#1 green
  //#2 red
  //#3 yellow
  //#4 blue
  let activeBtnTag = "#"+activeButton;
  let classId = "pressed"+activeButton;
  $(activeBtnTag).addClass(classId);

  switch(activeButton){
    case 1:
      var simonSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
      simonSound.play();
    break;
    case 2:
      var simonSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
      simonSound.play();
    break;
    case 3:
      var simonSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
      simonSound.play();
    break;
    case 4:
      var simonSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
      simonSound.play();
    break;
  }

  setTimeout(()=>{
    $(activeBtnTag).removeClass(classId);
  }, 430);

}

//do something when the player clicks
function playerInput(input){
  if(playerCanClick){
    soundAndLight(input);
    playerSequence.push(input);
    console.log(playerSequence);
    if(input == randomSequence[playerSeqI]){
      console.log("ok, clicked right");
      playerSeqI == randomSequence.length-1 ? aNewTurn() : playerSeqI++;
    }else{
      var badSound = new Audio("sounds/wrong.mp3");
      badSound.play();
      console.log("sequence not ok, clicked wrong");  //strict mode, finish the game
      if(strictModeOn){
        endGame();
      }else{
        console.log("wrong answer, replay the sequence");
        //replays the sequence
        setTimeout(()=>{
          sequencePlayer();
        }, 500);
      }

    }
  }else{
    console.log("You can't click!");
  }

}


function aNewTurn(){
  playerCanClick = false;
  let aNewNum = Math.floor(Math.random() * 4) + 1;
  randomSequence.push(aNewNum);
  console.log("new push: "+aNewNum);
  console.log(randomSequence);
  $("#display-div").html("LEVEL<br>"+randomSequence.length);
  setTimeout(()=>{
    sequencePlayer();
  }, 500);

}
//play the random sequence

function sequencePlayer(){
  //if the player won:
  if(randomSequence.length>20){
    console.log("won");
    $("#display-div").html("YOU<br>WIN!");
    for(let w=1; w<5; w++){
      let activeBtnTagW = "#"+w;
      let classIdW = "pressed"+w;
      $(activeBtnTagW).addClass(classIdW);
    }
    $("#START").addClass("pressed");
    return;
  }
  //otherwise
  console.log("sequencePlayer");
  let i=0;
  var iPlayInterval = setInterval(iPlay, 450);

  function iPlay(){
    console.log("sequencePlayer soundAndLight");
    if(i<randomSequence.length){
      console.log("randomSequencei: "+ randomSequence[i]);
      let iBtn = randomSequence[i];
      soundAndLight(iBtn);
      i++;
    }else{
      clearInterval(iPlayInterval);
      //visszadobja a labdát azzal, hogy the player can click and his sequence is empty
      setTimeout(function(){
        playerSequence =[];
        playerSeqI = 0;
        playerCanClick = true;
      }, 100);

    }
  }
}

function endGame(){
  console.log("pak pak pak paaaaaak");
  randomSequence = [];
  $("#display-div").html("TOO<br>BAD!");
  $(".btn").addClass("over");
  //startClickable = true;
}
function restart(){
  randomSequence = [];
  $(".btn").removeClass("over");
  aNewTurn();
}
