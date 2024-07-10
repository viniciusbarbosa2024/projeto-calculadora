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

//Adicionando um listener em todos os botões de números
for (let pos in main.numero) {
    main.numero[pos].addEventListener('click',() => exibirNaTela(pos))
}

main.operadores.soma.addEventListener('click',exibirNaTela)
main.operadores.subtracao.addEventListener('click',exibirNaTela)
main.operadores.divisao.addEventListener('click',exibirNaTela)
main.operadores.multiplicacao.addEventListener('click',exibirNaTela)
main.operadores.porcentagem.addEventListener('click',exibirNaTela)
main.operadores.inverterSinal.addEventListener('click',exibirNaTela)
main.operadores.virgula.addEventListener('click',exibirNaTela)


function exibirNaTela(valor) {
    if (main.tela.innerHTML == 0) {
        main.tela.innerHTML = null
    }
    
    main.tela.innerHTML += valor

}