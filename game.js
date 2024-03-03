var buttonColours = ["red", "blue" , "green" , "yellow" ];

var gamePattern = [];

var userClickedPattern = [];

var randomChosenColour;

var started = false;

var level = 0;


$(document).keydown( function(event) {
  if (!started) {
    nextSequence();
    started = true;
  }
})


$(".btn").on("click" , function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  



  check(userClickedPattern.length - 1);

});

function nextSequence() {
  
  level++;
  $("h1").text("Level " + level);
  userClickedPattern = [];
  if(!started) {
    started = true;
    var randomNumber = Math.floor(Math.random() * 4 );
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);

    $("#"+ randomChosenColour).fadeOut(100).fadeIn(100);
    animatePress(randomChosenColour);
    playSound(randomChosenColour);

   
    
  }
}

function check(l) {
  if (gamePattern[l] === userClickedPattern[l]) {
    started = false;
    if (gamePattern.length === userClickedPattern.length) {
    setTimeout (function() {
      nextSequence() 
    }, 1000);
  }
  } else {
    $("h1").text("Game Over, Press Any key to Restart")
    var audio = new Audio("sounds/wrong.mp3");
    audio.play(200);
    $("body").addClass("game-over");
    setTimeout (function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}



function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress (currentColour) {
  $("."+currentColour).addClass("pressed")

  setTimeout( function() {
    $("."+currentColour).removeClass("pressed") 
  } , 100);

}














