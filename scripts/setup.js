fetch("/cenas/menu.html").then((response) => {
    return response.text(); 
}).then((html) => {
    document.querySelector("#camera").innerHTML = html;

    document.getElementById("btn-jogar").addEventListener("click", () => {
        fetch("/cenas/jogo.html").then((response) => {
            return response.text();
        }).then((html) => {
            document.querySelector("#camera").innerHTML = html;
            import ('./modulos/jogo.js').then((modulo) => {
            });
        });
    });
});