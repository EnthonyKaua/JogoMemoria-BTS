const inputJogador = document.querySelector("#nomeJogador");
const botaoLogin = document.querySelector(".botaoLogin");

function validarNome(){

    if(inputJogador.value.length<=20){

        if(inputJogador.value.length>=3){

            botaoLogin.removeAttribute('disabled');
            return;
    
        };
    
        botaoLogin.setAttribute('disabled', '');

    }

    else{

        inputJogador.value = inputJogador.value.slice(0, 20);

    };

};

function jogar(){

    event.preventDefault();
    localStorage.setItem("Nome do Jogador", inputJogador.value);

    window.location.replace("jogoMemoria.html")

};

inputJogador.addEventListener('input', validarNome);
botaoLogin.addEventListener('click', jogar);