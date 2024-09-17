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
        this.animationSpeed = 200;
        this.direction = "";
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
            ((this.y + this.height) >= obj.y + 40) &&
            ((obj.y + obj.height) >= this.y)
        )
    }
}

// Variables --------------------------------------------------------
const battletheme = new Audio("./assets/sounds/battletheme.mp3");
battletheme.loop = true;
battletheme.play();
var time0;

const canvasScreenX = ((canvas.width/2)-((canvas.height/2) + (canvas.height + 36)) / 2);
const canvasScreenY = 0;
const canvasScreenW = ((canvas.height) + (canvas.height/2)) + 36;
const canvasScreenH = canvas.height;

const floor = new Item(0, 0, 48, 48, "./assets/battleOne/pasto.png");
const floor2 = new Item(48, 96, 48, 48, "./assets/battleOne/pasto2.png");

const wall1 = new Item(48, 48, 48, 48, "./assets/battleOne/wall1.png");

const player = new Item(144, 22, 48, 74, "./assets/battleOne/bomb1.png");
//player animaciones PATH
var plyerA = ["assets/battleOne/bomb1.png", "assets/battleOne/bomb2.png", "assets/battleOne/bomb3.png", "assets/battleOne/bomb4.png", "assets/battleOne/bomb5.png", "assets/battleOne/bomb6.png", "assets/battleOne/bomb7.png", "assets/battleOne/bomb8.png", "assets/battleOne/bomb9.png", "assets/battleOne/bomb10.png", "assets/battleOne/bomb11.png", "assets/battleOne/bomb12.png"];

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
   
    while (wall1.collision(player)) {
        switch (player.direction) {
            case 'up':
                player.y = player.y + 1;
                break;
            case 'down':
                player.y = player.y - 1;
                break;
            case 'right':
                player.x = player.x - 1;
            break;
            case 'left':
                player.x = player.x + 1;
            break;       
        }
    }

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
            player.direction = "up";
            playerAnimation(4, 5);
        break;
        case 'S':
        case 's':
        case 'ArrowDown':
            player.y += player.speed;
            player.direction = "down";
            playerAnimation(1, 2);
        break;
        case 'd':
        case 'D':
        case 'ArrowRight':
            player.x += player.speed;
            player.direction = "right";
            playerAnimation(7, 8);
        break;
        case 'a':
        case 'A':
        case 'ArrowLeft':
            player.x -= player.speed;
            player.direction = "left";
            playerAnimation(10, 11);
        break;
    }
}

// Animacion
function playerAnimation(aO, aT) {
    var time1 = performance.now();
    if (player.img.src.includes(plyerA[0]) ||
    player.img.src.includes(plyerA[3]) ||
    player.img.src.includes(plyerA[6]) ||
    player.img.src.includes(plyerA[9])) {
        player.img.src = plyerA[aO];
        time0 = performance.now();
    } else if (player.img.src.includes(plyerA[aO]) &&
     (time1 - time0) >= player.animationSpeed) {
        player.img.src = plyerA[aT];
        time0 = performance.now();
        
    } else if (player.img.src.includes(plyerA[aT]) &&
    (time1 - time0) >= player.animationSpeed) {
        player.img.src = plyerA[aO];
        time0 = performance.now();
    }
}

function backPlayer() {
    console.log("BPPPPPPPPPPPPPPP")
    if (player.img.src.includes(plyerA[1]) ||
    player.img.src.includes(plyerA[2])){
        player.img.src = plyerA[0];
    } else if (player.img.src.includes(plyerA[4]) ||
    player.img.src.includes(plyerA[5])){
        player.img.src = plyerA[3];
    } else if (player.img.src.includes(plyerA[7]) ||
    player.img.src.includes(plyerA[8])){
        player.img.src = plyerA[6];
    } else if (player.img.src.includes(plyerA[10]) ||
    player.img.src.includes(plyerA[11])){
        player.img.src = plyerA[9];
    }
}

// Eventos ----------------------------------------------------------
document.addEventListener("keydown", controlsSG);
document.addEventListener("keyup", backPlayer);