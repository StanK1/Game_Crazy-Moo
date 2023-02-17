let canvas = document.getElementById("gameCanvas");

let sqsize = 50;
let canvasWidth = 10;
let canvasHeight = 5;
canvas.width = canvasWidth * sqsize;
canvas.height = canvasHeight * sqsize;

let context = canvas.getContext("2d");
let herox = 1;
let heroy = 2;


function rand(min, max) {
    return min + Math.random() * (max - min);
}

function get_random_color() {
    var h = rand(90, 150);
    var s = 100;
    var l = rand(10, 100);
    return 'hsl(' + h + ',' + s + '%,' + l + '%)';
}



let candy = Math.floor(Math.random() * 10);
let imgC = new Image();
imgC.src = "Candy.png"

let img = new Image();
img.src = "Herobig.png"

//context.drawImage(img, herox * sqsize, heroy * sqsize, sqsize, sqsize);
	
function drawMap()	{
	for (let i = 0; i < canvasWidth; i++) {
		for (let j = 0; j < canvasHeight; j++) {
			context.fillStyle = get_random_color();
			context.fillRect(i * sqsize, j * sqsize, sqsize, sqsize);
			context.strokeRect(i * sqsize, j * sqsize, sqsize, sqsize);
			
		}
	}
}
drawMap();
function drawHero(){
	context.drawImage(img, herox * sqsize, heroy * sqsize, sqsize, sqsize);
}
canvas.onclick = function(e) {
	let mousePosX = e.x - e.originalTarget.offsetLeft;
	let mousePosY = e.y - e.originalTarget.offsetTop;
	herox = Math.floor(mousePosX / sqsize);
	heroy = Math.floor(mousePosY / sqsize);

	drawMap();
	drawHero();
}

function drawCandy(){
	context.drawImageC(imgC, herox * sqsize, heroy * sqsize, sqsize, sqsize);
}




function moveUp(){
 heroy--;
 drawMap();
	drawHero();
}

function moveDown(){
 heroy++;
 drawMap();
	drawHero();
}

function moveLeft(){
 herox--;
 drawMap();
	drawHero();
}

function moveRight(){
 herox++;
 drawMap();
	drawHero();
}

document.onkeypress = function(e){
let key = e.key;
switch(key){
	case "w": moveUp(); break;
	case "s": moveDown(); break;
	case "a": moveLeft(); break;
	case "d": moveRight(); break;
}
}
