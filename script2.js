const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const tileSize = 50;
const playerSpeed = 5;

const player = {
    x: tileSize,
    y: tileSize,
    width: tileSize,
    height: tileSize,
};

const obstacles = [
    { x: 3 * tileSize, y: 2 * tileSize, width: tileSize, height: tileSize },
    { x: 5 * tileSize, y: 4 * tileSize, width: tileSize, height: tileSize },
];

const backgroundImage = new Image();
backgroundImage.src = 'D:/gamechatgpt/images/flores.jpg';

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
        }

        for (const obstacle of obstacles) {
            if (isColliding(player, obstacle)) {
                player.x = prevX;
                player.y = prevY;
                break;
            }
        }
    });
}

function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw a solid background color as a fallback
    ctx.fillStyle = 'lightgray';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw background image
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    // Draw player
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Draw obstacles
    ctx.fillStyle = 'red';
    for (const obstacle of obstacles) {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    }

    requestAnimationFrame(draw);
}


// Start the game loop once the background image is loaded
backgroundImage.onload = function () {
    handleInput();
    draw();
};