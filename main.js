// JS GAME SKELETON

// CHANGE CROSSHAIR
crosshair();

// CANVAS SETUP
let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");
cnv.width = 1000;
cnv.height = 520;

// GLOBAL VARIABLES 
// -> Target parameters
let targetWidth = 40;
let targetHeight = 40;
let targetX = 480;
let targetY = 250;

// -> Ignore 
let state = "start";
let player = {
  x: 388,
  y: 288,
  w: 25,
  h: 25,
  color: "#333",
  speed: 0,
};
let total = 0;
let score = 0;

// HTML Elements
let scoreDisplay = document.getElementById("score");

// START DRAW FUNCTION ON PAGE LOAD
window.addEventListener("load", draw);

function draw() {
  // GAME STATE
  if (state === "start") {
    startScreen();
  } else if (state === "running") {
    gameLogic();
    gameScreen();
    ctx.fillStyle = "red";
    ctx.fillRect(480, 250, 40, 40);
    return;
  } else if (state === "gameover") {
    gameOver();
  }

  // REDRAW
  requestAnimationFrame(draw);
}

// EVENT STUFF

// KEYDOWN EVENT
document.addEventListener("keydown", keydownHandler);

function keydownHandler(e) {
  if (state === "start" && e.code === "Space") {
    state = "running";
  } else if (state === "gameover" && e.code === "Space") {
    reset();
  }
}

// EVENT STUFF

// Target click event
cnv.addEventListener("click", targetClickHandler);

function targetClickHandler() {
  console.log("running targetClickHandler");

  // Call function to check accuracy and update score
    checkHits(targetX, targetY, targetHeight, targetWidth);

  // Assign random coordinates for the new target
    targetWidth = randomInt(20, 50);
    targetHeight = randomInt(20, 50);
    targetX = randomInt(0, cnv.width - targetWidth);
    targetY = randomInt(0, cnv.height - targetHeight);
    console.log(targetX, targetY, targetHeight, targetWidth);

  // Call function to cover up the old canvas
    cleanCanvas();

  // Call function to draw target
    drawNewSquare(targetX, targetY, targetHeight, targetWidth);
}

function drawNewSquare(targetX, targetY, targetHeight, targetWidth) {
  // Draw a target
  ctx.fillStyle = "red";
  ctx.fillRect(targetX, targetY, targetHeight, targetWidth);
}

function checkHits(targetX, targetY, targetHeight, targetWidth) {
  if (targetX <= mouseX && targetX + targetHeight >= mouseX && targetY <= mouseY && targetY + targetWidth >= mouseY) {
    console.log("target hit");
  
    // Update score
    score = score + 1;
  } else {
    console.log("target miss");
    console.log(mouseX,mouseY)
    console.log(targetX,targetY)
  }
    // Update total
    total = total + 1;

    // Update display for both score and total
    scoreDisplay.innerHTML = score + " / " + total;
}

function cleanCanvas() {
  ctx.fillStyle = "#333";
  ctx.fillRect(0, 0, cnv.width, cnv.height);
}