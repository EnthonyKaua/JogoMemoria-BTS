if(!localStorage.getItem("Nome do Jogador")){

    window.location.replace("https://enthonykaua.github.io/JogoMemoria-BTS/");

};

const mesa = document.querySelector(".mesa");
const botaoResetar = document.querySelector(".botaoRepetir");
const telaParabenizacao = document.querySelector(".parabenizacao");
const nomeJogador = document.querySelector(".nomeJogador");
const cabecalho = document.querySelector(".cabecalho");
const tempo = document.querySelector(".tempo");
var intervaloContagem;

const figuras = ["bts-grupo", "bts-logo", "member-jhope", "member-jimin", "member-jin", "member-jk", "member-rm", "member-suga", "member-v"];

const qnt = figuras.length * 2;

let primeiraCarta = "";
let segundaCarta = "";

function timer(){

    intervaloContagem = setInterval(() => {

        tempo.innerHTML = Number(tempo.innerHTML) + 1;

    }, 1000);

};

function resetarJogo(){

    //Limpar mesa
    mesa.innerHTML = "";

    //Passar tela parabenização para trás
    mesa.style.zIndex = 1000;
    telaParabenizacao.style.opacity = 0;
    telaParabenizacao.style.zIndex = 0;

    tempo.innerHTML = 0;
    
    carregarJogo();

};

function checarFinalGame(){

    const cartasAcertadas = document.querySelectorAll(".acertado");

    if(cartasAcertadas.length==qnt){

        //Pausar tempo
        clearInterval(intervaloContagem);

        //Passar tela parabenização para frente
        mesa.style.zIndex = 0;
        telaParabenizacao.style.opacity = 1;
        telaParabenizacao.style.zIndex = 1000;

    };

};

function validarAcerto(){

    const primeira = primeiraCarta.getAttribute("data-figura");
    const segunda = segundaCarta.getAttribute("data-figura");

    if(primeira==segunda){

        setTimeout(() => {

            primeiraCarta.firstChild.classList.add("acertado");
            segundaCarta.firstChild.classList.add("acertado");

            primeiraCarta = "";
            segundaCarta = "";

            checarFinalGame();

        }, 800);

    }

    else{

        setTimeout(() => {

            primeiraCarta.classList.remove("cartaRevelada");
            segundaCarta.classList.remove("cartaRevelada");

            primeiraCarta = "";
            segundaCarta = "";

        }, 800);

    };

};

function revelarCarta(){

    if(event.target.parentNode.className.includes("cartaRevelada")){

        return;

    };

    if(primeiraCarta==="" && event.target.parentNode.className.includes("carta")){

        event.target.parentNode.classList.add("cartaRevelada");
        primeiraCarta = event.target.parentNode;

    }

    else if(segundaCarta==="" && event.target.parentNode.className.includes("carta")){

        event.target.parentNode.classList.add("cartaRevelada");
        segundaCarta = event.target.parentNode;
        validarAcerto();

    };

};

function criarCartas(figura){

    //Criação dos elementos e adição de classes
    const carta = document.createElement("div");
    carta.className = "carta";
    const frente = document.createElement("div");
    frente.className = "parte frente";
    const verso = document.createElement("div");
    verso.className = "parte verso";

    //Adicionando imagem do membro à frente da carta
    frente.style.backgroundImage = `url(images/${figura}.jpg)`;

    //Adicionando atributo data-figura à carta
    carta.setAttribute("data-figura", `${figura}`)

    //Adicionando filhos
    carta.appendChild(frente);
    carta.appendChild(verso);

    //Adicionando o evento de revelar a carta
    carta.addEventListener("click", revelarCarta);
    
    return carta;

};

function carregarJogo(){

    //Duplicando as figuras e pegando de forma aleatória - "...figuras" espalha as figuras antes de adicionar
    const figurasDuplicadas = [...figuras, ...figuras].sort( () => Math.random() - 0.5);

    figurasDuplicadas.forEach((figura) => {
        
        let carta = criarCartas(figura);
        mesa.appendChild(carta);

    });

    timer();
    
};

botaoResetar.addEventListener("click", resetarJogo);

window.onload = () => {

    nomeJogador.innerHTML = localStorage.getItem("Nome do Jogador");
    carregarJogo();

};
