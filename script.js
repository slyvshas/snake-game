const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const boxSize = 20; // Size of each box in the grid
const canvasSize = 400; // Size of canvas

// Initial Snake settings
let snake = [{ x: boxSize * 5, y: boxSize * 5 }];
let snakeDirection = 'RIGHT';
let food = { x: getRandomPosition(), y: getRandomPosition() };
let score = 0;

// Controls
document.addEventListener('keydown', changeDirection);

function getRandomPosition() {
    return Math.floor(Math.random() * (canvasSize / boxSize)) * boxSize;
}

function changeDirection(event) {
    const key = event.key;
    if (key === 'ArrowUp' && snakeDirection !== 'DOWN') {
        snakeDirection = 'UP';
    } else if (key === 'ArrowDown' && snakeDirection !== 'UP') {
        snakeDirection = 'DOWN';
    } else if (key === 'ArrowLeft' && snakeDirection !== 'RIGHT') {
        snakeDirection = 'LEFT';
    } else if (key === 'ArrowRight' && snakeDirection !== 'LEFT') {
        snakeDirection = 'RIGHT';
    }
}

function drawSnake() {
    snake.forEach(segment => {
        ctx.fillStyle = 'green';
        ctx.fillRect(segment.x, segment.y, boxSize, boxSize);
    });
}

function moveSnake() {
    const head = { ...snake[0] };

    // Move snake in the current direction
    if (snakeDirection === 'UP') head.y -= boxSize;
    if (snakeDirection === 'DOWN') head.y += boxSize;
    if (snakeDirection === 'LEFT') head.x -= boxSize;
    if (snakeDirection === 'RIGHT') head.x += boxSize;

    snake.unshift(head);

    // Check if snake has eaten the food
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = { x: getRandomPosition(), y: getRandomPosition() };
    } else {
        snake.pop(); // Remove the last part of the snake if no food is eaten
    }
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, boxSize, boxSize);
}

function checkCollision() {
    const head = snake[0];

    // Wall collision
    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
        return true;
    }

    // Self collision
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            return true;
        }
    }

    return false;
}

function gameLoop() {
    if (checkCollision()) {
        alert(`Game Over! Your score was: ${score}`);
        snake = [{ x: boxSize * 5, y: boxSize * 5 }];
        snakeDirection = 'RIGHT';
        food = { x: getRandomPosition(), y: getRandomPosition() };
        score = 0;
    }

    ctx.clearRect(0, 0, canvasSize, canvasSize);
    drawFood();
    moveSnake();
    drawSnake();
}

// Set the game loop interval
setInterval(gameLoop, 100);
