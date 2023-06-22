const PART_SIZE = 20;

const BOARD_SIZE = 800;

const gameBoard = document.querySelector("#game-board");

let snake = [{ x: 200, y: 200 }];
let food = { x: 0, y: 0 };
let direction = "right";
let isChangingDirection = false;
let gameLoopInterval;

function startGame() {
    if (!isGameOver()) {
        createFood();
        gameLoopInterval = setInterval(gameLoop, 60);
    } else {
        alert('Le jeu est déjà en cours !');
    }
}

function theSnakeIsDead() {
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    document.body.appendChild(overlay);
    const popup = document.createElement("div");
    popup.classList.add("popup");
    const message = document.createElement("p");
    message.textContent = "Le serpent est mort.";
    popup.appendChild(message);

    document.body.appendChild(popup);
}

function gameLoop() {
    updateSnake();
    if (isGameOver()) {
        theSnakeIsDead();
        clearInterval(gameLoopInterval);
    }
    if (isEatingFood()) {
        expandSnake();
        createFood();
    }
    drawSnake();
}

function updateSnake() {
    const head = { x: snake[0].x, y: snake[0].y };

    switch (direction) {
        case "up":
            head.y -= PART_SIZE;
            break;
        case "down":
            head.y += PART_SIZE;
            break;
        case "left":
            head.x -= PART_SIZE;
            break;
        case "right":
            head.x += PART_SIZE;
            break;
    }

    snake.unshift(head);

    if (!isEatingFood()) {
        snake.pop();
    }

    isChangingDirection = false;
}

function drawSnake() {
    gameBoard.innerHTML = "";

    snake.forEach((part) => {
        const snakePart = document.createElement("div");
        snakePart.className = "snake-part";
        snakePart.style.left = `${part.x}px`;
        snakePart.style.top = `${part.y}px`;
        gameBoard.appendChild(snakePart);
    });

    const foodElement = document.createElement("div");
    foodElement.id = "food";
    foodElement.style.left = `${food.x}px`;
    foodElement.style.top = `${food.y}px`;
    gameBoard.appendChild(foodElement);
}

function createFood() {
    const maxX = BOARD_SIZE - PART_SIZE;
    const maxY = BOARD_SIZE - PART_SIZE;
    food.x = getRandomPosition(maxX);
    food.y = getRandomPosition(maxY);
}

function getRandomPosition(max) {
    return Math.floor(Math.random() * (max + 1) / PART_SIZE) * PART_SIZE;
}

function isGameOver() {
    const head = snake[0];

    if (
        head.x < 0 ||
        head.x >= BOARD_SIZE ||
        head.y < 0 ||
        head.y >= BOARD_SIZE
    ) {
        return true;
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }

    return false;
}

function isEatingFood() {
    const head = snake[0];
    return head.x === food.x && head.y === food.y;
}

function expandSnake() {
    const tail = { ...snake[snake.length - 1] };
    snake.push(tail);
}

document.addEventListener("keydown", (event) => {
    if (isChangingDirection) return;

    isChangingDirection = true;

    const keyPressed = event.key;

    switch (keyPressed) {
        case "ArrowUp":
            if (direction !== "down") {
                direction = "up";
            }
            break;
        case "ArrowDown":
            if (direction !== "up") {
                direction = "down";
            }
            break;
        case "ArrowLeft":
            if (direction !== "right") {
                direction = "left";
            }
            break;
        case "ArrowRight":
            if (direction !== "left") {
                direction = "right";
            }
            break;
    }
});

const playBtn = document.querySelector('.play-btn');

playBtn.addEventListener('click', function() {
    startGame();
})