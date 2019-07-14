var buttonColors = ['red', 'blue', 'green', 'yellow'];

var gamePattern = [];
var userClickedPattern = [];

var gameStartTracker = false;
var level = 0;

var h1 = $('h1');

// handles when user presses a key to start the game and prevents another keypress event
function keyPressHandler() {
  $(document).on('keypress', function() {
    !gameStartTracker ? nextSequence() : alert('Game has started already!');
  })
}

// handles when user clicks a button following the game and logs the user's choices
function onClickHandler() {
  $('.btn').on('click', function() {
    var userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);

    var currentLevel = userClickedPattern.length - 1;

    playSoundHandler(userChosenColor);
    animatePressHandler(userChosenColor);
    checkAnswer(currentLevel);
    console.log(userClickedPattern);
  });
}

// checks the user's answer and compares it to what the game has presented so far
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log('success');

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence()
      }, 1000)
    }
  } else {
    playSoundHandler('wrong');
    $('body').addClass('game-over');
    h1.html('Game Over, Press Any Key to Restart');
    setTimeout(() => {
      $('body').removeClass('game-over');
    }, 200)
    startOverHandler();
    console.log('wrong');
  }
};

// initiates the next sequence in the game and levels up
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  userClickedPattern = [];

  gamePattern.push(randomChosenColor);

  gameStartTracker = true;

  level++;
  h1.html('Level ' + level); // change the heading to match current level

  flashButtonHandler(randomChosenColor);
  playSoundHandler(randomChosenColor);
}

// handles the flashing of the button indicating that color's activation
function flashButtonHandler(randomColor) {
  $('#' + randomColor).fadeOut(100).fadeIn(100);
}

// handles the button sounds
function playSoundHandler(randomColor) {
  var audio = new Audio('sounds/' + randomColor + '.mp3');
  audio.play();
}

// handles the animation of the button indicating that color's activation
function animatePressHandler(currentColor) {
  $('.' + currentColor).addClass('pressed');

  setTimeout(function() {
    $('.' + currentColor).removeClass('pressed');
  }, 100)
}

// handles starting the game over when player loses
function startOverHandler() {
  level = 0;
  gamePattern = [];
  gameStartTracker = false;
}


keyPressHandler();
onClickHandler();
