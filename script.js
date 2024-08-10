const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const status = document.getElementById('status');

const playerWidth = 50;
const playerHeight = 100;
const playerSpeed = 5;
const attackRange = 10;
const initialHP = 100;

const player1 = {
    x: 50,
    y: canvas.height - playerHeight - 10,
    width: playerWidth,
    height: playerHeight,
    color: 'blue',
    dx: 0,
    dy: 0,
    attack: false,
    hp: initialHP
};

const player2 = {
    x: canvas.width - 50 - playerWidth,
    y: canvas.height - playerHeight - 10,
    width: playerWidth,
    height: playerHeight,
    color: 'red',
    dx: 0,
    dy: 0,
    attack: false,
    hp: initialHP
};

function drawPlayer(player) {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawHealthBars() {
    // Player 1 Health Bar
    ctx.fillStyle = player1.hp > 0 ? 'blue' : 'green';
    ctx.fillRect(20, 20, player1.hp * 2, 20);
    ctx.strokeStyle = 'black';
    ctx.strokeRect(20, 20, initialHP * 2, 20); // Draw the border

    // Player 2 Health Bar
    ctx.fillStyle = player2.hp > 0 ? 'red' : 'green';
    ctx.fillRect(canvas.width - player2.hp * 2 - 20, 20, player2.hp * 2, 20);
    ctx.strokeStyle = 'black';
    ctx.strokeRect(canvas.width - initialHP * 2 - 20, 20, initialHP * 2, 20); // Draw the border
}

function updatePlayer(player) {
    player.x += player.dx;
    player.y += player.dy;

    // Prevent players from going out of bounds
    if (player.x < 0) player.x = 0;
    if (player.y < 0) player.y = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
    if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;
}

function checkCollision(p1, p2) {
    return !(p1.x + p1.width < p2.x ||
             p1.x > p2.x + p2.width ||
             p1.y + p1.height < p2.y ||
             p1.y > p2.y + p2.height);
}

function update() {
    if (player1.hp <= 0 || player2.hp <= 0) {
        if (player1.hp <= 0) {
            status.textContent = "Player 2 Wins!";
        } else if (player2.hp <= 0) {
            status.textContent = "Player 1 Wins!";
        }
        return; // Stop updating the game
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw players
    drawPlayer(player1);
    drawPlayer(player2);

    // Draw health bars
    drawHealthBars();

    // Update player positions
    updatePlayer(player1);
    updatePlayer(player2);

    // Check for collision and apply damage
    if (checkCollision(player1, player2)) {
        if (player1.attack) {
            player2.hp -= 10;
            player1.attack = false; // Reset attack state
        }
        if (player2.attack) {
            player1.hp -= 10;
            player2.attack = false; // Reset attack state
        }
    }

    requestAnimationFrame(update);
}

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'a':
            player1.dx = -playerSpeed;
            break;
        case 'd':
            player1.dx = playerSpeed;
            break;
        case 'w':
            player1.dy = -playerSpeed;
            break;
        case 's':
            player1.dy = playerSpeed;
            break;
        case ' ':
            player1.attack = true;
            break;
        case 'ArrowLeft':
            player2.dx = -playerSpeed;
            break;
        case 'ArrowRight':
            player2.dx = playerSpeed;
            break;
        case 'ArrowUp':
            player2.dy = -playerSpeed;
            break;
        case 'ArrowDown':
            player2.dy = playerSpeed;
            break;
        case 'Enter':
            player2.attack = true;
            break;
    }
});

document.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'a':
        case 'd':
            player1.dx = 0;
            break;
        case 'w':
        case 's':
            player1.dy = 0;
            break;
        case ' ':
            player1.attack = false;
            break;
        case 'ArrowLeft':
        case 'ArrowRight':
            player2.dx = 0;
            break;
        case 'ArrowUp':
        case 'ArrowDown':
            player2.dy = 0;
            break;
        case 'Enter':
            player2.attack = false;
            break;
    }
});

update();
