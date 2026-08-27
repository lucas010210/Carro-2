const player = document.getElementById("player");
const game = document.getElementById("game");
const scoreText = document.getElementById("score");

let playerX = 175;
let score = 0;
let speed = 5;
let gameRunning = true;
const lines = [];

for (let i = 0; i < 6; i++) {
    const line = document.createElement("div");
    line.classList.add("road-line");
    line.style.top = (i * 120) + "px";
    game.appendChild(line);
    lines.push(line);
}

function createEnemy() {
    const enemy = document.createElement("div");

    enemy.classList.add("enemy");
    enemy.style.left = Math.floor(Math.random() * 350) + "px";
    enemy.style.top = "-100px";

    game.appendChild(enemy);
}

function collision(a, b) {
    const rectA = a.getBoundingClientRect();
    const rectB = b.getBoundingClientRect();

    return !(
        rectA.bottom < rectB.top ||
        rectA.top > rectB.bottom ||
        rectA.right < rectB.left ||
        rectA.left > rectB.right
    );
}

function gameLoop() {
    if (!gameRunning) return;

    lines.forEach(line => {
        let top = parseInt(line.style.top);

        top += speed;

        if (top > 600) {
            top = -80;
        }

        line.style.top = top + "px";
    });

    const enemies = document.querySelectorAll(".enemy");

    enemies.forEach(enemy => {
        let top = parseInt(enemy.style.top);

        top += speed;
        enemy.style.top = top + "px";

        if (collision(player, enemy)) {
            endGame();
        }

        if (top > 600) {
            enemy.remove();

            score++;
            scoreText.textContent = "Pontos: " + score;

            if (score % 5 === 0) {
                speed += 0.5;
            }
        }
    });

    requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", event => {

    if (!gameRunning) return;

    if (event.key === "ArrowLeft") {
        playerX -= 20;

        if (playerX < 0) {
            playerX = 0;
        }

        player.style.left = playerX + "px";
    }

    if (event.key === "ArrowRight") {
        playerX += 20;

        if (playerX > 350) {
            playerX = 350;
        }

        player.style.left = playerX + "px";
    }
});

setInterval(() => {
    if (gameRunning) {
        createEnemy();
    }
}, 1200);

function endGame() {
    gameRunning = false;

    document.getElementById("finalScore").textContent =
        "Pontuação: " + score;

    document.getElementById("gameOver").style.display = "block";
}

function restartGame() {
    location.reload();
}

gameLoop();
