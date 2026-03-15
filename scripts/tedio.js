let tabuleiro;
const colunas = 17;
const linhas = 15;
const tamanhoBloco = 32;
const larguraTabuleiro = colunas * tamanhoBloco;
const alturaTabuleiro = linhas * tamanhoBloco;
let contexto;
let direcao = 1;
const mapa = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,2,3,4,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
];
let snake = [126, 127, 128];
let comidas = [];

window.onload = function() {
    tabuleiro = document.getElementById("tabuleiro");
    tabuleiro.height = alturaTabuleiro;
    tabuleiro.width = larguraTabuleiro;
    contexto = tabuleiro.getContext("2d");

    carregarImagens();
    gerarComida();
}

function carregarImagens() {
    
    bloco = new Image();
    
    cabecaDireita = new Image();
    cabecaEsquerda = new Image();
    cabecaCima = new Image();
    cabecaBaixo = new Image ();
    
    corpoDireita = new Image();
    corpoEsquerda = new Image();
    corpoCima = new Image();
    corpoBaixo = new Image();
    
    caudaDireita = new Image();
    caudaEsquerda = new Image();
    caudaCima = new Image();
    caudaBaixo = new Image();
    
    maca = new Image();
    melancia = new Image();
    
    bloco.src = "../sprites/bloco.png";
    
    cabecaDireita.src = "../sprites/cabecaCobraDireita.png";
    cabecaEsquerda.src = "../sprites/cabecaCobraEsquerda.png";
    cabecaCima.src = "../sprites/cabecaCobraCima.png";
    cabecaBaixo.src = "../sprites/cabecaCobraBaixo.png";
    
    corpoDireita.src = "../sprites/corpoCobraDireita.png";
    corpoEsquerda.src = "../sprites/corpoCobraEsquerda.png";
    corpoCima.src = "../sprites/corpoCobraCima.png";
    corpoBaixo.src = "../sprites/corpoCobraBaixo.png";
    
    caudaDireita.src = "../sprites/caudaCobraDireita.png";
    caudaEsquerda.src = "../sprites/caudaCobraEsquerda.png";
    caudaCima.src = "../sprites/caudaCobraCima.png";
    caudaBaixo.src = "../sprites/caudaCobraBaixo.png";
    
    maca.src = "../sprites/maca.png";
    melancia.src = "../sprites/melancia.png";

    comidas[0] = maca; 
    comidas[1] = melancia;
}

function gerarComida() {
    
    let posComida = Math.floor(Math.random() * 256);
    
    while (mapa[posComida] != 0) {
        posComida = Math.floor(Math.random() * 256);
    }

    mapa[posComida] = 5;
}

function carregarMapa() {

    for (let i = 0; i < linhas * colunas; i++) {
        
        const y = (Math.floor(i/colunas)) * tamanhoBloco;
        const x = (i%colunas) * tamanhoBloco;

        if (mapa[i] == 1) {
            contexto.drawImage(bloco, x, y, tamanhoBloco, tamanhoBloco);
        }
        
        else if (mapa[i] == 2) {
            if (direcao == 1) {
                contexto.drawImage(caudaDireita, x, y, tamanhoBloco, tamanhoBloco);
            }
            else if (direcao == -1) {
                contexto.drawImage(caudaEsquerda, x, y, tamanhoBloco, tamanhoBloco);
            }
            else if (direcao == -colunas) {
                contexto.drawImage(caudaCima, x, y, tamanhoBloco, tamanhoBloco);
            }
            else if (direcao == colunas) {
                contexto.drawImage(caudaBaixo, x, y, tamanhoBloco, tamanhoBloco);
            }
        }

        else if (mapa[i] == 3) {
            if (direcao == 1) {
                contexto.drawImage(corpoDireita, x, y, tamanhoBloco, tamanhoBloco);
            }
            else if (direcao == -1) {
                contexto.drawImage(corpoEsquerda, x, y, tamanhoBloco, tamanhoBloco);
            }
            else if (direcao == -colunas) {
                contexto.drawImage(corpoCima, x, y, tamanhoBloco, tamanhoBloco);
            }
            else if (direcao == colunas) {
                contexto.drawImage(corpoBaixo, x, y, tamanhoBloco, tamanhoBloco);
            }
        }

        else if (mapa[i] == 4) {
            if (direcao == 1) {
                contexto.drawImage(cabecaDireita, x, y, tamanhoBloco, tamanhoBloco);
            }
            else if (direcao == -1) {
                contexto.drawImage(cabecaEsquerda, x, y, tamanhoBloco, tamanhoBloco);
            }
            else if (direcao == -colunas) {
                contexto.drawImage(cabecaCima, x, y, tamanhoBloco, tamanhoBloco);
            }
            else if (direcao == colunas) {
                contexto.drawImage(cabecaBaixo, x, y, tamanhoBloco, tamanhoBloco);
            }
        }

        else if (mapa[i] == 5) {
            contexto.drawImage(comidas[Math.floor(Math.random()*2)], x, y, tamanhoBloco, tamanhoBloco);
        }
    }
}

function mudarDirecao(e) {

    if (e.key == "ArrowUp" && direcao != colunas) {
        direcao = -colunas;
    }
    else if (e.key == "ArrowDown" && direcao != -colunas) {
        direcao = colunas;
    }
    else if (e.key == "ArrowLeft" && direcao != 1) {
        direcao = -1;
    }
    else if (e.key == "ArrowRight" && direcao != -1) {
        direcao = 1;
    }
}

function moverCobra() {

    let novaCabeca = snake[snake.length - 1] + direcao;

    snake.push(novaCabeca);
    snake.shift();
}

function atualizarMapa() {

    for (let i = 0; i < linhas * colunas; i++) {
        if (mapa[i] == 2 || mapa[i] == 3 || mapa[i] == 4) {
            mapa[i] = 0;
        }
    }

    for (let i = 0; i < snake.length; i++) {

        if (i == 0) {
            mapa[snake[i]] = 2;
        }
        else if (i == snake.length - 1) {
            mapa[snake[i]] = 4;
        }
        else {
            mapa[snake[i]] = 3;
        }
    }
}

function gameLoop() {

    moverCobra();
    atualizarMapa();

    contexto.clearRect(0, 0, larguraTabuleiro, alturaTabuleiro);
    carregarMapa();
}