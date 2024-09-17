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
        this.animationClockX = 0;
        this.animationClockXTwo = 0;
        this.animationSpeed = 25;
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
//player animaciones PATH
var plyerA = ["assets/battleOne/bombfrent1.png", "assets/battleOne/bombfrent2.png", "assets/battleOne/bombfrent3.png"];
player.animationClockX = player.x;
player.animationClockY = player.y;

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

    if (moved) {
        playerAnimation(event);
    }
}

function playerAnimation(aO, aT, aTh) {
    // Animacion para abajo
    if (player.img.src.includes(plyerA[0])) {
        player.img.src = plyerA[aO];
        player.animationClockY = player.y + player.animationSpeed;
        console.log("1")
    } else if (player.img.src.includes(plyerA[1]) &&
     player.y >= player.animationClockY) {
        player.img.src = plyerA[aT];
        player.animationClockY = player.y + player.animationSpeed;
        console.log("2")
    } else if (player.img.src.includes(plyerA[2]) &&
    player.y >= player.animationClockY) {
        player.img.src = plyerA[aTh];
        player.animationClockY = player.y + player.animationSpeed;
        console.log("3")
    }
}

// Eventos ----------------------------------------------------------
document.addEventListener("keydown", controlsSG);
document.addEventListener("keyup", function(){
    player.img.src = plyerA[0];
});