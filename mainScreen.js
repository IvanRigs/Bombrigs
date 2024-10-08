// Variables --------------------------------------------------------
const bgScreenMain = document.getElementById("bgScreenMain");
const hand = document.createElement("img");
const banner = document.createElement("img");
banner.src = "assets/main-screen/banner.png";
hand.src = "assets/icons/hand.png";
const audio = new Audio("./assets/sounds/TitleScreen.mp3");
audio.loop = true;
audio.volume = 0.3;
audio.play();

var handMaxX = 270;
var handMinX = 280;
var handY = 360;
var textX = (canvas.width / 2) - handMaxX;

var bannerY = -195;

var optMS = 0;

requestAnimationFrame(drawMainScreen);

// Funciones --------------------------------------------------------
function drawMainScreen() {
    //Variables
    var textWandH = -3;

    ctx.drawImage(bgScreenMain, 0, 0, canvas.width, canvas.height);

    ctx.textAlign = 'center';
    
    //Opciones en negro
    ctx.fillStyle = "black";
    ctx.font = "50px snake";
    ctx.fillText("Empezar juego", (canvas.width / 2) + textWandH, 400 + textWandH);
    ctx.fillText("Multijugador", (canvas.width / 2) + textWandH, 450 + textWandH);
    ctx.fillText("Configuracion", (canvas.width / 2) + textWandH, 500 + textWandH);

    //Opciones en blanco
    ctx.fillStyle = "#fff";
    ctx.font = "50px snake";
    ctx.fillText("Empezar juego", canvas.width / 2, 400);
    ctx.fillText("Multijugador", canvas.width / 2, 450);
    ctx.fillText("Configuracion", canvas.width / 2, 500);

    //Opciones en naranja
    ctx.fillStyle = "#f18f19";
    ctx.font = "50px snake";
    switch (optMS) {
        case 1:
            ctx.fillText("Empezar juego", canvas.width / 2, 400);
        break;
        case 2:
            ctx.fillText("Multijugador", canvas.width / 2, 450);
        break;
        case 3:
            ctx.fillText("Configuracion", canvas.width / 2, 500);
        break;
    }

    //Mano
    if (bannerY >= 30){
        ctx.drawImage(hand, textX, handY, 60, 50);
    }
    
    //Movimiento en x para Mano
    textState = (textX == ((canvas.width / 2) - handMaxX)) ? true : ((textX == ((canvas.width / 2) - handMinX)) ? false : textState);
    textX = (textState) ? textX - 0.5 : textX + 0.5;

    // Banner
    ctx.drawImage(banner, (canvas.width/2)-384, bannerY, 768, 195);

    //Movimiento banner
    bannerY = (bannerY < 30) ? bannerY + 3.5 : bannerY;

    //Creado por Ivan Rios
    ctx.fillStyle = "white";
    ctx.font = "35px snake";
    ctx.textAlign = 'center';
    ctx.fillText("By Ivan Rios", canvas.width / 2, 630);


    animationFrameId = requestAnimationFrame(drawMainScreen);
}

function adjustCanvasSizeMS() {
    canvas.width = bgScreenMain.videoWidth;
    canvas.height = bgScreenMain.videoHeight;
}

// Controles teclado
function controlsMS(event) {
    switch(event.key) {
        case 'w':
        case 'W':
        case 'ArrowUp':
            if (handY == 360) {
                coordsMS(460, 250, 260, 3);
            }else if(handY == 460) {
                coordsMS(410, 245, 255, 2);
            }else {
                coordsMS(360, 270, 280, 1);
            }
        break;
        case 'S':
        case 's':
        case 'ArrowDown':
            if (handY == 360) {
                coordsMS(410, 245, 255, 2);
            }else if(handY == 410) {
                coordsMS(460, 250, 260, 3);
            }else {
                coordsMS(360, 270, 280, 1);
            }
        break;
        case 'Enter':
            opcSelect();
        break;
    }
}

function opcSelect() {
    switch (optMS) {
        case 1:
            loadstartGame();
        break;
        case 2:
            // TODO falta implementar multijugador
            console.log("2");
        break;
        case 3:
            // TODO falta implementar Configuracion
            console.log("3");
        break;
    }
}

// Cargar juego
function loadstartGame() {
    cancelAnimationFrame(animationFrameId); 

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    bgScreenMain.removeEventListener('loadedmetadata', adjustCanvasSize);
    document.removeEventListener('keydown', controlsMS);
    canvas.removeEventListener('mousemove', controlsMouseMS);
    canvas.removeEventListener('click', controlsMouseClickMS);

    audio.pause();

    const script = document.createElement('script');
    script.src = 'startGame.js';
    document.body.appendChild(script);
}

// Controles mouse
function controlsMouseMS(event) {
    const rect = canvas.getBoundingClientRect();
    if (event.clientX-rect.left > 454 && 
        event.clientX-rect.left < 816 && 
        event.clientY-rect.top > 368 && 
        event.clientY-rect.top < 400) {
        optMS = 1;
    }else if (event.clientX-rect.left > 478 && 
        event.clientX-rect.left < 795 && 
        event.clientY-rect.top > 416 && 
        event.clientY-rect.top < 450) {
        optMS = 2;
    }else if (event.clientX-rect.left > 470 && 
        event.clientX-rect.left < 804 && 
        event.clientY-rect.top > 468 && 
        event.clientY-rect.top < 503) {
        optMS = 3;
    }else {
        optMS = 0;
    }
}

function coordsMS(hY, hMxX, hMnX, optMS) {
    handY = hY;
    handMaxX = hMxX;
    handMinX = hMnX;
    textX = (canvas.width / 2) - handMaxX;
    const audioHand = new Audio("./assets/sounds/Cursor.wav");
    audioHand.play();
    this.optMS = optMS;
}

function controlsMouseClickMS(event) {
    controlsMouseMS(event);
    opcSelect(event);
}

// Eventos ----------------------------------------------------------
bgScreenMain.addEventListener('loadedmetadata', adjustCanvasSizeMS);
document.addEventListener('keydown', controlsMS);
canvas.addEventListener('mousemove', controlsMouseMS);
canvas.addEventListener('click', controlsMouseClickMS)


