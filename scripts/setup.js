function rotar(alvo, caminhoPagina, caminhoScript = null) {
    alvo.addEventListener("click", () => {
        fetch(caminhoPagina).then((response) => {
            return response.text();
        }).then((html) => {
            document.querySelector("#camera").innerHTML = html;
            if(caminhoScript)
                import (caminhoScript).then(() => {});
        });
    });
}

fetch("/cenas/menu.html").then((response) => {
    return response.text(); 
}).then((html) => {
    document.querySelector("#camera").innerHTML = html;

    rotar(document.getElementById("btn-jogar"), "/cenas/jogo.html", "./modulos/jogo.js");
    rotar(document.getElementById("btn-scoreboard"), "/cenas/scoreboard.html");
    rotar(document.getElementById("btn-creditos"), "/cenas/creditos.html");
});