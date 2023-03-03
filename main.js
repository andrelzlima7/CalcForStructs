//Exibir e fechar opção de calculo. 

const buttonShow = document.querySelectorAll('.buttonShow')
buttonShow.forEach(Element => Element.addEventListener('click', (event) =>{
    Element.parentElement.parentElement.children[2].classList.toggle('slide-in-blurred-top')

    Element.parentElement.children[0].classList.toggle('exitshow')
    Element.parentElement.children[1].classList.toggle('exitshow')
}))
//==============================================================================
// Funções de conversão de valor:

function converterMMtoM (valor){
    return valor /1000
}

function converterMM3toM3 (valor){
    return valor / 1000000000
}
//==============================================================================

function numeroPecas (valor1, valor2){
    return valor1/valor2
}

function totalUtilizado (valor1, valor2){
    return valor1 * valor2
}

function diferenca (valor1, valor2){
    return valor1 - valor2
}

function percentualPerda (valor1, valor2){
    return ((valor1/valor2) * 100).toFixed(2)
}
//===============================================================================
// ******************************Calculo Linear**********************************
// Local HTML de resultados:

const valorBrutoLinear = document.querySelector('#valorBrutoLinear')
const valorLiquidoLinear = document.querySelector('#valorLiquidoLinear')
const numeroDePecas = document.querySelector('#numeroDePecas')
const percentualPerdas = document.querySelector('#percentualPerdas')
//===============================================================================
//Calculo do Número de Peças linear:

function atualizarPercentPerdas(valor1){
    const comprimentoBrutoLinear = document.querySelector('#comprimentoBrutoLinear')
    const comprimentoLiquidoLinear = document.querySelector('#comprimentoLiquidoLinear')
   
    percentualPerdas.innerHTML = `${percentualPerda(diferenca(Number(comprimentoBrutoLinear.value), totalUtilizado(Number(comprimentoLiquidoLinear.value), valor1)), totalUtilizado(Number(comprimentoLiquidoLinear.value), valor1))} %`
}

let numPecas = ''
function fNumPecas(valor1, valor2){
    numPecas = Math.floor(valor1 / valor2)
    if(numPecas === Infinity){
        numeroDePecas.innerHTML = ""
    }else{
        numeroDePecas.innerHTML = numPecas
    }
    atualizarPercentPerdas(numPecas)
}

const checkbox = document.querySelectorAll('.checkbox')

function atualizarNumPecas (valor1, valor2){
    checkbox.forEach(() => {
        const element1 = checkbox[0]
        const element2 = checkbox[1]
        if(element1.checked === false && element2.checked === false){
            fNumPecas(valor1, valor2)
        }
        if(element1.checked === true && element2.checked === false){
            fNumPecas(valor1, (valor2 + Number(element1.value)))
        }
        if(element1.checked === false && element2.checked === true){
            fNumPecas((valor1 - Number(element2.value)), valor2)
        }
        if(element1.checked === true && element2.checked === true){
            fNumPecas((valor1 - Number(element2.value)), valor2 + Number(element1.value))
        }
    })

    checkbox.forEach(Element => Element.addEventListener('change', () =>{
        const vElement = Number(Element.value)
        const checkElement = Element.dataset.check
        if(Element.checked === true){
            if(checkElement === 'checkboxCorte3mm'){
                const parentElement = Element.parentElement.parentElement.children[1].children[0]
                if(parentElement.checked === true){
                    fNumPecas((valor1 - Number(parentElement.value)), (valor2 + vElement))
                }else{
                    fNumPecas(valor1, (valor2 + vElement))
                } 
            }
            if(checkElement === 'pegaCastanha'){
                const parentElement = Element.parentElement.parentElement.children[0].children[0]
                if(parentElement.checked === true){
                    fNumPecas((valor1 - vElement), (valor2 + Number(parentElement.value)))
                }else{
                    fNumPecas((valor1 - vElement), valor2)
                }
            }
        }if(Element.checked === false){
            if(checkElement === 'checkboxCorte3mm'){
                const parentElement = Element.parentElement.parentElement.children[1].children[0]
                if(parentElement.checked === true){
                    fNumPecas((valor1 - Number(parentElement.value)), valor2)
                }else{
                    fNumPecas(valor1, valor2)
                }
            }
            if(checkElement === 'pegaCastanha'){
                const parentElement = Element.parentElement.parentElement.children[0].children[0]
                if(parentElement.checked === true){
                    fNumPecas(valor1, (valor2 + Number(parentElement.value)))
                }else{
                    fNumPecas(valor1, valor2)
                }
            }
        }
    }))
}

const valorParaCalculoLinear = document.querySelectorAll('.valorParaCalculoLinear')
valorParaCalculoLinear.forEach(Element => Element.addEventListener('blur', () => {
    if(Element.dataset.type === 'comprimentoBruto'){
        const vBrutoLinear = converterMMtoM(Element.value).toFixed(4)
        valorBrutoLinear.innerHTML = `${vBrutoLinear.replace('.',',')} m`
        const vLiquido = converterMMtoM(Number(Element.parentElement.parentElement.children[1].children[1].value))
        atualizarNumPecas(Number(vBrutoLinear), vLiquido)
    }
    if(Element.dataset.type === 'comprimentoLiquido'){
        const vLiquidoLinear = converterMMtoM(Element.value).toFixed(4)
        valorLiquidoLinear.innerHTML =  `${vLiquidoLinear.replace('.',',')} m`
        const vBruto = converterMMtoM(Number(Element.parentElement.parentElement.children[0].children[1].value))
        atualizarNumPecas(vBruto, Number(vLiquidoLinear))
    }
}))
//===============================================================================
// *************************Calculo Metros Quadrados*****************************
//Local HTML de Resultados:
const valorBrutoMQ = document.querySelector('#valorBrutoMQ')
const valorLiquidoMQ = document.querySelector('#valorLiquidoMQ')
const numeroDePecasMQ1 = document.querySelector('#numeroDePecasMQ1')
const numeroDePecasMQ2 = document.querySelector('#numeroDePecasMQ2')
const percentualPerdasMQ1 = document.querySelector('#percentualPerdasMQ1')
const percentualPerdasMQ2 = document.querySelector('#percentualPerdasMQ2')
const percentualPerdasMQAlt = document.querySelector('#percentualPerdasMQAlt')
//===============================================================================

let numPecasMQ = ''
function fNumPecasMQ (valor1 , valor2){
    return numPecasMQ = Math.floor(valor1 / valor2)
}

function percentPerdaMQ(v1, v2, v3){
    return percentualPerda(diferenca(v1, v2), v3)
}

const valorParaCalculoMQ = document.querySelectorAll('.valorParaCalculoMQ')
valorParaCalculoMQ.forEach(Element => Element.addEventListener('blur', () => {

    const comprimentoBrutoMQ = Number(document.querySelector('#comprimentoBrutoMQ').value)
    const larguraBrutoMQ = Number(document.querySelector('#larguraBrutoMQ').value)
    const comprimentoLiquidoMQ = Number(document.querySelector('#comprimentoLiquidoMQ').value)
    const larguraLiquidoMQ = Number(document.querySelector('#larguraLiquidoMQ').value)

    function atualizarNPecasMQ (){
        const corte11 = fNumPecasMQ(comprimentoBrutoMQ, comprimentoLiquidoMQ)
        const corte12 = fNumPecasMQ(larguraBrutoMQ, larguraLiquidoMQ)
        const corte21 = fNumPecasMQ(comprimentoBrutoMQ, larguraLiquidoMQ)
        const corte22 = fNumPecasMQ(larguraBrutoMQ, comprimentoLiquidoMQ)

        if(corte11 === Infinity || corte12 === Infinity || corte21 === Infinity || corte22 === Infinity){
            numeroDePecasMQ1.innerHTML = ''
            numeroDePecasMQ2.innerHTML = ''
        }else{
            numeroDePecasMQ1.innerHTML = corte11 * corte12
            numeroDePecasMQ2.innerHTML = corte21 * corte22
        }
        
        const brutoMQ = comprimentoBrutoMQ * larguraBrutoMQ
        const liquidoMQ = comprimentoLiquidoMQ * larguraLiquidoMQ
        const totalUtilizado1 = Number(numeroDePecasMQ1.innerHTML) * liquidoMQ
        const totalUtilizado2 = Number(numeroDePecasMQ2.innerHTML) * liquidoMQ
        const numeroDePecasAltMQ = document.querySelector("#numeroDePecasAltMQ")
        const totalUtilizadoAlt = numeroDePecasAltMQ.value * liquidoMQ
        
        percentualPerdasMQ1.innerHTML = `${percentPerdaMQ(converterMMtoM(brutoMQ), converterMMtoM(totalUtilizado1), converterMMtoM(totalUtilizado1))} %` 

        percentualPerdasMQ2.innerHTML = `${percentPerdaMQ(converterMMtoM(brutoMQ), converterMMtoM(totalUtilizado2), converterMMtoM(totalUtilizado2))} %` 

        percentualPerdasMQAlt.innerHTML = `${percentPerdaMQ(converterMMtoM(brutoMQ), converterMMtoM(totalUtilizadoAlt), converterMMtoM(totalUtilizadoAlt))} %` 

        if(Number(numeroDePecasMQ1.innerHTML) > Number(numeroDePecasMQ2.innerHTML)){
            numeroDePecasMQ1.parentElement.parentElement.style = "border-color: #689F38";
            numeroDePecasMQ2.parentElement.parentElement.style = "border-color: #ff0000";
        }if(Number(numeroDePecasMQ1.innerHTML) < Number(numeroDePecasMQ2.innerHTML)){
            numeroDePecasMQ2.parentElement.parentElement.style = "border-color: #689F38";
            numeroDePecasMQ1.parentElement.parentElement.style = "border-color: #ff0000";
        }
    }

    if(Element.dataset.type === 'comprimentoBrutoMQ'){
        const vComprimentoBrutoMQ = converterMMtoM(Element.value).toFixed(4)
        const vLarguraBrutoMQ = Element.parentElement.children[3].value
        
        const vBrutoMQ = vComprimentoBrutoMQ * vLarguraBrutoMQ
        const vBrutoMQConvertido = converterMMtoM(vBrutoMQ).toFixed(4)
        valorBrutoMQ.innerHTML = `${vBrutoMQConvertido.replace('.',',')} m²`
        
        atualizarNPecasMQ()
    }
    if(Element.dataset.type === 'larguraBrutoMQ'){
        const vLarguraBrutoMQ = converterMMtoM(Element.value).toFixed(4)
        const vComprimentoBrutoMQ = Element.parentElement.children[1].value
        
        const vBrutoMQ = vComprimentoBrutoMQ * vLarguraBrutoMQ
        const vBrutoMQConvertido = converterMMtoM(vBrutoMQ).toFixed(4)
        valorBrutoMQ.innerHTML = `${vBrutoMQConvertido.replace('.',',')} m²`

        atualizarNPecasMQ()
    }
    if(Element.dataset.type === 'comprimentoLiquidoMQ'){
        const vComprimentoLiquidoMQ = converterMMtoM(Element.value).toFixed(4)
        const vLarguraLiquidoMQ = Element.parentElement.children[3].value
        
        const vLiquidoMQ = vComprimentoLiquidoMQ * vLarguraLiquidoMQ
        const vLiquidoMQConvertido = converterMMtoM(vLiquidoMQ).toFixed(4)
        valorLiquidoMQ.innerHTML = `${vLiquidoMQConvertido.replace('.',',')} m²`

        atualizarNPecasMQ()
    }
    if(Element.dataset.type === 'larguraLiquidoMQ'){
        const vLarguraLiquidoMQ = converterMMtoM(Element.value).toFixed(4)
        const vComprimentoLiquidoMQ = Element.parentElement.children[1].value
        
        const vLiquidoMQ = vComprimentoLiquidoMQ * vLarguraLiquidoMQ
        const vLiquidoMQConvertido = converterMMtoM(vLiquidoMQ).toFixed(4)
        valorLiquidoMQ.innerHTML = `${vLiquidoMQConvertido.replace('.',',')} m²`

        atualizarNPecasMQ()
    }

    const numeroDePecasAltMQ = document.querySelector("#numeroDePecasAltMQ")
    numeroDePecasAltMQ.addEventListener('blur', () => {
        atualizarNPecasMQ()

        numeroDePecasAltMQ.parentElement.parentElement.style = 'border-color: #FBC02D'
    })
}))
//===============================================================================
// **************************Calculo Metros Cúbicos******************************
//Local HTML de Resultados:
const valorBrutoMC = document.querySelector('#valorBrutoMC')
const valorLiquidoMC = document.querySelector('#valorLiquidoMC')
const numeroDePecasMC = document.querySelector('#numeroDePecasMC')
const percentualPerdasMC = document.querySelector('#percentualPerdasMC')
const percentualPerdasMCAlt = document.querySelector('#percentualPerdasMCAlt')
//===============================================================================

const valorParaCalculoMC = document.querySelectorAll('.valorParaCalculoMC')
valorParaCalculoMC.forEach(Element => Element.addEventListener('blur', () => {
    
    const comprimentoBrutoMC = document.querySelector('#comprimentoBrutoMC')
    const larguraBrutoMC = document.querySelector('#larguraBrutoMC')
    const alturaBrutoMC = document.querySelector('#alturaBrutoMC')
    const comprimentoLiquidoMC = document.querySelector('#comprimentoLiquidoMC')
    const larguraLiquidoMC = document.querySelector('#larguraLiquidoMC')
    const alturaLiquidoMC = document.querySelector('#alturaLiquidoMC')

    function valorBruto(){
       return converterMMtoM(comprimentoBrutoMC.value) * converterMMtoM(larguraBrutoMC.value) * converterMMtoM(alturaBrutoMC.value)
    }

    function valorLiquido(){
        return converterMMtoM(comprimentoLiquidoMC.value) * converterMMtoM(larguraLiquidoMC.value) * converterMMtoM(alturaLiquidoMC.value)
    }

    const numeroDePecasMCAlt = document.querySelector('#numeroDePecasMCAlt')

    function atualizarPerdaMC (valor1, valor2){
        const vPerdaMC = percentualPerda(diferenca(valor1, totalUtilizado(Number(numeroDePecasMC.innerHTML), valor2)), totalUtilizado(Number(numeroDePecasMC.innerHTML), valor2))

        percentualPerdasMC.innerHTML = `${vPerdaMC} %`

        percentualPerdasMC.parentElement.parentElement.style = 'border-color: #689F38'

        const vPerdaAlt = percentualPerda(diferenca(valor1, totalUtilizado(numeroDePecasMCAlt.value, valor2)), totalUtilizado(numeroDePecasMCAlt.value, valor2))

        percentualPerdasMCAlt.innerHTML = `${vPerdaAlt} %`
    }

    if(Element.dataset.type === 'comprimentoBrutoMC'){
        const vBrutoMC = valorBruto()
        const vLiquidoMC = valorLiquido()

        valorBrutoMC.innerHTML = `${vBrutoMC.toFixed(6)} m³`
        const nPecasMC = comprimentoBrutoMC.value / comprimentoLiquidoMC.value
        if(nPecasMC === Infinity){
            numeroDePecasMC.innerHTML = 0
        }else{
            numeroDePecasMC.innerHTML = parseInt(nPecasMC)
        }

        atualizarPerdaMC(vBrutoMC, vLiquidoMC)
    }
    if(Element.dataset.type === 'larguraBrutoMC'){
        const vBrutoMC = valorBruto()
        const vLiquidoMC = valorLiquido()

        valorBrutoMC.innerHTML = `${vBrutoMC.toFixed(6)} m³`

        atualizarPerdaMC(vBrutoMC, vLiquidoMC)
    }
    if(Element.dataset.type === 'alturaBrutoMC'){
        const vBrutoMC = valorBruto()
        const vLiquidoMC = valorLiquido()

        valorBrutoMC.innerHTML = `${vBrutoMC.toFixed(6)} m³`

        atualizarPerdaMC(vBrutoMC, vLiquidoMC)
    }
    if(Element.dataset.type === 'comprimentoLiquidoMC'){
        const vBrutoMC = valorBruto()
        const vLiquidoMC = valorLiquido()

        valorLiquidoMC.innerHTML = `${vLiquidoMC.toFixed(6)} m³`
        const nPecasMC = comprimentoBrutoMC.value / comprimentoLiquidoMC.value
        if(nPecasMC === Infinity){
            numeroDePecasMC.innerHTML = 0
        }else{
            numeroDePecasMC.innerHTML = parseInt(nPecasMC)
        }

        atualizarPerdaMC(vBrutoMC, vLiquidoMC)
    }
    if(Element.dataset.type === 'larguraLiquidoMC'){
        const vBrutoMC = valorBruto()
        const vLiquidoMC = valorLiquido()

        valorLiquidoMC.innerHTML = `${vLiquidoMC.toFixed(6)} m³`

        atualizarPerdaMC(vBrutoMC, vLiquidoMC)
    }
    if(Element.dataset.type === 'alturaLiquidoMC'){
        const vBrutoMC = valorBruto()
        const vLiquidoMC = valorLiquido()

        valorLiquidoMC.innerHTML = `${vLiquidoMC.toFixed(6)} m³`
        atualizarPerdaMC(vBrutoMC, vLiquidoMC)
    }

    numeroDePecasMCAlt.addEventListener('blur', () => {
        const vBrutoMC = valorBruto()
        const vLiquidoMC = valorLiquido()

        atualizarPerdaMC(vBrutoMC, vLiquidoMC)

        numeroDePecasMCAlt.parentElement.parentElement.style = 'border-color: #FBC02D'
    })
}))