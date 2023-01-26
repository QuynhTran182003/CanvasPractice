var myCanvas = document.getElementById('myCanvas');
var context = myCanvas.getContext('2d');

var paintB = document.getElementById('paint-big');
var paintSm = document.getElementById('paint-small');
var colorInput = document.getElementById('html5colorpicker');
var clearBtn = document.querySelector('.clear');
var saveBtn = document.querySelector('.save');
var loadBtn = document.querySelector('.load');

let isDrawing = false;
let x = 0;
let y = 0;
let lineWidth = 1;

function start(){
  //get the set color
  colorInput.addEventListener("input", updateColor, false);
  

  // mouse events
    myCanvas.addEventListener('mousedown', (e) => {
      //get x,y position in canvas frame at the time mouse pressed
        x = e.offsetX;
        y = e.offsetY;
        isDrawing = true;
    });
    
    myCanvas.addEventListener('mousemove', (e) =>{
      if(isDrawing){
        drawLine(context, x, y, e.offsetX, e.offsetY);
        //update the previous position
        x = e.offsetX;
        y = e.offsetY;
      }
    });
    
    window.addEventListener('mouseup', (e)=>{
      if(isDrawing){
        drawLine(context, x, y, e.offsetX, e.offsetY);
        x = 0;
        y = 0;
        isDrawing = false;
      }
      
    });  

    //clear button clicked
    clearBtn.addEventListener('mousedown', (e) => {
      context.clearRect(0, 0, myCanvas.width, myCanvas.height);
    });

    saveBtn.addEventListener('click', saveCanvas);

    loadBtn.addEventListener('click', loadCanvas);
}

function updateColor(event) {
    colorInput.value = event.target.value;
  }


function drawLine(context, x0, y0, x1, y1){
  context.beginPath();// Creates a new path. Once created, future drawing commands are directed into the path and used to build the path up.
  context.strokeStyle = colorInput.value;
  if(paintB.checked){
    context.lineWidth = 20;
  } else if(paintSm.checked){
    context.lineWidth = 5;
  } else if(eraser.checked){
    context.lineWidth = 5;
    context.strokeStyle = 'white'; 
  }
  context.lineCap = 'round';
  context.moveTo(x0, y0);
  context.lineTo(x1, y1);
  context.stroke();
  context.closePath();
}


function saveCanvas() {
  localStorage.setItem("myCanvas", myCanvas.toDataURL());
  alert('Saved successfully!');
}

function loadCanvas() {
  const dataURL = localStorage.getItem("myCanvas");
  const img = new Image();

  img.src = dataURL;
  img.onload = function() {
    context.drawImage(img, 0, 0);
  };
}


start();