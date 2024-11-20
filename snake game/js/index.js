// Game constant and variables
let inputDir = { x: 0, y: 0 };
const foodsound = new Audio("music/food.mp3");
const gameover = new Audio("music/gameover.mp3");
const turnmove = new Audio("music/move.mp3");
const backgroundmusic = new Audio("music/background.mp3");
const homemusic = new Audio("music/nagin.mp3");
let speed = 2;
let lastPaintTime = 0;
let score = 0;
let snakearr = [
    { x: 8, y: 8 }
]
let food = { x: 10, y: 10 };

// Game function
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if (score <= 5) {
        speed = 3;
    }
    if (score >= 10) {
        speed = 5;
    }
    if (score >= 20) {
        speed = 10;
    }
    if (score >= 30) {
        speed = 15;
    }
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    // If you bump into your self
    for (let i = 1; i < snakearr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
}
function gameEngine() {
    // part 1: Updating the snake array and food
    // backgroundmusic.play();
    if (isCollide(snakearr)) {
        inputDir = { x: 0, y: 0 };
        const gameovernotification = document.querySelector(".containerend3");
        gameovernotification.innerHTML = "Game Over. Switch key to play again!"
        snakearr = [{ x: 9, y: 9 }];
        const app = document.querySelector(".app");
        app.querySelector(".gamescreen").classList.add("active");
        app.querySelector(".gameoverscreen").classList.remove("active");

        backgroundmusic.pause();
        gameover.play();
        score = 0;

    }
    // If you have eaten the food, increment the score and regenrate the food 
    if (snakearr[0].x === food.x && snakearr[0].y === food.y) {
        foodsound.play();
        score += 1;
        if (score > highscoreval) {
            highscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(highscoreval));
            highscoreBox.innerHTML = "High Score: " + highscoreval;
        }
        scoreBox.innerHTML = "Score:" + score;
        snakearr.unshift({ x: snakearr[0].x + inputDir.x, y: snakearr[0].y + inputDir.y })
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    // Moving the snake
    for (let i = snakearr.length - 2; i >= 0; i--) {
        snakearr[i + 1] = { ...snakearr[i] };
    }
    snakearr[0].x += inputDir.x;
    snakearr[0].y += inputDir.y;

    // part 2:  Display the snake and food

    // Display the snake

    board.innerHTML = "";
    snakearr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        snakeElement.style.transform = "rotate(0deg)";
        if (index === 0) {
            snakeElement.classList.add('head');
            if (inputDir.y == -1) {
                snakeElement.style.transform = "rotate(180deg)";
            }
            else if (inputDir.y == 1) {
                snakeElement.style.transform = "rotate(360deg)";
            }
            else if (inputDir.x == -1) {
                snakeElement.style.transform = "rotate(90deg)";
            }
            else if (inputDir.x == 1) {
                snakeElement.style.transform = "rotate(270deg)";
            }
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })

    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

// Main logic start here
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    highscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(highscoreval));
} else {
    highscoreval = JSON.parse(hiscore);
    highscoreBox.innerHTML = "High Score: " + hiscore;
}
window.requestAnimationFrame(main);

window.addEventListener('keydown', e => {
    // inputDir = { x: 0, y: 1 }  // start the game
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x = 0;
            inputDir.y = -1;
            turnmove.play();
            break;
        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1;
            turnmove.play();
            break;
        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            turnmove.play();
            break;
        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;
            turnmove.play();
            break;
    }
})