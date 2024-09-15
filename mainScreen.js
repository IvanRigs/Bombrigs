// Variables --------------------------------------------------------
const bgScreenMain = document.getElementById("bgScreenMain");

const audio = new Audio("./assets/sounds/TitleScreen.mp3");
audio.loop = true;
audio.play();

requestAnimationFrame(drawMainScreen);

// Funciones --------------------------------------------------------
function drawMainScreen() {
    //Variables
    var textWandH = -3;

    ctx.drawImage(bgScreenMain, 0, 0, canvas.width, canvas.height);

    ctx.textAlign = 'center';
    
    ctx.fillStyle = "black";
    ctx.font = "50px snake";
    ctx.fillText("Empezar juego", (canvas.width / 2) + textWandH, 400 + textWandH);
    ctx.fillText("Multijugador", (canvas.width / 2) + textWandH, 450 + textWandH);
    ctx.fillText("Configuracion", (canvas.width / 2) + textWandH, 500 + textWandH);

    ctx.fillStyle = "#fff";
    ctx.font = "50px snake";
    ctx.fillText("Empezar juego", canvas.width / 2, 400);
    ctx.fillText("Multijugador", canvas.width / 2, 450);
    ctx.fillText("Configuracion", canvas.width / 2, 500);
    
    ctx.fillStyle = "white";
    ctx.font = "35px snake";
    ctx.textAlign = 'center';

    ctx.fillText("By Ivan Rios", canvas.width / 2, 630);


    requestAnimationFrame(drawMainScreen);
}

function adjustCanvasSizeMS() {
    canvas.width = bgScreenMain.videoWidth;
    canvas.height = bgScreenMain.videoHeight;
}

// Eventos ----------------------------------------------------------
bgScreenMain.addEventListener('loadedmetadata', adjustCanvasSizeMS);
