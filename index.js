const _version = "2.0.1";
const _author = "Chris J. Nguyen";
const _date = "15 April 2021";

// Dictionary to be used as a shortcut for linking the different button and light elements.
var definitions = {
  stopButton : ["stop", "stopLight" ],
  slowButton : ["slow", "slowLight" ],
  goButton : ["go", "goLight" ]
}

// Used for debbuging purposes 
var globMain ;  
var consoleBox; 

function changeColor(mouseEvent){
  // Primary function to change the stop
  var element = mouseEvent.target 
  globMain = mouseEvent;
  if( definitions.hasOwnProperty( element.id ) ){
    var lightNode = document.getElementById( definitions[element.id][1] );
    let classList = lightNode.classList
    const color = definitions[ element.id ] [0];
    // ( classList.length === 1 ) ? classList.add(color) : classList.remove( color )
    classList.toggle(color)
  }
  else{
    alert("Button not registered!!!")   /// Should not fire ever!
  }
}

function ingress(mouseEvent){
  // Allows for both mouse enter/leave events
  // Updates text box (h2 element) and prints to console the event/location
  globMain = mouseEvent
  const action = (mouseEvent.type==="mouseenter") ? "Mouse has entered: " : "Mouse has left: ";
  const location = mouseEvent.srcElement.id
  console.log("Action was: "+action+location)
  consoleBox.textContent = action+location;
  consoleBox.classList.toggle( definitions[ location ] [0] );
  changeColor( mouseEvent ); // This line only for Bonus objective #3
}

function assignListeners( buttonNode ){
  // Function to solely assign an addEventListener() to the passed node
  // Parameter should be a node with an addEventListener() method
  buttonNode.addEventListener("click", changeColor) ;
  buttonNode.addEventListener("mouseenter", ingress );
  buttonNode.addEventListener("mouseleave", ingress );
}

function createConsoleBox(){
  // Creates text box with basic style
  // Appended to Body element
  consoleBox = document.createElement("h2");
  consoleBox.id = "consoleBox";
  consoleBox.style = "text-align:center; margin: auto; width: 30%; "
  document.body.append(consoleBox);
}
(function() {
  'use strict';
  // YOUR CODE HERE
  // Initilize a textbok for log
  createConsoleBox()
  var allButtons = document.querySelectorAll(".button");
  allButtons.forEach( assignListeners );
})();

