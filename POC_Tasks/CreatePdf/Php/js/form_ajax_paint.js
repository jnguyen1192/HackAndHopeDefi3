
$(function () { // Function to use php script without loading page

  $('form').on('submit', function (e) { // select the form balise

    e.preventDefault(); // use default configuration of environment for IE

    var canvasData = canvas.toDataURL("image/png"); // convert canvas into png image data
    $.ajax({ // use ajax which permits to send a php script without changing the current page
        url:'php/save.php', // use the script save.php when submitting the form
        type:'POST', // send data using POST request
        data:{ // the POST object
            data:canvasData, // the data of the signature as "data"
            school:$("#school").val(), // the data of school as "school"
            city:$("#city").val(), // the data of city as "city"
            data_suite:$("#data_suite").val(), // the data suite as "data_suite"
            director:$("#director").val() // the director as "director"
            /* TODO add other data form*/
        }
    });

  });

});

  //pdf.signature_directeur_trice_image("signature_directeur_trice.png")
var canvasDiv = document.getElementById('canvasDiv'); // select the canvas
var canvasWidth = 142; // prepare the width
var canvasHeight = 85; // prepare the height

var clickX = new Array(); // prepare x positions
var clickY = new Array(); // prepare y positions
var clickDrag = new Array(); // ?
var paint; // prepare the pencil

canvas = document.createElement('canvas'); // create a canvas
canvas.setAttribute('width', canvasWidth); // set the width as 5 cm
canvas.setAttribute('height', canvasHeight); // set the height as 3 cm
canvas.setAttribute('id', 'canvas'); // set the id of canvas as "canvas"
canvas.setAttribute('style', 'border: 1px solid blue;'); // set the canvas border
canvasDiv.appendChild(canvas); // put the canvas on div canvasDiv
if(typeof G_vmlCanvasManager != 'undefined') { // ?
  canvas = G_vmlCanvasManager.initElement(canvas); // ?
}
context = canvas.getContext("2d"); // prepare the canvas context

// Clear canvas button action
document.getElementById("clearCanvasSimple").onclick = function(){ // function to clear the canvas added on button with id "clearCanvasSimple"
  context.clearRect(0, 0, canvasWidth, canvasHeight); // clear the canvas
  clickX = new Array(); // clear the x positions
  clickY = new Array(); // clear the y positions
  clickDrag = new Array(); // ?
};

// Draw when clicking
$('#canvas').mousedown(function(e){
  var mouseX = e.pageX - this.offsetLeft;
  var mouseY = e.pageY - this.offsetTop;
    
  paint = true;
  addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
  redraw();
});

// Draw when moving and clicking
$('#canvas').mousemove(function(e){
  if(paint){
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
    redraw();
  }
});

// Stop draw after clicking
$('#canvas').mouseup(function(e){
  paint = false;
});

// Stop draw after outside canvas
$('#canvas').mouseleave(function(e){
  paint = false;
});

// Draw when clicking
function addClick(x, y, dragging)
{
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
}

/**
* Clears the canvas.
*/
function clearCanvas()
{
  context.clearRect(0, 0, canvasWidth, canvasHeight);
}

/**
* Redraws the canvas.
*/
function redraw(){
  clearCanvas(); // Clears the canvas
  
  context.strokeStyle = "#000000";
  context.lineJoin = "round";
  context.lineWidth = 2;
      
  for(var i=0; i < clickX.length; i++) {    
    context.beginPath();
    if(clickDrag[i] && i){
      context.moveTo(clickX[i-1], clickY[i-1]);
     }else{
       context.moveTo(clickX[i]-1, clickY[i]);
     }
     context.lineTo(clickX[i], clickY[i]);
     context.closePath();
     context.stroke();
  }
}