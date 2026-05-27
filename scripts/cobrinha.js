let larguraTela = window.innerWidth;
let alturaTela = window.innerHeight;

if (larguraTela >= alturaTela) {
    alturaTela -= 10
}
else {
    larguraTela -= 10
}

const colunas = 17;
const linhas = 15;
const tamanhoBloco = Math.floor(Math.min(larguraTela / colunas, alturaTela / linhas, 40));
const larguraTabuleiro = colunas * tamanhoBloco;
const alturaTabuleiro = linhas * tamanhoBloco;

let tabuleiro;
let contexto;
let direcao = 1;
let cobra = [[126, 1], [127, 1], [128, 1]];
let comidaAtual = null;
let pontos = 0;
let proximaDirecao = direcao;
let filaDirecoes = [];
let mapa = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
];

let comecoX;
let comecoY;
let fimX;
let fimY;
let tempoComeco;
let duracao;

window.onload = function() {
    
    tabuleiro = document.getElementById("tabuleiro");
    tabuleiro.height = alturaTabuleiro;
    tabuleiro.width = larguraTabuleiro;
    
    contexto = tabuleiro.getContext("2d");

    carregarImagens();
    gerarComida();

    document.getElementById("comecar").addEventListener("click", function () 
    {
        const dificuldade = document.querySelector('input[name="selec_dif"]:checked');

        if (dificuldade) {

            document.addEventListener('keydown', mudarDirecao), 
            document.addEventListener('pointerdown', (e) => {comecoX = e.clientX; comecoY = e.clientY; tempoComeco = performance.now()}), 
            document.addEventListener('pointerup', (e) => {fimX = e.clientX; fimY = e.clientY; duracao = performance.now() - tempoComeco; calculaGesto(duracao);})
        
            switch (dificuldade.value) {
                
                case ("facil"):
                    setInterval(loopPrincipal, 200);
                    break;
                
                case ("medio"):
                    setInterval(loopPrincipal, 150);
                    break;
                
                case ("dificil"):
                    setInterval(loopPrincipal, 100);
                    break;
            }
            
            desativarBotao();
        } 
        
        else {
            alert("Escolha uma dificuldade");
        }
    });

    return;
}

function desativarBotao() {

    var botao = document.getElementById("comecar");
    botao.setAttribute("disabled", "true");
    botao.style.backgroundColor = "#FF0000";
    botao.style.color = "#FFFFFF";
}

function calculaGesto(duracao) {
    
    const distanciaMinima = 50;
    const tempoMaximo = 300;

    const dx = fimX - comecoX;
    const dy = fimY - comecoY;
    const distancia = Math.sqrt((dx ** 2) + (dy ** 2));

    if (duracao > tempoMaximo) return;
    else if (distancia < distanciaMinima) return;

    mudarDirecao(dx, dy);
    return;
}

function carregarImagens() {
    
    bloco = new Image();
    
    cabeca = new Image();
    corpo = new Image();
    cauda = new Image();
    canto = new Image();
    
    maca = new Image();
    melancia = new Image();
    uva = new Image();
    
    bloco.src = "sprites/bloco.png";
    
    cabeca.src = "sprites/cabecaCobra.png";
    corpo.src = "sprites/corpoCobra.png";
    cauda.src = "sprites/caudaCobra.png";
    canto.src = "sprites/cantoCobra.png";
    
    maca.src = "sprites/maca.png";
    melancia.src = "sprites/melancia.png";
    uva.src = "sprites/uva.png"

    return;
}

function gerarComida() {
    
    let posComida = Math.floor(Math.random() * 256);
    
    while (mapa[posComida] != 0) {
        posComida = Math.floor(Math.random() * 256);
    }

    let sorteio = Math.floor(Math.random()*3);
    if (sorteio == 0) {
        comidaAtual = maca;
    }
    else if (sorteio == 1){
        comidaAtual = melancia;
    }
    else {
        comidaAtual = uva;
    }

    mapa[posComida] = 5;

    return;
}

function desenharMapa() {

    for (let i = 0; i < linhas * colunas; i++) {
        const y = (Math.floor(i/colunas)) * tamanhoBloco;
        const x = (i%colunas) * tamanhoBloco;
        
        if (mapa[i] == 1) {
            contexto.drawImage(bloco, x, y, tamanhoBloco, tamanhoBloco);
        }

        else if (mapa[i] == 5) {
            contexto.drawImage(comidaAtual, x, y, tamanhoBloco, tamanhoBloco);
        }
    }

    return;
}

function desenharCobra(){
    
    for (let i = 0; i < cobra.length; i++) {
        const y = (Math.floor(cobra[i][0]/colunas)) * tamanhoBloco;
        const x = (cobra[i][0]%colunas) * tamanhoBloco;
        const angulo90 = Math.PI / 2;

        if (cobra[i][1] == 1) rotacao = 0;
        else if (cobra[i][1] == -1) rotacao = angulo90 * 2;
        else if (cobra[i][1] == -colunas) rotacao = angulo90 * 3;
        else if (cobra[i][1] == colunas) rotacao = angulo90;

        contexto.save();
        contexto.translate(x + tamanhoBloco / 2, y + tamanhoBloco / 2);
        contexto.rotate(rotacao);
        
        if (i == 0){
            contexto.drawImage(cauda, -tamanhoBloco / 2, -tamanhoBloco / 2, tamanhoBloco, tamanhoBloco);
        }
        else if (i == cobra.length - 1){
            contexto.drawImage(cabeca, -tamanhoBloco / 2, -tamanhoBloco / 2, tamanhoBloco, tamanhoBloco);
        }
        else{
            if (cobra[i][1] != cobra[i+1][1]){
                const atual = cobra[i][1];
                const proximo = cobra[i+1][1];

                if (proximo == atual * colunas || proximo == -(atual / colunas)) {
                    contexto.scale(1, -1);
                }

                contexto.drawImage(canto, -tamanhoBloco / 2, -tamanhoBloco / 2, tamanhoBloco, tamanhoBloco);
            }
            else {
                contexto.drawImage(corpo, -tamanhoBloco / 2, -tamanhoBloco / 2, tamanhoBloco, tamanhoBloco);
            }
        }

        contexto.restore();
    }

    return;
}

function mudarDirecao(...args) {

    if (args.length == 1) {
        
        let e = args[0];

        if ((e.key == "ArrowUp" || e.key.toUpperCase() == "W") && direcao != colunas) proximaDirecao = -colunas;
        else if ((e.key == "ArrowDown" || e.key.toUpperCase() == "S") && direcao != -colunas) proximaDirecao = colunas;
        else if ((e.key == "ArrowLeft" || e.key.toUpperCase() == "A") && direcao != 1) proximaDirecao = -1;
        else if ((e.key == "ArrowRight" || e.key.toUpperCase() == "D") && direcao != -1) proximaDirecao = 1;

    }

    else if (args.length == 2) {
        
        let dx = args[0];
        let dy = args[1];

        if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > 0 && direcao != -1) proximaDirecao = 1;
            else if (dx < 0 && direcao != 1) proximaDirecao = -1;
        }

        else if (Math.abs(dx) < Math.abs(dy)) {
            if (dy > 0 && direcao != -colunas) proximaDirecao = colunas;
            else if (dy < 0 && direcao != colunas) proximaDirecao = -colunas;
        }
    }

    if (proximaDirecao == null) return;

    const ultima = filaDirecoes.length > 0 ? filaDirecoes[filaDirecoes.length - 1] : direcao;

    if (proximaDirecao != ultima) {
        filaDirecoes.push(proximaDirecao);
    }

    return;
}

function detectarColisao(novaCabeca) {
    return mapa[novaCabeca] == 1 || cobra.some(segmento => segmento[0] == novaCabeca);
}

function moverCobra() {
    
    if (filaDirecoes.length > 0) {
        direcao = filaDirecoes.shift();
    }
    let novaCabeca = cobra[cobra.length - 1][0] + direcao;

    if (detectarColisao(novaCabeca)) {
        return true;
    }

    if (mapa[novaCabeca] == 5) {
        if (comidaAtual == maca) {
            pontos += 10;
            atualizarPontos();
        }
        else {
            pontos += 30; //a melancia e a uva valem mais pontos pq sim :)
            atualizarPontos();
        }
        cobra.push([novaCabeca, direcao]);
        gerarComida();
    } else {
        cobra.push([novaCabeca, direcao]);
        cobra.shift();
        cobra[0][1] = cobra[1][1];
    }

    return false;
}

function atualizarMapa() {

    for (let i = 0; i < linhas * colunas; i++) {
        if (mapa[i] == 2 || mapa[i] == 3 || mapa[i] == 4) {
            mapa[i] = 0;
        }
    }

    for (let i = 0; i < cobra.length; i++) {

        if (i == 0) {
            mapa[cobra[i][0]] = 2;
        }
        else if (i == cobra.length - 1) {
            mapa[cobra[i][0]] = 4;
        }
        else {
            mapa[cobra[i][0]] = 3;
        }
    }

    return;
}

function atualizarPontos() {
    pontuacao = document.getElementById("pontuacao");
    pontuacao.textContent= "Pontos: " + Number(pontos).toString(); 
    return;
}

function loopPrincipal() {

    if (moverCobra()) location.reload();
    atualizarMapa();

    contexto.clearRect(0, 0, larguraTabuleiro, alturaTabuleiro);
    desenharMapa();
    desenharCobra();

    return;
}
