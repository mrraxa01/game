function action(){
    this.chapeuzinho = null;
    this.lobo = null;
    this.casadavovo = null;
}

export function init(){

var chapeuzinho = document.getElementById("chapeuzinho");
var lobo = document.getElementById("lobo");
var casadavovo = document.getElementById("casadavovo");
var stepSize = 20;
var gameStarted = false;

document.getElementById("start-button").addEventListener("click", function() {
    gameStarted = true;
    chapeuzinho.style.top = "0";
    chapeuzinho.style.left = "0";
    this.style.display = "none";
});

document.getElementById("up").addEventListener("mousedown", function() {
    moveChapeuzinho({ key: "ArrowUp" });
});

document.getElementById("left").addEventListener("mousedown", function() {
    moveChapeuzinho({ key: "ArrowLeft" });
});

document.getElementById("right").addEventListener("mousedown", function() {
    moveChapeuzinho({ key: "ArrowRight" });
});

document.getElementById("down").addEventListener("mousedown", function() {
    moveChapeuzinho({ key: "ArrowDown" });
});

document.addEventListener("keydown", moveChapeuzinho);
document.addEventListener("keyup", stopChapeuzinho);

function moveChapeuzinho(event) {
    if (!gameStarted) {
        return;
    }

    var topPosition = parseInt(chapeuzinho.style.top) || 0;
    var leftPosition = parseInt(chapeuzinho.style.left) || 0;

    if (event.key === "ArrowUp" && topPosition - stepSize >= 0) {
        chapeuzinho.style.top = (topPosition - stepSize) + "px";
    } else if (event.key === "ArrowLeft" && leftPosition - stepSize >= 0) {
        chapeuzinho.style.left = (leftPosition - stepSize) + "px";
    } else if (event.key === "ArrowRight" && leftPosition + stepSize <= 360) {
        chapeuzinho.style.left = (leftPosition + stepSize) + "px";
    } else if (event.key === "ArrowDown" && topPosition + stepSize <= 360) {
        chapeuzinho.style.top = (topPosition + stepSize) + "px";
    }

    checkCollision();
}

function stopChapeuzinho() {
    if (!gameStarted) {
        return;
    }

    chapeuzinho.style.top = chapeuzinho.style.top;
    chapeuzinho.style.left = chapeuzinho.style.left;
}

function moveLobo() {
    if (!gameStarted) {
        return;
    }

    var topPosition = parseInt(lobo.style.top) || 100;
    var leftPosition = parseInt(lobo.style.left) || 50;

    var randomDirection = Math.floor(Math.random() * 4); // Gera um número aleatório de 0 a 3

    if (randomDirection === 0 && topPosition - stepSize >= 0) {
        lobo.style.top = (topPosition - stepSize) + "px";
    } else if (randomDirection === 1 && leftPosition - stepSize >= 0) {
        lobo.style.left = (leftPosition - stepSize) + "px";
    } else if (randomDirection === 2 && leftPosition + stepSize <= 350) {
        lobo.style.left = (leftPosition + stepSize) + "px";
    } else if (randomDirection === 3 && topPosition + stepSize <= 350) {
        lobo.style.top = (topPosition + stepSize) + "px";
    }

    checkCollision();
}

function checkCollision() {
    var chapeuzinhoRect = chapeuzinho.getBoundingClientRect();
    var loboRect = lobo.getBoundingClientRect();
    var casadavovoRect = casadavovo.getBoundingClientRect();

    if (
        chapeuzinhoRect.left < loboRect.left + loboRect.width &&
        chapeuzinhoRect.left + chapeuzinhoRect.width > loboRect.left &&
        chapeuzinhoRect.top < loboRect.top + loboRect.height &&
        chapeuzinhoRect.top + chapeuzinhoRect.height > loboRect.top
    ) {
        gameStarted = false;
        alert("O lobo te pegou! Fim de jogo.");
        resetGame();
    }

    if (
        chapeuzinhoRect.left < casadavovoRect.left + casadavovoRect.width &&
        chapeuzinhoRect.left + chapeuzinhoRect.width > casadavovoRect.left &&
        chapeuzinhoRect.top < casadavovoRect.top + casadavovoRect.height &&
        chapeuzinhoRect.top + chapeuzinhoRect.height > casadavovoRect.top
    ) {
        gameStarted = false;
        alert("Você chegou na casa da vovó! Parabéns!");
        resetGame();
    }
}

function resetGame() {
    chapeuzinho.style.top = "0";
    chapeuzinho.style.left = "0";
   document.getElementById("play-button").style.display = "active";
}

setInterval(moveLobo, 300); // Chama a função moveLobo a cada 0.3 segundo
}

