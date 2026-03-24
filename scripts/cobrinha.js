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
let cobra = [126, 127, 128];
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
    
    cabeca = new Image();
    corpo = new Image();
    cauda = new Image();
    canto = new Image();
    
    maca = new Image();
    melancia = new Image();
    
    bloco.src = "../sprites/bloco.png";
    
    cabeca.src = "../sprites/cabecaCobra.png";
    corpo.src = "../sprites/corpoCobra.png";
    cauda.src = "../sprites/caudaCobra.png";
    canto.src = "../sprites/cantoCobra.png";
    
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
        const angulo90 = Math.PI / 2;

        if (direcao == 1) rotacao = 0;
        else if (direcao == -1) rotacao = angulo90 * 2;
        else if (direcao == -colunas) rotacao = angulo90 * 3;
        else if (direcao == colunas) rotacao = angulo90;

        if (mapa[i] == 1) {
            contexto.drawImage(bloco, x, y, tamanhoBloco, tamanhoBloco);
        }
        
        else if (mapa[i] == 2) {
            contexto.save();
            contexto.translate(x + tamanhoBloco / 2, y + tamanhoBloco / 2);
            contexto.rotate(rotacao);
            contexto.drawImage(cauda, -tamanhoBloco / 2, -tamanhoBloco / 2, tamanhoBloco, tamanhoBloco);
            contexto.restore();
        }

        else if (mapa[i] == 3) {

            for(let j = 1; j < cobra.length - 1; j++){
                let anterior = cobra[j-1];
                let atual = cobra[j];
                let proximo = cobra[j+1];

                let dir1 = anterior - atual;
                let dir2 = atual - proximo;

                if (dir1 === dir2) {
                    contexto.save();
                    contexto.translate(x + tamanhoBloco / 2, y + tamanhoBloco / 2);
                    contexto.rotate(rotacao);
                    contexto.drawImage(corpo, -tamanhoBloco / 2, -tamanhoBloco / 2, tamanhoBloco, tamanhoBloco);
                    contexto.restore();
                }

                else {
                    if ((dir1 === 1 && dir2 === colunas) || (dir1 === colunas && dir2 === 1)) {
                    }

                    else if ((dir1 === -1 && dir2 === colunas) || (dir1 === colunas && dir2 === -1)) {  
                    }

                    else if ((dir1 === -1 && dir2 === -colunas) || (dir1 === -colunas && dir2 === -1)) {
                    }

                    else if ((dir1 === 1 && dir2 === -colunas) || (dir1 === -colunas && dir2 === 1)) {
                    }
                }
            }
        }

        else if (mapa[i] == 4) {
            contexto.save();
            contexto.translate(x + tamanhoBloco / 2, y + tamanhoBloco / 2);
            contexto.rotate(rotacao);
            contexto.drawImage(cabeca, -tamanhoBloco / 2, -tamanhoBloco / 2, tamanhoBloco, tamanhoBloco);
            contexto.restore();
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

function detectarColisao(novaCabeca) {
    return mapa[novaCabeca] == 1 || cobra.includes(novaCabeca);
}

function moverCobra() {

    let novaCabeca = cobra[cobra.length - 1] + direcao;

    if (detectarColisao(novaCabeca)) {

        alert("Fim de Jogo!");
        location.reload();
    }

    if (mapa[novaCabeca] == 5) {
        cobra.push(novaCabeca);
        gerarComida();
    } else {
        cobra.push(novaCabeca);
        cobra.shift();
    }
}

function atualizarMapa() {

    for (let i = 0; i < linhas * colunas; i++) {
        if (mapa[i] == 2 || mapa[i] == 3 || mapa[i] == 4) {
            mapa[i] = 0;
        }
    }

    for (let i = 0; i < cobra.length; i++) {

        if (i == 0) {
            mapa[cobra[i]] = 2;
        }
        else if (i == cobra.length - 1) {
            mapa[cobra[i]] = 4;
        }
        else {
            mapa[cobra[i]] = 3;
        }
    }
}

function loopPrincipal() {

    moverCobra();
    atualizarMapa();

    contexto.clearRect(0, 0, larguraTabuleiro, alturaTabuleiro);
    carregarMapa();
}