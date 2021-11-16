const dizerNome = prompt("Qual o seu nome?");

function carregarPagina() {

    //Fazer a requisição para o servidor.
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");

    let mensagens = [];

    function formatarMensagem(resposta){
        console.log(resposta);
        mensagens = resposta.data;

        const ulMensagem = document.querySelector(".lista-mensagem");
        ulMensagem.innerHTML = '';
        for(let i=0; i<mensagens.length; i++){
            const mensagem = mensagens[i];

            if(mensagem.type === 'status'){
            ulMensagem.innerHTML += 
            `
            <li class="mensagem status">
            <span>
            <span class="texto-transparente">(${mensagem.time})</span>
            <span class="texto-negrito">${mensagem.from}</span> para 
            <span class="texto-negrito">${mensagem.to}</span>:
            <span class= "texto-mensagens">${mensagem.text}</span></span>
            </span>
            </li>
            `;
            window.scroll(0, document.body.scrollHeight);
            }

            else if(mensagem.type === 'private_message'){
                ulMensagem.innerHTML += 
                `
                <li class="mensagem reservada">
                <span>
                <span class="texto-transparente">(${mensagem.time})</span>
                <span class="texto-negrito">${mensagem.from}</span> para 
                <span class="texto-negrito">${mensagem.to}</span>:
                <span class="texto-mensagens">${mensagem.text}</span></span>
                </span>
                </li>
                `;
                console.log(mensagem);
                window.scroll(0, document.body.scrollHeight);                
            }

            else {
                ulMensagem.innerHTML += 
                `
                <li class="mensagem">
                <span>
                <span class="texto-transparente">(${mensagem.time})</span>
                <span class="texto-negrito">${mensagem.from}</span> para 
                <span class="texto-negrito">${mensagem.to}</span>:
                <span class="texto-mensagens">${mensagem.text}</span></span>
                </span>
                </li>
                `;
                window.scroll(0, document.body.scrollHeight);
            }

        }
     }

    promise.then(formatarMensagem);

}
carregarPagina();

function entrarSala(){
    const nome = {
        name: dizerNome
    };

    const requisicao = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants ", nome);

    function tratarSucesso(respostaSucesso){
      console.log(respostaSucesso);
      recarregarPagina();
    }

    function tratarErro(respostaErro){
        console.log("está dando erro meu caro");
    }
  
    requisicao.then(tratarSucesso);
    requisicao.catch(tratarErro);
}
entrarSala();


function mensagemSucesso(resposta){
    const ulMensagem = document.querySelector(".lista-mensagem");
    const mensagem = resposta.data;

   formatarMensagem();
}

function enviarMensagem(){
    const requisito = {
        input: document.querySelector('.inputMensagem')
    }
    const mensagem = requisito.input.value;
    console.log(mensagem);
    
    const chat = {
        user: ""
    };
    const enviandoMensagem = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages", {
        from: chat.user,
        to: "Todos",
        text: mensagem,
        type: "message"
    });

    enviandoMensagem.then(mensagemSucesso);
}


function tratandoSucesso(resposta){
    console.log("Tá tudo certinho");
}

function tratandoErro(resposta){
    console.log("Tá tudo errado meu caro");
}

function postStatus(){
    const enviarStatus = axios.post("https://mock-api.driven.com.br/api/v4/uol/status", {'name': dizerNome});
    enviarStatus.then(tratandoSucesso);
    enviarStatus.catch(tratandoErro);
}

function recarregarPagina(){
  carregarPagina();
  setInterval(postStatus, 5000);
  setInterval(carregarPagina, 3000);
}