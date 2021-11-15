function carregarPagina() {

    //Fazer a requisição para o servidor.
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");

    let mensagens = [];

    function formatarMensagem(resposta){
        console.log(resposta);
        mensagens = resposta.data;

        const ulMensagem = document.querySelector(".texto-mensagem");
        for(let i=0; i<mensagens.length; i++){
            const mensagem = mensagens[i];

            ulMensagem.innerHTML += 
            `
            <li class="mensagem">
            <span>
            <span class="texto-transparente">(${mensagem.time})</span>
            <span class="texto-negrito">${mensagem.from}</span> para 
            <span class="texto-negrito">${mensagem.to}</span>:
            <span>${mensagem.type}</span></span>
            </li>
            `;
            window.scroll(0, document.body.scrollHeight);
        }
     }

    promise.then(formatarMensagem);

}
carregarPagina();

function entrarSala(){

    const nome = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", {'name': "Alberto"});
    console.log(nome);
   
    function tratarSucesso(resposta){
      recarregarPagina();
    }
  
    nome.then(tratarSucesso);
}

function enviarMensagem(){
    const input = document.querySelector(".inputMensagem");
    const mensagem = input.value;
    console.log(mensagem);

    const enviandoMensagem = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages", )
}


function post(){
    axios.post = ("https://mock-api.driven.com.br/api/v4/uol/status", {'name': "Alberto"});
}

function recarregarPagina(){
  carregarPagina();
  setInterval(post, 5000);
  setInterval(carregarPagina, 3000);
}