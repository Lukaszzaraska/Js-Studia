// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 500;
document.body.appendChild(canvas);

// Set up the game objects
var snakeX = canvas.width/2;
var snakeY = canvas.height/2;
var snakeSize = 10;
var snakeSpeed = 5;

// Set up the food
var foodX = Math.floor(Math.random()*canvas.width);
var foodY = Math.floor(Math.random()*canvas.height);

// Set up the score
var score = 0;

// Set up the direction
var direction = "right";

// Set up the key listener
window.addEventListener("keydown", function(event){
    if (event.keyCode == 37) {
        direction = "left";
    } else if (event.keyCode == 38) {
        direction = "up";
    } else if (event.keyCode == 39) {
        direction = "right";
    } else if (event.keyCode == 40) {
        direction = "down";
    }
});

// Draw the game
function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw the snake
    ctx.fillStyle = "green";
    ctx.fillRect(snakeX, snakeY, snakeSize, snakeSize);
    
    // Draw the food
    ctx.fillStyle = "red";
    ctx.fillRect(foodX, foodY, snakeSize, snakeSize);
    
    // Draw the score
    ctx.fillStyle = "white";
    ctx.font = "24px sans-serif";
    ctx.fillText("Score: " + score, 10, 25);
    
    // Move the snake
    if (direction == "right") {
        snakeX += snakeSpeed;
    } else if (direction == "left") {
        snakeX -= snakeSpeed;
    } else if (direction == "up") {
        snakeY -= snakeSpeed;
    } else if (direction == "down") {
        snakeY += snakeSpeed;
    }
    
    // Check for food
    if (snakeX == foodX && snakeY == foodY) {
        // Increase the score
        score++;
        
        // Generate new food
        foodX = Math.floor(Math.random()*canvas.width);
        foodY = Math.floor(Math.random()*canvas.height);
    }
}

// Run the game loop
setInterval(draw, 60);