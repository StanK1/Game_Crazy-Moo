let canvas = document.getElementById("gameCanvas");



let sqsize = 50;
let canvasWidth = 10;
let canvasHeight = 5;
canvas.width = canvasWidth * sqsize;
canvas.height = canvasHeight * sqsize;

let context = canvas.getContext("2d");
//Hero start position
let herox = 4;
let heroy = 2;

let candyCount = 0;
let imgC = new Image();
imgC.src = "Candy.png"

let img = new Image();
img.src = "Herobig.png"

function rand(min, max) {
    return min + Math.random() * (max - min);
}

function get_random_color() {
    var h = rand(90, 150);
    var s = 100;
    var l = rand(10, 100);
    return 'hsl(' + h + ',' + s + '%,' + l + '%)';
}

let candies = [];

function spawnCandy() {
    candyX = get_randomXY(9);
    candyY = get_randomXY(4);
    candies.push({x: candyX, y: candyY});
}

function drawMap() {
    for (let i = 0; i < canvasWidth; i++) {
        for (let j = 0; j < canvasHeight; j++) {
            context.fillStyle = get_random_color();
            context.fillRect(i * sqsize, j * sqsize, sqsize, sqsize);
            context.strokeRect(i * sqsize, j * sqsize, sqsize, sqsize);
        }
    }
}

function drawHero() {
    context.drawImage(img, herox * sqsize, heroy * sqsize, sqsize, sqsize);
}

function drawCandies() {
    for (let candy of candies) {
        context.drawImage(imgC, candy.x * sqsize, candy.y * sqsize, sqsize, sqsize);
    }
}

function checkCandyCollision() {
    for (let i = 0; i < candies.length; i++) {
        if (herox === candies[i].x && heroy === candies[i].y) {
            candies.splice(i, 1);
            candyCount++;
            if (candyCount === 10) {
                alert("You WIN");
                let tryAgain = confirm("Do you want to try again?");
                if (tryAgain) {
                    location.reload();
                }
                return;
            } else {
                spawnCandy();
            }
        }
    }
}

function moveUp() {
    if (isWithinCanvas(herox, heroy - 1)) { 
        heroy--;
        checkCandyCollision();
        drawMap();
        drawHero();
        drawCandies();
    }
}

function moveDown() {
    if (isWithinCanvas(herox, heroy + 1)) {
        heroy++;
        checkCandyCollision();
        drawMap();
        drawHero();
        drawCandies();
    }
}

function moveLeft() {
    if (isWithinCanvas(herox - 1, heroy)) {
        herox--;
        checkCandyCollision();
        drawMap();
        drawHero();
        drawCandies();
    }
}

function moveRight() {
    if (isWithinCanvas(herox + 1, heroy)) {
        herox++;
        checkCandyCollision();
        drawMap();
        drawHero();
        drawCandies();
    }
}

document.onkeypress = function(e) {
    let key = e.key;
    switch (key) {
        case "w":
            moveUp();
            break;
        case "s":
            moveDown();
            break;
        case "a":
            moveLeft();
            break;
        case "d":
            moveRight();
            break;
    }
}

function get_randomXY(max) {
    return Math.floor(Math.random() * max);
}

function isWithinCanvas(x, y) {
    return x >= 0 && x < canvasWidth && y >= 0 && y < canvasHeight;
}

let timeLeft = 15; 

let timerElement = document.getElementById("timer"); 

function countdown() {
    timeLeft--;
    timerElement.innerHTML = "Time left: " + timeLeft;
    if (timeLeft <= 0) {
        clearInterval(timer);
        alert("Time's up!");
        let tryAgain = confirm("Do you want to try again?");
        if (tryAgain) {
            location.reload();
        }
    }
}

let timer = setInterval(countdown, 1000);

function checkCandyCollision() {
    for (let i = 0; i < candies.length; i++) {
        if (herox === candies[i].x && heroy === candies[i].y) {
            candies.splice(i, 1);
            candyCount++;
            if (candyCount === 10) {
                clearInterval(timer); // stop the timer when all the candies are collected
                alert("You WIN");
                let tryAgain = confirm("Do you want to try again?");
                if (tryAgain) {
                    location.reload();
                }
                return;
            } else {
                spawnCandy();
            }
        }
    }
}

spawnCandy();
drawMap();
drawHero();
drawCandies();