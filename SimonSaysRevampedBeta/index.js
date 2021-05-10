// Simon says Beta game.
//console.log("SIMON SAYS!!!");
const _version = "1.2.5";
const _author = "Chris J. Nguyen";
const _date = "15 April 2021";

// Dictionary to be used as a shortcut for linking the different button and light elements.
var definitions = {
  stopButton : ["stop", "stopLight" ],
  slowButton : ["slow", "slowLight" ],
  goButton : ["go", "goLight" ]
};

const indexs = ["stopButton", "slowButton", "goButton"];

// Create global variable because user may not want to be in loop
// Start with database that keeps adding
// If database is greater than 2, user wants to play

var soFar = [];
var userSoFar = [];
var start = false;
var statBox;
var textBox;
var highScore = 0;
var highScoreBox;
var playingColors = false;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};

async function flickLight(singleButton, duration=200, userPress=false){
  var lightNode = document.getElementById( definitions[singleButton][1] );
  let classList = lightNode.classList;
  const colorClass = definitions[ singleButton ] [0];  // Will give us the class for tyhat color
  classList.add(colorClass); // Turn on
  await sleep( duration );
  classList.remove(colorClass); // Back off
  }

async function flickButton(singleButton, duration=100, colorClass="darken"){
  var node = document.getElementById( singleButton );
  let classList = node.classList;
  classList.add(colorClass); // Turn on
  await sleep( duration );
  classList.remove(colorClass); // Back off
}

function toggleShade(mouseEvent, ingress=true, colorClass="darken"){
  if(mouseEvent.type=="mouseleave"){
    var ingress = false;
  }
  let ref = mouseEvent.target.classList
  var blank = (ingress) ? ref.add(colorClass) : ref.remove(colorClass)
}

async function playColors(colors, duration=1000){
  // Takes an array of colors and flashes them on/off
  // "colors" is an array of button IDs
  duration = duration - (colors.length * 100 )
  for (col of colors ){
    await sleep( 300 );
    // "col" is the button ID itself
    await flickLight(col, duration)
  }
}

function randomMove(){
  var item = indexs[Math.floor(Math.random() * indexs.length)];
  return item
}

function assignListeners( buttonNode, maxEvents=1 ){
  // Function to solely assign an addEventListener() to the passed node
  // Parameter should be a node with an addEventListener() method
  buttonNode.addEventListener("click", checkMove) ;
  buttonNode.addEventListener("mouseenter", toggleShade );
  buttonNode.addEventListener("mouseleave", toggleShade );
  }

  function getColor(mouseEvent){
    var element = mouseEvent.target
    var color = element.id ;
    return color;   // Will return goButton
  }

function checkGame(shortList, longList){
  var max = shortList.length
  var longList = longList.slice(0,max)
  const stat = shortList.toString() === longList.toString()
  return ( stat )
}

async function checkMove(mouseEvent){
  var color = getColor(mouseEvent)
  console.log("Color is: "+color)
  if( !(color in definitions) || playingColors === true  ){ 
    console.log("Please wait your turn! >:-( ");
    return
  }
  flickButton( color )
  await flickLight( color )
  
  
  if(userSoFar.length>1 && userSoFar.length+1>soFar.length){
    console.log("Game needs to be re-initialized.")
    textBox.textContent = "Wanna play a game??? ;)"
  }
  else{
    if(start===false){
      console.log("Initializing and Starting game")
      userSoFar = [getColor(mouseEvent) ];
      start = true
    }
    else{
      console.log("Adding move")
      userSoFar.push( getColor(mouseEvent) )
    }
    if( userSoFar.toString() == soFar.toString() ){
      statBox.textContent = `Current Score: ${soFar.length}`
      console.log("You got the whole sequence correct")
      await sleep(500);
      // Continue game, add another color and replay colors
      soFar.push( randomMove() )
      textBox.textContent = "Pay close attention."
      playingColors = true
      await playColors( soFar )
      playingColors = false
      textBox.textContent = "Your turn."
      userSoFar = []
    }
    else{
      // Compare if correct so far
      var status = checkGame(userSoFar, soFar) 
      console.log("Status: "+status)
      var score = soFar.length-1
      if( !status && soFar.length>0 ){
        
        var yay = (score>highScore) ? "Yay, new high score!" :  "Rats! You hit the wrong button.";
        if(score>highScore){
          highScore = score;
        }
        
        highScoreBox.textContent = "Highest Score: "+highScore ;
        start = false
        alert(`${yay} \nYou got ${score} correct.`)
        textBox.textContent = "Play again?"
        
      }
      else{
        textBox.textContent = "So far so good, keep going."
      }
      // Do nothing, waiting for all moves
    }
  }
}


async function startGame() {
  'use strict';
  var greeting = `Good choice. 
Now, pay real close attention to them three circles down there, they can get real tricky.
All ya gotta do is repeat the sequence after I show you it, and I'll know if you try to cheat!
Start by clicking the "Go" button to the left of the Green Light that I am about to show you.
Click "Ok" when you're ready!"`
  alert( greeting )
  console.log("Strting game...");
  textBox.textContent = "Let's begin..."
  soFar = []
  userSoFar = []
  start = false
  // YOUR CODE HERE

  // Start Game
  soFar.push( "goButton" )
  await playColors( soFar, 1000 )
};

function initialize(){
  // var textBox was declared at the top of the script

  statBox = document.createElement("a")
  statBox.className = "stat"
  //statBox.textContent = "fdghjfgh"
  //statBox.style = " text-align:center; margin-top: 50px; width: 30%; border: 1px solid black;" //"margin: center; text-align: top; width: 20%;  position: absolute;"


  textBox = document.createElement("div")
  textBox.className = "button special"
  textBox.textContent = "Wanna play a game? ;)"
  //textBox.style = " text-align:center; margin: auto; width: 30%; "
  //textBox.style.marginBlockStart = (document.body.lastChild.offsetHeight / 2 ) + 
  textBox.addEventListener("click", startGame );

  highScoreBox = document.createElement("a")
  highScoreBox.className = "stat score"
  highScoreBox.style.marginTop = "4%"; 
  highScoreBox.textContent = "Highest Score: "+highScore 
  //highScoreBox.textContent = "fdghjfgh"

  var extra = document.createElement("div");
  extra.id = "extra"

  extra.append(statBox)
  extra.appendChild(textBox)
  extra.appendChild(highScoreBox)

  document.body.appendChild(extra)
  

  var allButtons = document.querySelectorAll(".button");
  allButtons.forEach( assignListeners );
}

function deg(){
  console.log("soFar: "+soFar)
  console.log("userSoFar: "+userSoFar)
}


initialize()
