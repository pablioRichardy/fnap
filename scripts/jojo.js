import { gerarInimigo, decrementarTempoInimigo } from "./modulos/inimigo.js";
import { moveLuz, ligaLanterna, desligaLanterna, descarregarLanterna } from "./modulos/lanterna.js";

const TELA = document.querySelector("#tela");
const AUDIO_LAREIRA = document.querySelector("#lareira");
AUDIO_LAREIRA.volume = 0.15;

var ultimoTempo = performance.now();

function atualizar( dt ){
    decrementarTempoInimigo( dt );
    gerarInimigo();
    descarregarLanterna( dt );
}

function loop( tempoAtual ){
    const dt = ( tempoAtual - ultimoTempo ) / 1000;
    ultimoTempo = tempoAtual;

    atualizar( dt );
    requestAnimationFrame( loop );
}

TELA.addEventListener( "mousemove", moveLuz );
TELA.addEventListener( "mousedown", ligaLanterna );
TELA.addEventListener( "mouseup", desligaLanterna );

requestAnimationFrame( loop );
