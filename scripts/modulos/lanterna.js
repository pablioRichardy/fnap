const BATERIA_LIMITE_MAXIMO = 10;
const BATERIA_LIMITE_MINIMO = 0;

const DESGASTE_LANTERNA = 1;

const LUZ = document.querySelector("#luz");
const LUZ_COLISAO = document.querySelector("#luz-colisao");

const BATERIA = document.querySelector("#bateria");

var tempoDecorridoLanterna = DESGASTE_LANTERNA;

export function ligaLanterna(){
    LUZ.style.opacity = "1";
}

export function desligaLanterna(){
    LUZ.style.opacity = "0";
}

export function lanternaLigada(){
    return LUZ.style.opacity == "1";
}

export function descarregarLanterna( dt ){
    const CARGA_LANTERNA = parseInt(BATERIA.innerText);
    const ESTA_VAZIO = parseInt(BATERIA.innerText) == 0;

    if(ESTA_VAZIO){
        desligaLanterna();
        return;
    }

    tempoDecorridoLanterna -= dt;

    if(tempoDecorridoLanterna > 0)
        return;

    tempoDecorridoLanterna = DESGASTE_LANTERNA;

    BATERIA.innerText = CARGA_LANTERNA - 1;
}

export function moveLuz(event){
    const MOUSE_X = event.clientX;
    const MOUSE_Y = event.clientY;
    const LARGURA_TELA = document.querySelector("body").clientWidth;
    
    LUZ.style.left = MOUSE_X + 'px';
    LUZ.style.top = MOUSE_Y + 'px';
}