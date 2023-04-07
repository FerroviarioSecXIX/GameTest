const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const tileSize = 30;
const playerSpeed = 10;
const maxObstacleHits = 10;

const player = {
    x: tileSize,
    y: tileSize,
    width: tileSize,
    height: tileSize,
    hits: 0,
};

const obstacles = [
    { x: 3 * tileSize, y: 2 * tileSize, width: tileSize, height: tileSize, hits: maxObstacleHits },
    { x: 5 * tileSize, y: 4 * tileSize, width: tileSize, height: tileSize, hits: maxObstacleHits },
    { x: 9 * tileSize, y: 10 * tileSize, width: tileSize, height: tileSize, hits: maxObstacleHits },
];

function isColliding(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}

function handleInput() {
    document.addEventListener('keydown', (e) => {
        const prevX = player.x;
        const prevY = player.y;

        switch (e.key) {
            case 'ArrowUp':
                player.y -= playerSpeed;
                break;
            case 'ArrowDown':
                player.y += playerSpeed;
                break;
            case 'ArrowLeft':
                player.x -= playerSpeed;
                break;
            case 'ArrowRight':
                player.x += playerSpeed;
                break;
            case 'w':
                player.y -= playerSpeed;
                break;
            case 's':
                player.y += playerSpeed;
                break;
            case 'a':
                player.x -= playerSpeed;
                break;
            case 'd':
                player.x += playerSpeed;
                break;
        }

        for (const obstacle of obstacles) {
            if (isColliding(player, obstacle)) {
                if (obstacle.hits > 0) {
                    player.x = prevX;
                    player.y = prevY;
                    obstacle.hits -= 1;
                    player.hits += 1;
                } else {
                    player.x = prevX;
                    player.y = prevY;
                }
                break;
            }
        }
    });
}

function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player which is blue
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Draw obstacles
    ctx.fillStyle = 'red';
    for (const obstacle of obstacles) {
        if (obstacle.hits > 0) {
            ctx.fillStyle = 'red';
            ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        } else {
            ctx.fillStyle = 'gray';
            ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        }
    }
    
    // Draw hit points
    ctx.fillStyle = 'black';
    ctx.font = '24px Arial';
    ctx.fillText(`Player Hits: ${player.hits}`, 10, 30);

    requestAnimationFrame(draw);
}

handleInput();
draw();
