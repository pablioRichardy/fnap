const MAX_TEMPO_GERAR_INIMIGO = 10;
const MIN_TEMPO_GERAR_INIMIGO = 1;

const CAMINHO_PSS_ESQUERDA = "sons/pss_esquerda.mp3";
const CAMINHO_PSS_DIREITA = "sons/pss_direita.mp3";
const CAMINHO_JUMPSCARE = "sons/scared_jumpscare.mp3";

const INIMIGO_DIREITA = document.getElementById("inimigo-direita");
const INIMIGO_ESQUERDA = document.getElementById("inimigo-esquerda");
const INIMIGO_DIREITA_COLISAO = document.getElementById("inimigo-direita-colisao");
const INIMIGO_ESQUERDA_COLISAO = document.getElementById("inimigo-esquerda-colisao");

const INIMIGOS = {
    0: {
        "sprite": INIMIGO_ESQUERDA,
        "colisao": INIMIGO_ESQUERDA_COLISAO,
        "audio": `<audio controls style="display: none;" autoplay id="sound-inimigo-esquerda" volume="1"><source src="${CAMINHO_PSS_ESQUERDA}" type="audio/mp3"></audio>`,
        "faixa-audio": document.querySelector("#audio-inimigo-esquerda")
    },
    1: {
        "sprite": INIMIGO_DIREITA,
        "colisao": INIMIGO_DIREITA_COLISAO,
        "audio": `<audio controls style="display: none;" autoplay id="sound-inimigo-direita" volume="1"><source src="${CAMINHO_PSS_DIREITA}" type="audio/mp3"></audio>`,
        "faixa-audio": document.querySelector("#audio-inimigo-direita")
    }
};

var contadorTempoInimigo = gerarIntervaloInimigo();

function gerarIntervaloInimigo(){
    return Math.floor(Math.random() * (MAX_TEMPO_GERAR_INIMIGO - MIN_TEMPO_GERAR_INIMIGO) + MIN_TEMPO_GERAR_INIMIGO);
}

export function gerarInimigo(){
    if( contadorTempoInimigo <= 0 ) {
        const INIMIGO_ESCOLHIDO = Math.floor(Math.random() * 2);
        
        INIMIGOS[INIMIGO_ESCOLHIDO]["sprite"].style.opacity = "1";
        INIMIGOS[INIMIGO_ESCOLHIDO]["colisao"].style.opacity = "1";
        INIMIGOS[INIMIGO_ESCOLHIDO]["faixa-audio"].innerHTML = INIMIGOS[INIMIGO_ESCOLHIDO]["audio"];

        contadorTempoInimigo = gerarIntervaloInimigo();
    }
}

export function decrementarTempoInimigo( dt ){
    contadorTempoInimigo -= dt;
}