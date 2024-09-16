const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Variables --------------------------------------------------------
const bg = document.createElement("video");
bg.src = "assets/main-screen/intro.mov"
var textH = 588;
var textState = false;
var animationFrameId; 
console.log("2");

// Funciones --------------------------------------------------------
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "black";
    ctx.font = "50px Arial";
    ctx.fillText("Click para comenzar", canvas.width/2, 320);

    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "35px snake";
    ctx.textAlign = 'center';

    ctx.fillText("Espacio para omitir", canvas.width / 2, textH);

    textState = (textH == canvas.height - 50) ? true : ((textH == canvas.height - 60) ? false : textState);
    textH = (textState) ? textH - 0.5 : textH + 0.5;
    
    animationFrameId = requestAnimationFrame(draw);
}

function controls(event) {
    switch (event.key) {
        case ' ':
            loadMainScreen();
            break;
    }
}

function loadMainScreen() {
    cancelAnimationFrame(animationFrameId); 

    bg.pause();
    bg.currentTime = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    bg.removeEventListener('loadedmetadata', adjustCanvasSize);
    bg.removeEventListener('canplay', startDrawing);
    bg.removeEventListener('ended', loadMainScreen);
    canvas.removeEventListener('click', startVideo);
    document.removeEventListener('keydown', controls);

    const script = document.createElement('script');
    script.src = 'mainScreen.js';
    document.body.appendChild(script);
}

function adjustCanvasSize() {
    canvas.width = bg.videoWidth;
    canvas.height = bg.videoHeight;
}

function startDrawing() {
    requestAnimationFrame(draw);
}

function startVideo() {
    bg.play();
}

// Eventos ----------------------------------------------------------
bg.addEventListener('loadedmetadata', adjustCanvasSize);

bg.addEventListener('loadeddata', startDrawing);

bg.addEventListener('ended', loadMainScreen);

canvas.addEventListener('click', startVideo);

document.addEventListener('keydown', controls);
