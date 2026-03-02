let tabuleiro;
const colunas = 17;
const linhas = 15;
const tamanhoBloco = 32;
const larguraTabuleiro = colunas * tamanhoBloco;
const alturaTabuleiro = linhas * tamanhoBloco;
let contexto;
const mapa = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,2,2,3,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
];

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
    bloco.src = "../sprites/bloco.png";
    cabeca = new Image();
    cabeca.src = "../sprites/cabecaCobra.png";
    corpo = new Image();
    corpo.src = "../sprites/corpoCobra.png";
    comida = new Image();
    comida.src = "../sprites/comida.png";
}

function gerarComida() {
    
    let posComida = Math.floor(Math.random() * 256);
    
    while (mapa[posComida] != 0) {
        posComida = Math.floor(Math.random() * 256);
    }

    mapa[posComida] = 4;
}

function carregarMapa() {

    for (let i = 0; i < (linhas * colunas); i++) {
        
        const y = (Math.floor(i/colunas)) * tamanhoBloco;
        const x = (i%colunas) * tamanhoBloco;

        if (mapa[i] == 1) {
            contexto.drawImage(bloco, x, y, tamanhoBloco, tamanhoBloco);
        }
        
        else if (mapa[i] == 2) {
            contexto.drawImage(corpo, x, y, tamanhoBloco, tamanhoBloco);
        }

        else if (mapa[i] == 3) {
            contexto.drawImage(cabeca, x, y, tamanhoBloco, tamanhoBloco);
        }

        else if (mapa[i] == 4) {
            contexto.drawImage(comida, x, y, tamanhoBloco, tamanhoBloco);
        }
    }
}

/*class Entidade {

    constructor(imagem, x, y, altura, largura) {

        this.imagem = imagem;
        this.x = x;
        this.y = y;
        this.altura = altura;
        this.largura = largura;
    }
}*/