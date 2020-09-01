var gamePattern = [];

var userClickedPattern = [];

var buttonColours = ["red", "blue", "yellow", "green"];

var level = 0;

var started = false;

$(document).keydown(function(event){
  if(!started){
//  if(event.key === "s" || event.key === "S"){
  $("#level-title").text("Let's start!");
    setTimeout(function(){
      started = true;
    },500);
    setTimeout(function(){
      $("#level-title").text("Level 1");
    },500);
    setTimeout(function(){
      nextSequence();
    },1000);
//  }
}
});

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    if(gamePattern.length === userClickedPattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else if(gamePattern[currentLevel] !== userClickedPattern[currentLevel]){
    console.log("failure");
    gameOver();
  }
}

// function passingCheck(){
//   for(var i = 0; i < userClickedPattern.length; i++){
//     if(userClickedPattern[i] !== gamePattern[i]){
//       gameOver();
//       userClickedPattern =[];
//       gamePattern = [];
//       break;
//       return false;
//     }
//   }
//   if(gamePattern.length === userClickedPattern.length){
//     userClick();
//     return true;
//   }
// }

function playSound(userChosenColour){
  new Audio("sounds/" + userChosenColour + ".mp3").play();
}

function gameOver(){
  new Audio("sounds/wrong.mp3").play();
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);
  userClickedPattern = [];
  gamePattern = [];
  level = 0;
  $("#level-title").text("Game over, press any key to restart!");
 started =  false;
}

function animatePress(currentColor){
  $("."+currentColor).addClass("pressed");
  setTimeout(function(){
    $("."+currentColor).removeClass("pressed");
  },100);
}

function nextSequence(){
    level++;
    $("#level-title").text("Level "+ level);
    userClickedPattern = [];
    var randomChosenColour = buttonColours[Math.floor(Math.random()*3 + 1)];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    animatePress(randomChosenColour);
    playSound(randomChosenColour);
}


$(".btn").click(function(event){
  var userChosenColour = this.id;
  playSound(userChosenColour);
  animatePress(userChosenColour);
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

// $("#"+randomChosenColour).click(function(){
//   new Audio("sounds/"+randomChosenColour+".mp3").play();
//   $("#"+randomChosenColour).animate({opacity:0.5});
//   setTimeout(function(){
//     $("#"+randomChosenColour).animate({opacity:1});
//   },5);
// });
