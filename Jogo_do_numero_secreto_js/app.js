let listaDeNumerosSorteados = []
let numeroLimite = 10;
let numeroScreto = gerarNumeroAleatorio();
let tentativas = 1;



function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto; 
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }  
}

mensagemInicial();
function mensagemInicial(){
    exibirTextoNaTela('h1','Jogo do numero secreto' );
    exibirTextoNaTela('p',' Escolha um número entre 1 e 10');

}


function verificarChute(){
    let chute = document.querySelector('input').value ;
    
    if (chute == numeroScreto){
        exibirTextoNaTela('h1', 'Acertou miseravi');
        let palavraTentativa = tentativas > 1? 'tentativas': 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled')
    } else{
        if(chute > numeroScreto){
            exibirTextoNaTela('p','O número secreto é menor');
        }else{
            exibirTextoNaTela('p','O número secreto é maior.');
        }
        tentativas++
        LimparCampo()
    }
}
function gerarNumeroAleatorio() {
   let numeroEscolhido =  parseInt(Math.random() * numeroLimite + 1);
   let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

   if( quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
   }
   if(listaDeNumerosSorteados.includes(numeroEscolhido)){
    return gerarNumeroAleatorio();
   } else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;

   }
}

function LimparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroScreto = gerarNumeroAleatorio();
    LimparCampo();
    tentativas = 1;
   mensagemInicial()
   document.getElementById('reiniciar').setAttribute('disabled','true');

}