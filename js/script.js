const main = {
    tela: document.getElementById('tela'),

    numero: [
        document.getElementById('num0'),
        document.getElementById('num1'),
        document.getElementById('num2'),
        document.getElementById('num3'),
        document.getElementById('num4'),
        document.getElementById('num5'),
        document.getElementById('num6'),
        document.getElementById('num7'),
        document.getElementById('num8'),
        document.getElementById('num9'),
    ],

    operadores: {
        clear: document.getElementById('clear'),
        apagarCaractere: document.getElementById('apagarCaractere'),
        porcentagem: document.getElementById('porcentagem'),
        soma: document.getElementById('soma'),
        subtracao: document.getElementById('subtracao'),
        multiplicacao: document.getElementById('multiplicacao'),
        divisao: document.getElementById('divisao'),
        inverterSinal: document.getElementById('inverterSinal'),
        virgula: document.getElementById('virgula'),
        igual: document.getElementById('igual')
    }
}

const guardarExpressao = []

//Adicionando listeners em todos os botões de números
for (let pos in main.numero) {
    main.numero[pos].addEventListener('click',() => funcaoGeral(pos))
}

//Adicionando listeners nos botões de operação que vão ser exibidos na tela
main.operadores.soma.addEventListener('click',() => funcaoGeral('+'))
main.operadores.subtracao.addEventListener('click',() => funcaoGeral('-'))
main.operadores.divisao.addEventListener('click',() => funcaoGeral('/'))
main.operadores.multiplicacao.addEventListener('click',() => funcaoGeral('x'))
main.operadores.porcentagem.addEventListener('click',() => funcaoGeral('%'))
main.operadores.inverterSinal.addEventListener('click',() => funcaoGeral(''))
main.operadores.virgula.addEventListener('click',() => funcaoGeral(','))

function verificarTipo(valor) { 
//identifica se o parâmetro se refere a um número ou a um operador

    if (isNaN(Number(valor))) {
        return 'operador'
    } else {
        return 'numero'
    }

}

function exibirNaTela(valor) {
    // Esse if serve para verificar se o botão clicado foi um operador
    if (verificarTipo(valor) == 'operador') { //Anotar sobre isNaN
        main.tela.innerHTML += valor 
    } else {
        if (main.tela.innerHTML == 0) {
        main.tela.innerHTML = null
        }
    
        main.tela.innerHTML += valor
    }

    
}


function funcaoGeral(valor) {
    //Diferenciando o tipo primitivo do 'valor' a depender se 'valor' se refere a um número(number) ou a um operador(string)
    if (verificarTipo(valor) == 'numero') {
        guardarExpressao.push(Number(valor))    
    } else {
        guardarExpressao.push(valor)
    }
    
    //Condicional para impedir que um operador apareça mais de uma vez seguida na tela (++,---,// e etc.)
    if (typeof guardarExpressao[guardarExpressao.length-1] == 'string' && typeof guardarExpressao[guardarExpressao.length-2] == 'string') {
        guardarExpressao.splice(guardarExpressao.length-1,1)       
    } else {
        exibirNaTela(valor) 
    }


}




