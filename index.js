//global variables
var playerCanClick = false;
var colorCode = {
  "green": 1,
  "red": 2,
  "yellow": 3,
  "blue": 4
};

var soundList = [0]; //zero is not used as a colorCode, but needed for simplicity
var randomSequence = [];
var playerSequence = []; // restarted when correct for the full sequence
var playerSeqI = 0;
var strictModeOn = true;

//event handlers

$("#1").click(() => {

  playerInput(colorCode.green);
});
$("#2").click(() => {

  playerInput(colorCode.red);
});
$("#3").click(() => {

  playerInput(colorCode.yellow);
});
$("#4").click(() => {

  playerInput(colorCode.blue);
});
$("#START").click(() => {

  $("#START").text("RESTART");
  restart();
});
$("#strictmode").click(() => {
  strictModeOn = !strictModeOn;
  console.log("strictmode toggled to " + strictModeOn);
  $("#strictmode").toggleClass("strict-off");
  $("#strictmode").toggleClass("strict-on");
  strictModeOn ? $("#strictmode").html("STRICT<br>MODE ON") : $("#strictmode").html("STRICT<br>MODE OFF");
});

function soundAndLight(activeButton) {
  //#1 green
  //#2 red
  //#3 yellow
  //#4 blue
  let activeBtnTag = "#" + activeButton;
  let classId = "pressed" + activeButton;
  $(activeBtnTag).addClass(classId);

  switch (activeButton) {
    case colorCode.green:

      var simonSound = soundList[colorCode.green];
      simonSound.play();

      console.log(soundList[colorCode.green]);
      break;
    case colorCode.red:

      var simonSound = soundList[colorCode.red];
      simonSound.play();
      break;
    case colorCode.yellow:

      var simonSound = soundList[colorCode.yellow];
      simonSound.play();
      break;
    case colorCode.blue:

      var simonSound = soundList[colorCode.blue];
      simonSound.play();
      break;
  }

  setTimeout(() => {
    $(activeBtnTag).removeClass(classId);
  }, 430);

}

//do something when the player clicks
function playerInput(input) {
  if (playerCanClick) {
    soundAndLight(input);
    playerSequence.push(input);
    console.log(playerSequence);
    if (input == randomSequence[playerSeqI]) {
      playerSeqI == randomSequence.length - 1 ? aNewTurn() : playerSeqI++;
    } else {
      var badSound = new Audio("sounds/wrong.mp3");
      badSound.play();
      strictModeOn ? endGame() :
        setTimeout(() => {
          sequencePlayer();
        }, 500);

    }
  }

}


function aNewTurn() {
  playerCanClick = false;
  let aNewNum = Math.floor(Math.random() * 4) + 1;
  randomSequence.push(aNewNum);
  $("#display-div").html("LEVEL<br>" + randomSequence.length);
  setTimeout(() => {
    sequencePlayer();
  }, 430);

}
//play the random sequence

function sequencePlayer() {
  //if the player won:
  if (randomSequence.length > 20) {
    $("#display-div").html("YOU<br>WIN!");
    lightAllButtons();
    return;
  }
  //otherwise
  let i = 0;
  var iPlayInterval = setInterval(iPlay, 500);

  function iPlay() {
    if (i < randomSequence.length) {
      console.log("randomSequencei: " + randomSequence[i]);
      let iBtn = randomSequence[i];
      soundAndLight(iBtn);
      i++;
    } else {
      clearInterval(iPlayInterval);
      //gives control back as the player can click and his sequence is empty
      setTimeout(function() {
        playerSequence = [];
        playerSeqI = 0;
        playerCanClick = true;
      }, 100);

    }
  }
}

function lightAllButtons() {
  for (let i = 1; i < 5; i++) {
    let activeBtnTagI = "#" + i;
    let classIdI = "pressed" + i;
    $(activeBtnTagI).addClass(classIdI);
  }
  $(".btn").addClass("pressed");
}

function removeButtonChanges() {
  $(".btn").removeClass("over");
  $(".btn").removeClass("pressed");
  for (let i = 1; i < 5; i++) {
    let activeBtnTagI = "#" + i;
    let classIdI = "pressed" + i;
    $(activeBtnTagI).removeClass(classIdI);
  }
}

function endGame() {
  randomSequence = [];
  $("#display-div").html("TOO<br>BAD!");
  $(".btn").addClass("over");
}

function restart() {
  randomSequence = [];
  removeButtonChanges();
  aNewTurn();
}

function soundListAdder() {
  console.log("adder");
  for (let i = 1; i < 5; i++) {
    soundList.push(new Audio(`https://s3.amazonaws.com/freecodecamp/simonSound${i}.mp3`));
  }
  console.log(soundList);
}
//This needs to run at start
soundListAdder();
