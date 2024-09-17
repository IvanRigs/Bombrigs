// Clases -----------------------------------------------------------
class Item {
    constructor(x, y, width, height, imagePath) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.img = new Image(); 
        this.img.src = imagePath;
        this.speed = 7;
        this.animationClockX = 0;
        this.animationClockXTwo = 0;
        this.animationSpeed = 200;
        this.direction = "";
    }

    draw(ctx) {
        if (this.img.complete) { 
            ctx.drawImage(this.img, 136 + this.x, this.y, this.width, this.height);
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
battletheme.volume = 0.6;
battletheme.play();
var time0;
var time1;
var timeBomb = 0;
var timeExplosion = 0;
var timeGame = performance.now();
var bombaBoolean = false;
var bombaCand = true;
var explosion = false;

const steps = new Audio("./assets/sounds/Walking1.wav");

const canvasScreenX = ((canvas.width/2)-((canvas.height/2) + (canvas.height + 36)) / 2);
const canvasScreenY = 0;
const canvasScreenW = ((canvas.height) + (canvas.height/2)) + 36;
const canvasScreenH = canvas.height;

const floor = new Item(0, 0, 48, 48, "./assets/battleOne/pasto.png");

//barreras
const wallPath = "./assets/battleOne/wall1.png";
const walls = [];

// Crear borde izquierdo
for (var i = 48; i <= 624; i += 48) {
    walls.push(new Item(48, i, 48, 48, wallPath)); // columna izquierda
}

// Crear borde derecho
for (var i = 48; i <= 624; i += 48) {
    walls.push(new Item(912, i, 48, 48, wallPath)); // columna derecha
}

// Crear borde arriba
for (var i = 96; i <= 912; i += 48) {
    walls.push(new Item(i, 48, 48, 48, wallPath)); // columna derecha
}

// Crear borde abajo
for (var i = 96; i <= 912; i += 48) {
    walls.push(new Item(i, 624, 48, 48, wallPath)); // columna derecha
}

// Crear wall dentro
for (var i = 144; i <= 528; i += 96) {
    for (var z = 144; z <= 816; z += 96) {
        walls.push(new Item(z, i, 48, 48, wallPath)); // columna derecha
    }
}

// Pasto2
// Crear pasto dentro
const floor2Path = "./assets/battleOne/pasto2.png";
const floor2 = [];
for (var i = 192; i <= 576; i += 96) {
    for (var z = 144; z <= 816; z += 96) {
        floor2.push(new Item(z, i, 48, 48, floor2Path)); // columna derecha
    }
}

//Bloque destruible x912 y624
const wallDes = [];
var xW = 240;
var yW = 96
for (var i = 0; i <= 13; i++) {
    wallDes.push(new Item(xW, yW, 48, 48, "assets/battleOne/wallD1.png"));
    xW += 48;
}
for (var i = 0; i <= 5; i++) {
    yW += 96;
    xW = 48;
    for (var z = 0; z <= 16; z++) {
        xW += 48;
        wallDes.push(new Item(xW, yW, 48, 48, "assets/battleOne/wallD1.png")); 
    } 
}

// Player
const player = new Item(97, 60, 38, 64, "./assets/battleOne/bomb1.png");
//player animaciones PATH
var plyerA = ["assets/battleOne/bomb1.png", "assets/battleOne/bomb2.png", "assets/battleOne/bomb3.png", "assets/battleOne/bomb4.png", "assets/battleOne/bomb5.png", "assets/battleOne/bomb6.png", "assets/battleOne/bomb7.png", "assets/battleOne/bomb8.png", "assets/battleOne/bomb9.png", "assets/battleOne/bomb10.png", "assets/battleOne/bomb11.png", "assets/battleOne/bomb12.png"];

player.animationClockX = player.x;
player.animationClockY = player.y;

//Bomba
const bomba = new Item(48, 48, 48, 48, "./assets/battleOne/bomba1.png");

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

    //floor2.draw(ctx);
   
    walls.forEach(function(wall, i, array){
        wall.draw(ctx);
        while (wall.collision(player)) {
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
    });

    floor2.forEach(function(floors, i, array){
        floors.draw(ctx);
    });

    wallDes.forEach(function(wall, i, array){
        wall.draw(ctx);
        while (wall.collision(player)) {
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
    });

    if (bombaBoolean) {
        if (!bombaCand) {
            bomba.x = Math.round(player.x / 48) * 48;
            bomba.y = Math.round(player.y / 48) * 48;
        }
        bomba.draw(ctx);
        bombaCand = true;
        bombaF();
    }

    if (explosion) {
        // Crear las 4 áreas de la explosión en forma de +
        var explosionUp = new Item(bomba.x, bomba.y - 48, bomba.width, bomba.height, "assets/battleOne/homer1.png");
        var explosionDown = new Item(bomba.x, bomba.y + 48, bomba.width, bomba.height, "assets/battleOne/homer1.png");
        var explosionRight = new Item(bomba.x + 48, bomba.y, bomba.width, bomba.height, "assets/battleOne/homer1.png");
        var explosionLeft = new Item(bomba.x - 48, bomba.y, bomba.width, bomba.height, "assets/battleOne/homer1.png");

        wallDes.forEach(function(wall, i) {
            // Ver coordenadas de la explosión y del bloque para debugging
            console.log(`Bloque ${i}: (${wall.x}, ${wall.y}, ${wall.width}, ${wall.height})`);
            console.log(`Explosión abajo: (${explosionDown.x}, ${explosionDown.y}, ${explosionDown.width}, ${explosionDown.height})`);

            // Si alguna de las explosiones colisiona con un bloque, lo eliminamos
            if (colision(wall, explosionUp)) {
                wallDes.splice(i, 1);
                console.log("Bloque destruido arriba");
            }
            if (colision(wall, explosionDown)) {
                wallDes.splice(i, 1);
                console.log("Bloque destruido abajo");
            }
            if (colision(wall, explosionRight)) {
                wallDes.splice(i, 1);
                console.log("Bloque destruido derecha");
            }
            if (colision(wall, explosionLeft)) {
                wallDes.splice(i, 1);
                console.log("Bloque destruido izquierda");
            }
        });
         
        // Restablecer la explosión
        explosion = false;
    }
    

    if ((player.img.src.includes(plyerA[0]) ||
    player.img.src.includes(plyerA[3]) ||
    player.img.src.includes(plyerA[6]) ||
    player.img.src.includes(plyerA[9])  ||
    player.img.src.includes("assets/battleOne/homer1.png") ||
    player.img.src.includes("assets/battleOne/homer2.png") ||
    player.img.src.includes("assets/battleOne/homer3.png") ||
    player.img.src.includes("assets/battleOne/homer4.png") ||
    player.img.src.includes("assets/battleOne/homer5.png") ||
    player.img.src.includes("assets/battleOne/homer6.png")) && (performance.now() - time0 > 10000)) {
        homer();
        player.draw(ctx);
    }else {
        player.draw(ctx);
    }

    ctx.font = "30px snake";
    ctx.strokeStyle = "white";
    ctx.fillText("W", 69, 45, 30, 30);
    ctx.strokeRect(47, 12, 40, 40);
    ctx.fillText("A", 25, 90, 30, 30);
    ctx.strokeRect(3, 60, 40, 40);
    ctx.fillText("S", 70, 90, 30, 30);
    ctx.strokeRect(47, 60, 40, 40);
    ctx.fillText("D", 115, 90, 30, 30);
    ctx.strokeRect(91, 60, 40, 40);
    ctx.fillText("SPACE", 70, 140);
    ctx.strokeRect(5, 110, 127, 40);

    ctx.font = "20px snake";
    var time = Math.trunc((performance.now() - timeGame) / 1000);
    ctx.fillText("Time: " + time +"s", 70, 175);

    animationFrameId = requestAnimationFrame(drawStartGame);
}

requestAnimationFrame(drawStartGame);

function colision(objectOne, objectTwo) {
    return (
        ((objectOne.x + objectOne.width) >= objectTwo.x) &&
        ((objectTwo.x + objectTwo.width) >= objectOne.x) &&
        ((objectOne.y + objectOne.height) >= objectTwo.y) &&
        ((objectTwo.y + objectTwo.height) >= objectOne.y)
    )
}

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
        case ' ':
            if (!bombaBoolean) {
                bombaBoolean = true;
                bombaCand = false;
            }
        break;
        case '+': //mecanica especial
           player.speed += 1;
        break;
        case '-':
            player.speed -= 1;
        break;
    }
}

function bombaF() {
    if (timeBomb == 0){
        timeBomb = performance.now();
        timeExplosion = performance.now();
        bomba.img.src = "assets/battleOne/bomba1.png";
    }else if (((performance.now() - timeBomb) <= 300)){
        bomba.img.src = "assets/battleOne/bomba2.png";
    }else if (((performance.now() - timeBomb) <= 600)){
        bomba.img.src = "assets/battleOne/bomba3.png";
    }else if (((performance.now() - timeBomb) <= 900)){
        bomba.img.src = "assets/battleOne/bomba1.png";
    }else if (((performance.now() - timeBomb) <= 1200)){
        timeBomb = performance.now();
    }

    console.log("3")
    if ((performance.now() - timeExplosion) >= 3600) {
        bombaBoolean = false;
        timeBomb = 0;
        timeExplosion = 0;
        explosion = true;
    }
}

function homer() {  //mecanica especial 
    if (performance.now() - time0 <= 10000){
        player.img.src = "assets/battleOne/homer1.png";
    }else if (performance.now() - time0 <= 10100){
        player.width = 45;
        player.img.src = "assets/battleOne/homer2.png";
    }else if ((performance.now() - time0 <= 10200) || (performance.now() - time1 <= 100)){
        player.width = 38;
        player.img.src = "assets/battleOne/homer3.png";
    }else if ((performance.now() - time0 <= 10300) || (performance.now() - time1 <= 200)){
        player.img.src = "assets/battleOne/homer4.png";
    }else if ((performance.now() - time0 <= 10400) || (performance.now() - time1 <= 300)){
        player.img.src = "assets/battleOne/homer5.png";
    }else if ((performance.now() - time0 <= 10500) || (performance.now() - time1 <= 400)){
        player.img.src = "assets/battleOne/homer6.png";
        time1 = performance.now();
    }
    
}

// Animacion
function playerAnimation(aO, aT) {
    var time2 = performance.now();
    if (player.img.src.includes(plyerA[0]) ||
    player.img.src.includes(plyerA[3]) ||
    player.img.src.includes(plyerA[6]) ||
    player.img.src.includes(plyerA[9]) ||
    player.img.src.includes("assets/battleOne/homer1.png") ||
    player.img.src.includes("assets/battleOne/homer2.png") ||
    player.img.src.includes("assets/battleOne/homer3.png") ||
    player.img.src.includes("assets/battleOne/homer4.png") ||
    player.img.src.includes("assets/battleOne/homer5.png") ||
    player.img.src.includes("assets/battleOne/homer6.png")) {
        player.width = 38;
        player.height = 64;
        player.img.src = plyerA[aO];
        time0 = performance.now();
        steps.play();
    } else if (player.img.src.includes(plyerA[aO]) &&
     (time2 - time0) >= player.animationSpeed) {
        player.img.src = plyerA[aT];
        time0 = performance.now();
        steps.play();
    } else if (player.img.src.includes(plyerA[aT]) &&
    (time2 - time0) >= player.animationSpeed) {
        player.img.src = plyerA[aO];
        time0 = performance.now();
        steps.play();
    }
}

function backPlayer() {
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
    time0 = performance.now();
}

// Eventos ----------------------------------------------------------
document.addEventListener("keydown", controlsSG);
document.addEventListener("keyup", backPlayer);