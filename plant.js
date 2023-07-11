const unitLength = 20;
const boxColor = 255;
const strokeColor = 255;
let columns; 
let rows; 
let currentBoard;
let nextBoard;
let img;
let song;


function preload() {
  song = loadSound("happy114950.mp3")
  img = loadImage('yellowflower.png')
}

const slider = document.querySelector('#speed');
const value = document.querySelector('.value');
const speed = slider.value
value.textContent = slider.value;
slider.oninput = function () {
  value.textContent = this.value;
  frameRate(parseInt(slider.value))
}


function setup() {
  const canvas = createCanvas(windowWidth - 220, windowHeight - 220);
  canvas.parent(document.querySelector("#canvas"));

  columns = floor(width / unitLength);
  rows = floor(height / unitLength);

  currentBoard = [];
  nextBoard = [];
  for (let i = 0; i < columns; i++) {
    currentBoard[i] = [];
    nextBoard[i] = [];
  }
  
  init(); 
}


function init() {
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      currentBoard[i][j] = 0;
      nextBoard[i][j] = 0;
    }
  }
  frameRate(parseInt(slider.value));
}

function randomsetup() {
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      currentBoard[i][j] = floor(random(2));
    }
  }
}


function draw() {
  generate();
  // clear()
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {

      if (currentBoard[i][j] == 1) {
        stroke(strokeColor);
        fill(234, 255, 193);
        rect(i * unitLength, j * unitLength, unitLength, unitLength);

        
        image(img, i * unitLength, j * unitLength, unitLength, unitLength, 0, 0)

       

      } else {
        stroke(strokeColor);
        fill(234, 255, 193);
        rect(i * unitLength, j * unitLength, unitLength, unitLength);
      }


    }
  }
}

function generate() {
 
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
 
      let neighbors = 0;
      for (let i of [-1, 0, 1]) {
        for (let j of [-1, 0, 1]) {
          if (i == 0 && j == 0) {
            
            continue;
          }
         
          neighbors +=
            currentBoard[(x + i + columns) % columns][(y + j + rows) % rows];
        }
      }

      
      if (currentBoard[x][y] == 1 && neighbors < 2) {
       
        nextBoard[x][y] = 0;
      } else if (currentBoard[x][y] == 1 && neighbors > 3) {
      
        nextBoard[x][y] = 0;
      } else if (currentBoard[x][y] == 0 && neighbors == 3) {
       
        nextBoard[x][y] = 1;
      } else {
        
        nextBoard[x][y] = currentBoard[x][y];
      }
    }
  }

  
  [currentBoard, nextBoard] = [nextBoard, currentBoard];
}


function mouseDragged() {

  if (mouseX > unitLength * columns || mouseY > unitLength * rows) {
    return;
  }
  const x = Math.floor(mouseX / unitLength);
  const y = Math.floor(mouseY / unitLength);
  currentBoard[x][y] = 1;
  fill(205, 133, 63);
  stroke(strokeColor);
  rect(x * unitLength, y * unitLength, unitLength, unitLength);
}


function mousePressed() {
  noLoop();
  mouseDragged();
  if (!song.isPlaying()) {
    song.play()
  }
}


function mouseReleased() {
  loop();
}

function pause() {
  noLoop();
  song.stop();
}


function playgame() {
  loop();
}

function keyPressed() {
  switch (keyCode) {
    case 83: 
      saveCanvas(canvas, 'My Canvas', "png");
      break;
  }
}

document.querySelector("#reset-game").addEventListener("click", function () {
  init();
});

document.querySelector("#random-setup").addEventListener("click", function () {
  randomsetup();
});

document.querySelector("#pausegame").addEventListener("click", function () {
  pause();
});

document.querySelector("#playgame").addEventListener("click", function () {
  playgame();
});



document.querySelectorAll(".flowercolor")
  .forEach(button => {
    button.addEventListener("click", function () {
      img = loadImage(button.querySelector('img').src)
    });
  })

  function windowResized() {
    resizeCanvas(windowWidth - 200, windowHeight - 200);
    canvas.parent(document.querySelector("#canvas"));
    columns = floor(width / unitLength);
    rows = floor(height / unitLength);

  }
  