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

const guardarBotoesClicados = []

//Adicionando listeners em todos os botões de números
for (let pos in main.numero) {
    main.numero[pos].addEventListener('click',() => funcaoGeral(pos))
}

//Adicionando listeners nos botões de operação
main.operadores.soma.addEventListener('click',() => funcaoGeral('+'))
main.operadores.subtracao.addEventListener('click',() => funcaoGeral('-'))
main.operadores.divisao.addEventListener('click',() => funcaoGeral('/'))
main.operadores.multiplicacao.addEventListener('click',() => funcaoGeral('x'))
main.operadores.porcentagem.addEventListener('click',() => funcaoGeral('%'))
main.operadores.inverterSinal.addEventListener('click',() => funcaoGeral(''))
main.operadores.virgula.addEventListener('click',() => funcaoGeral(','))
main.operadores.igual.addEventListener('click',() => funcaoGeral('='))



function realizarOperação(expressão) {
    const multiplicacao = (a,b) => a*b
    const divisao = (a,b) => a/b
    const soma = (a,b) => a+b
    const subtracao = (a,b) => a-b
    
    //Verifica se há operações de multiplicação e de divisão na mesma expressão
    if (expressão.indexOf('x') != -1 && expressão.indexOf('/') != -1) {
        //Se sim,faz as operações na ordem correta (da esquerda para a direita)
        if (expressão.indexOf('x') < expressão.indexOf('/')) {
            expressão[expressão.indexOf('x') - 1] = multiplicacao(expressão[expressão.indexOf('x') - 1],expressão[expressão.indexOf('x') + 1])

            expressão.splice(expressão.indexOf('x'),2)

            return expressão
        } else {
            expressão[expressão.indexOf('/') - 1] = divisao(expressão[expressão.indexOf('/') - 1],expressão[expressão.indexOf('/') + 1])

            expressão.splice(expressão.indexOf('/'),2)

            return expressão
        }
    //Esse caso só ocorre se houver alguma operação de multiplicação e nenhuma de divisão
    } else if (expressão.indexOf('x') != -1) {
        expressão[expressão.indexOf('x') - 1] = multiplicacao(expressão[expressão.indexOf('x') - 1],expressão[expressão.indexOf('x') + 1])

        expressão.splice(expressão.indexOf('x'),2)

        return expressão
    //Esse caso só ocorre se houver alguma operação de divisão e nenhuma de multiplicação
    } else if (expressão.indexOf('/') != -1) {
        expressão[expressão.indexOf('/') - 1] = divisao(expressão[expressão.indexOf('/') - 1],expressão[expressão.indexOf('/') + 1])

        expressão.splice(expressão.indexOf('/'),2)

        return expressão
    //Esse caso só ocorre se não houver operações de multiplicação/divisão e houver operações de soma e de subtração
    } else if (expressão.indexOf('+') != -1 && expressão.indexOf('-')!= -1) {
        if (expressão.indexOf('+') < expressão.indexOf('-')) {
            expressão[expressão.indexOf('+') - 1] = soma(expressão[expressão.indexOf('+') - 1],expressão[expressão.indexOf('+') + 1])

            expressão.splice(expressão.indexOf('+'),2)

            return expressão
        } else {
            expressão[expressão.indexOf('-') - 1] = subtracao(expressão[expressão.indexOf('-') - 1],expressão[expressão.indexOf('-') + 1])

            expressão.splice(expressão.indexOf('-'),2)

            return expressão
        }
    //Esse caso só ocorre se não houver operações de multiplicação/divisão e houver apenas operações de soma
    } else if (expressão.indexOf('+') != -1) {
        expressão[expressão.indexOf('+') - 1] = soma(expressão[expressão.indexOf('+') - 1],expressão[expressão.indexOf('+') + 1])

        expressão.splice(expressão.indexOf('+'),2)

        return expressão
    //Esse caso só ocorre se não houver operações de multiplicação/divisão e houver apenas operações de subtração
    } else if (expressão.indexOf('-')!= -1) {
        expressão[expressão.indexOf('-') - 1] = subtracao(expressão[expressão.indexOf('-') - 1],expressão[expressão.indexOf('-') + 1])

        expressão.splice(expressão.indexOf('-'),2)

        return expressão
    }

    
    
}

function identificarExpressao(botoesClicados) {
    let formadorDeNumero = ''
    let expressão = []

    //Análise da expressão / identificação dos números e dos operadores
    for (let pos in botoesClicados) {
        if (typeof botoesClicados[pos] == 'number') {
            formadorDeNumero += String(botoesClicados[pos])
        } else {
            expressão.push(Number(formadorDeNumero))
            expressão.push(botoesClicados[pos])
            formadorDeNumero = ''    
        }
    }    
    
    //Retorna o array da expressão quando o botão igual é clicado
    if (expressão[expressão.length - 1] == '=') {
        expressão.splice(expressão.length - 1,1)
        return expressão
    }
    
}

function verificarTipo(valor) { 
//identifica se o parâmetro se refere a um número ou a um operador

    if (isNaN(Number(valor))) { //Anotar sobre isNaN
        return 'operador'
    } else {
        return 'numero'
    }

}

function exibirNaTela(valor) {
    // Esse if serve para verificar se o botão clicado foi um operador
    if (verificarTipo(valor) == 'operador') { 
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
        guardarBotoesClicados.push(Number(valor))    
    } else {
        guardarBotoesClicados.push(valor)
    }
    
    //Condicional para impedir que um operador apareça mais de uma vez seguida na tela (++,---,// e etc.)
    if (typeof guardarBotoesClicados[guardarBotoesClicados.length-1] == 'string' && typeof guardarBotoesClicados[guardarBotoesClicados.length-2] == 'string') {
        guardarBotoesClicados.splice(guardarBotoesClicados.length-1,1) //impede que a expressão seja guardada com dois operadores seguidos       
    } else {
        let expressão = identificarExpressao(guardarBotoesClicados)
        //Exibe os botões clicados enquanto o botão '=' não é clicado
        if (expressão == undefined) {
            exibirNaTela(valor)
        } else {
            let resultadoDaOperação = realizarOperação(expressão)
            
            while (resultadoDaOperação.length != 1) {
                resultadoDaOperação = realizarOperação(resultadoDaOperação)
            }

            window.alert(resultadoDaOperação)
        }
        
         
    }

    

}




