if(localStorage.getItem("playerOBJ"))
{
    let playerOBJ = JSON.parse(localStorage.getItem("playerOBJ"));
    console.log(playerOBJ);
    document.querySelector("#players > table > tbody").innerHTML += `<tr><th>${playerOBJ["player"]}</th><th>${playerOBJ["score"]}</th></tr>`;
}

const AUDIO_LAREIRA = document.querySelector("#lareira");
AUDIO_LAREIRA.volume = 0.15;
const BTN_MUTE = document.querySelector("#btn-mute");

const LUZ = document.querySelector("#luz");
const LUZ_COLISAO = document.querySelector("#luz-colisao");
const TELA = document.querySelector("#tela");

const BOSS_DIREITA = document.querySelector("#boss-direita");
const BOSS_ESQUERDA = document.querySelector("#boss-esquerda");
const BOSS_DIREITA_COLISAO = document.querySelector("#boss-direita-colisao");
const BOSS_ESQUERDA_COLISAO = document.querySelector("#boss-esquerda-colisao");

const PONTOS_INTERFACE = document.querySelector("#pontos");
const QUANTIDADE_GANKS = document.querySelector("#quantidade-ganks");

const BATERIA = document.querySelector("#bateria");

const BATERIA_LIMITE_MAXIMO = 10;
const BATERIA_LIMITE_MINIMO = 0;

const MIN_MILISEGUNDOS = 3000;
const MAX_MILISEGUNDOS = 10000;

let intervaloBoss = geraIntervaloBoss();
let contaTempoDecorridoLanterna;
let tempoDecorridoLanterna = 0;
let tempoBossVisivel = 0;
let gameOverTempo;

let controleDoJumpScare = false;
let foiVisto;

const CAMINHO_PSS_ESQUERDA = "sons/pss_esquerda.mp3";
const CAMINHO_PSS_DIREITA = "sons/pss_direita.mp3";
const CAMINHO_JUMPSCARE = "sons/scared_jumpscare.mp3";

const BOSSES = setInterval(
    () => {
        const BOSS = {
            0: {
                0: BOSS_ESQUERDA,
                1: BOSS_ESQUERDA_COLISAO,
                "audio": `<audio controls style="display: none;" autoplay id="sound-boss-esquerda" volume="1"><source src="${CAMINHO_PSS_ESQUERDA}" type="audio/mp3"></audio>`,
                "faixa-audio": document.querySelector("#audio-boss-esquerda")
            },
            1: {
                0: BOSS_DIREITA,
                1: BOSS_DIREITA_COLISAO,
                "audio": `<audio controls style="display: none;" autoplay id="sound-boss-direita" volume="1"><source src="${CAMINHO_PSS_DIREITA}" type="audio/mp3"></audio>`,
                "faixa-audio": document.querySelector("#audio-boss-direita")
            }
        };
        const BOSS_ESCOLHIDO = intervaloBoss % 2;

        BOSS[BOSS_ESCOLHIDO][0].style.opacity = "1";
        BOSS[BOSS_ESCOLHIDO][1].style.opacity = "1";

        BOSS[BOSS_ESCOLHIDO]["faixa-audio"].innerHTML = BOSS[BOSS_ESCOLHIDO]["audio"];
        
        setTimeout(
            () => {
                if(foiVisto)
                {
                    //gameOver();
                }
                BOSS_DIREITA.style.opacity = "0";
                BOSS_ESQUERDA.style.opacity = "0";
                BOSS_DIREITA_COLISAO.style.opacity = "0"
                BOSS_ESQUERDA_COLISAO.style.opacity = "0"
            }, 
            1500
        );

        foiVisto = true;
        intervaloBoss = geraIntervaloBoss();
        QUANTIDADE_GANKS.innerText = parseInt(QUANTIDADE_GANKS.innerText) + 1;
    }, 
    intervaloBoss
);

function geraIntervaloBoss()
{
    return Math.floor(Math.random() * (MAX_MILISEGUNDOS - MIN_MILISEGUNDOS) + MIN_MILISEGUNDOS);
}
function adicionaPonto()
{
    PONTOS_INTERFACE.innerText = parseInt(PONTOS_INTERFACE.innerText) + 1;
}
function estaColidindo()
{

    const AREA_COLISAO_BOSS_DIREITA = BOSS_DIREITA_COLISAO.getBoundingClientRect();
    const AREA_COLISAO_BOSS_ESQUERDA = BOSS_ESQUERDA_COLISAO.getBoundingClientRect();
    const AREA_LUZ_COLISAO = LUZ_COLISAO.getBoundingClientRect();
    
    const VISIVEL = "1";

    const LUZ_ESTA_LIGADA = LUZ.style.opacity == VISIVEL;
    const AREA_LUZ_COLISAO_DIREITA = AREA_LUZ_COLISAO.right;
    const AREA_LUZ_COLISAO_ESQUERDA = AREA_LUZ_COLISAO.left;

    const AREA_COLISAO_BOSS_ESQUERDA_LARGURA_MAX = Math.floor(AREA_COLISAO_BOSS_ESQUERDA.right);
    const AREA_COLISAO_BOSS_ESQUERDA_LARGURA_MIN = Math.floor(AREA_COLISAO_BOSS_ESQUERDA.left);
    const AREA_COLISAO_BOSS_DIREITA_LARGURA_MAX = Math.floor(AREA_COLISAO_BOSS_DIREITA.right);
    const AREA_COLISAO_BOSS_DIREITA_LARGURA_MIN = Math.floor(AREA_COLISAO_BOSS_DIREITA.left);

    const BOSS_DIREITA_VISIVEL = BOSS_DIREITA.style.opacity == VISIVEL;
    const BOSS_ESQUERDA_VISIVEL = BOSS_ESQUERDA.style.opacity == VISIVEL;

    if(
        (
            AREA_COLISAO_BOSS_ESQUERDA_LARGURA_MAX >= AREA_LUZ_COLISAO_ESQUERDA 
            && AREA_COLISAO_BOSS_ESQUERDA_LARGURA_MIN <= AREA_LUZ_COLISAO_ESQUERDA
        ) 
        && LUZ_ESTA_LIGADA
        && (BOSS_ESQUERDA_VISIVEL)
    )
    {
        foiVisto = false;
        adicionaPonto();
    }
    else if(
        (
            AREA_COLISAO_BOSS_DIREITA_LARGURA_MIN <= AREA_LUZ_COLISAO_DIREITA 
            && AREA_COLISAO_BOSS_DIREITA_LARGURA_MAX >= AREA_LUZ_COLISAO_DIREITA
        )
        && LUZ_ESTA_LIGADA 
        && (BOSS_DIREITA_VISIVEL)
    )
    {
        foiVisto = false;
        adicionaPonto();
    }
}
function moveLuz(event)
{
    const MOUSE_X = event.clientX;
    const MOUSE_Y = event.clientY;
    const LARGURA_TELA = document.querySelector("body").clientWidth;
    
    LUZ.style.left = MOUSE_X + 'px';
    LUZ.style.top = MOUSE_Y + 'px';
}
function mouseMove(event)
{
    moveLuz(event);
    estaColidindo();
}

function gastaLanterna() {
    const CARGA_LANTERNA = parseInt(BATERIA.innerText);

    const ESTA_VAZIO = parseInt(BATERIA.innerText) == 0;

    if(ESTA_VAZIO)
        return;


    BATERIA.innerText = CARGA_LANTERNA - 1;
}

function ligaLanterna()
{
    LUZ.style.opacity = "1";
    contaTempoDecorridoLanterna = setInterval(
        () => {
            if(tempoDecorridoLanterna >= 300)
            {
                tempoDecorridoLanterna = 0;
                gastaLanterna();
                return;
            }
            tempoDecorridoLanterna++;
        }, 1
    )
}

function desligaLanterna()
{
    LUZ.style.opacity = "0";
    clearInterval(contaTempoDecorridoLanterna);
}

function clickLanterna(element)
{
    if(element.target.className == "boss-colisao" && element.target.style.opacity == "1")
    {
        adicionaPonto();
    }
}

function gameOver()
{
    const IMG_JUMPSCARE = document.querySelector("#img-jumpscare");
    IMG_JUMPSCARE.style.display = "block";
    document.querySelector("body").innerHTML += `<audio controls style="display: none;" autoplay id="sound-jumpscare" volume="1"><source src="${CAMINHO_JUMPSCARE}" type="audio/mp3"></audio>`;
    setTimeout(
        () => { window.location.reload(true); },
        3000
    )
}

TELA.addEventListener("mousemove", mouseMove);
TELA.addEventListener("mousedown", ligaLanterna);
TELA.addEventListener("mouseup", desligaLanterna);
TELA.addEventListener("click", clickLanterna);

BTN_MUTE.addEventListener("click", () => {
    const ICON_SONG = document.querySelector("#icon-song");
    const ICON_MUTE = document.querySelector("#icon-mute");

    if(ICON_SONG.style.display == "none")
    {
        AUDIO_LAREIRA.volume = 0.15;
        ICON_SONG.style.display = "block";
        ICON_MUTE.style.display = "none";
        return;
    }
    AUDIO_LAREIRA.volume = 0.0;
    ICON_SONG.style.display = "none";
    ICON_MUTE.style.display = "block";
});

gameOverTempo = setInterval(
    () => {
        if(parseInt(BATERIA.innerText) == BATERIA_LIMITE_MINIMO && !controleDoJumpScare)
        {
            alert(`Parabéns! Você conseguiu ${PONTOS_INTERFACE.innerText} pontos!`);
            let nickname = prompt("Digite o seu nickname: ", "coloque aqui seu nickname...");
            while(nickname.length > 8)
            {
                alert("O nickname fornecido é maior que 8 caracteres! Por favor, digite novamente.");
                nickname = prompt("Digite o seu nickname: ", "coloque aqui seu nickname...");
            }
            localStorage.setItem("playerOBJ", JSON.stringify({"player": nickname, "score": PONTOS_INTERFACE.innerText}));
            //window.location.reload(true);
        }
    }, 300
)

