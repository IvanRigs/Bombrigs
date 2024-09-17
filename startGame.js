// Clases -----------------------------------------------------------
class Item {
    constructor(x, y, width, height, imagePath) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.img = new Image(); 
        this.img.src = imagePath;
        this.speed = 5;
    }

    draw(ctx) {
        if (this.img.complete) { 
            ctx.drawImage(this.img, 136 + this.x, this.y, this.width, this.height);
        } else {
            console.log("Imagen aún no cargada.");
        }
    }

    collision(obj) {
        return (
            ((this.x + this.width) >= obj.x) &&
            ((obj.x + obj.width) >= this.x) &&
            ((this.y + this.height) >= obj.y + 50) &&
            ((obj.y + obj.height) >= this.y)
        )
    }
}

// Variables --------------------------------------------------------
const battletheme = new Audio("./assets/sounds/battletheme.mp3");
battletheme.loop = true;
battletheme.play();

const canvasScreenX = ((canvas.width/2)-((canvas.height/2) + (canvas.height + 36)) / 2);
const canvasScreenY = 0;
const canvasScreenW = ((canvas.height) + (canvas.height/2)) + 36;
const canvasScreenH = canvas.height;

const floor = new Item(0, 0, 48, 48, "./assets/battleOne/pasto.png");
const floor2 = new Item(48, 96, 48, 48, "./assets/battleOne/pasto2.png");

const wall1 = new Item(48, 48, 48, 48, "./assets/battleOne/wall1.png");

const player = new Item(144, 22, 48, 74, "./assets/battleOne/bombfrent1.png");

// Funciones --------------------------------------------------------
function drawStartGame() {
    ctx.clearRect(canvasScreenX, canvasScreenY, canvasScreenW, canvasScreenH);

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(canvasScreenX, canvasScreenY, canvasScreenW, canvasScreenH);

    for (var i = 0; i < (canvasScreenW); i += floor.width) {
        for (var z = canvasScreenY; z < (canvasScreenY + canvasScreenH); z += floor.height) {
            floor.draw(ctx);
            floor.x = i;
            floor.y = z;
        }
    }

    wall1.draw(ctx);
    floor2.draw(ctx);
    console.log(wall1.collision(player));
    player.draw(ctx);

    player.img = "./assets/battleOne/bombfrent1.png";

    animationFrameId = requestAnimationFrame(drawStartGame);
}

requestAnimationFrame(drawStartGame);

function controlsSG(event) {
    switch(event.key) {
        case 'w':
        case 'W':
        case 'ArrowUp':
            player.y -= player.speed; 
        break;
        case 'S':
        case 's':
        case 'ArrowDown':
            player.y += player.speed; 
        break;
        case 'd':
        case 'D':
        case 'ArrowRight':
            player.x += player.speed; 
        break;
        case 'a':
        case 'A':
        case 'ArrowLeft':
            player.x -= player.speed; 
        break;
    }
}

function playerAnimation(event) {
    
}

// Eventos ----------------------------------------------------------
document.addEventListener("keydown", controlsSG);
document.addEventListener("keydown", playerAnimation);