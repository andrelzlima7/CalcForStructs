import React, { useState } from "react";
import './AreaCalculos.css'
import { Card } from "../../Global/Card";
import {RxDimensions} from 'react-icons/rx'
import {BiRuler, BiCube} from 'react-icons/bi'
import { Calculos } from "./Calculos";
import { TabelaAreaCalculos } from "./TabelaAreaCalculos";
import { CriarTabela } from "./CriarTabela";
import { Button } from "../../Global/Button";

export const AreaCalculos = () => {
    const [cardLinear, setCardLinear] = useState(false)
    const [cardArea, setCardArea] = useState(false)
    const [cardVolume, setCardVolume] = useState(false)

    const [inputComp, setInputComp] = useState('')
    const [inputLarg, setInputLarg] = useState('')
    const [inputAlt, setInputAlt] = useState('')
    const [inputCompLi, setInputCompLi] = useState('')
    const [inputLargLi, setInputLargLi] = useState('')
    const [inputAltLi, setInputAltLi] = useState('')

    const [corte3mmCheckbox, setCorte3mmCheckbox] = useState()
    const stateCorte3mmCheckbox = () => {
        setCorte3mmCheckbox(!corte3mmCheckbox)
    }

    const [cortePincaInputComp, setCortPincaInputComp] = useState(0)
    const valorPinca = (event) =>{
        setCortPincaInputComp(event.target.value)
    }

    const [numerosPecasAlternativo, setNumerosPecasAlternativo] = useState('')
    const nPecasAlt = (event) =>{
        event.preventDefault()
        const {value} = event.target;
        setNumerosPecasAlternativo(value)
    }
    
    const cardSelectLinear = (event) =>{
        event.preventDefault()
        setCardLinear(!cardLinear)
        setCardArea(false)
        setCardVolume(false)
        setInputComp('')
        setInputLarg('')
        setInputAlt('')
        setInputCompLi('')
        setInputLargLi('')
        setInputAltLi('')
        setCortPincaInputComp(0)
        setNumerosPecasAlternativo('')
    }

    const cardSelectArea = (event) =>{
        event.preventDefault()
        setCardArea(!cardArea)
        setCardVolume(false)
        setCardLinear(false)
        setCorte3mmCheckbox(false)
        setInputComp('')
        setInputLarg('')
        setInputAlt('')
        setInputCompLi('')
        setInputLargLi('')
        setInputAltLi('')
        setCortPincaInputComp(0)
        setNumerosPecasAlternativo('')
    }

    const cardSelectVomule = (event) =>{
        event.preventDefault()
        setCardVolume(!cardVolume)
        setCardArea(false)
        setCardLinear(false)
        setCorte3mmCheckbox(false)
        setInputComp('')
        setInputLarg('')
        setInputAlt('')
        setInputCompLi('')
        setInputLargLi('')
        setInputAltLi('')
        setCortPincaInputComp(0)
        setNumerosPecasAlternativo('')
    }

    const descricaoPI = cardLinear ? `Linear com ${inputCompLi}mm` : cardArea ? `Área com ${inputCompLi}X${inputLargLi}mm` : cardVolume ? `Volume com ${inputCompLi}X${inputLargLi}X${inputAltLi}mm` : ''

    const resultCard = (n1, n2, n3) => {
        let result = 0
        if(cardLinear){
            result = (n1) / 1000
        }
        if(cardArea){
            result = (n1 * n2) / 1000000
        }
        if(cardVolume){
            result = (n1 * n2 * n3) / 1000000000
        }

        return result
    }

    const [basePerca, setBasePerca] = useState('radioLiquido')
    const verificarBasePerca = (event) =>{
        setBasePerca(event.target.value)
    }

    const basepercentualPerca = (npecas) =>{
        return basePerca === 'radioLiquido' ? (npecas * resultCard(inputCompLi, inputLargLi, inputAltLi)) : basePerca === 'radioBruto' ? resultCard(inputComp, inputLarg, inputAlt) : ''
    } 

    const percentualDePerdas = (npecas) => {
        return ((resultCard(inputComp, inputLarg, inputAlt) - (npecas * resultCard(inputCompLi, inputLargLi, inputAltLi))) / (basepercentualPerca(npecas))) * 100
    }

    const headersTable = ['ID', 'Código (PI)', 'Descrição Produto', 'Código (MP)', 'Descrição Matéria Prima', 'Quantidade', 'Custo Reposição (MP)', '% Perda', 'Custo (MP)', 'Custo (MP + % Perda)', 'Quantidade (PI)', 'Custo Reposição']

    const headerTable = headersTable.map((header, index) => {
        return (
            <th key={index}>{header}</th>
        )
})

    const [codigoPI, setCodigoPI] = useState('')
    const stateCodigoPI = (event) => {
        setCodigoPI(event.target.value)
    }

    const [inDescricaoPI, setInDescricaoPI] = useState(descricaoPI)
    const stateInDescricaoPI = (event) => {
        setInDescricaoPI(event.target.value)
    }

    const [codigoMP, setCodigoMP] = useState('')
    const stateCodigoMP = (event) => {
        setCodigoMP(event.target.value)
    }

    const [descricaoMP, setDescricaoMP] = useState('')
    const stateDescricaoMP = (event) => {
        setDescricaoMP(event.target.value)
    }

    const [quantidadeMP, setQuantidadeMP] = useState()
    const stateQuantidadeMP = (event) => {
        setQuantidadeMP(event.target.value)
    }

    const [custoReposicaoMP, setCustoReposicaoMP] = useState()
    const stateCustoReposicaoMP = (event) => {
        setCustoReposicaoMP(event.target.value)
    }

    const [valorDePerdas, setValorPerdas] = useState()
    const stateValorPerdas = (event) => {
        setValorPerdas(event.target.value)
    }
    const [quantidadePI, setQuantidadePI] = useState()
    const stateQuantidadePI = (event) => {
        setQuantidadePI(event.target.value)
    }

    const [prevDados, setPrevDados] = useState([])

    const adicionarPrevDado = (event, perda) => {
        event.preventDefault()
        setCodigoPI('')
        setInDescricaoPI(descricaoPI)
        setCodigoMP('')
        setDescricaoMP('')
        setQuantidadeMP(resultCard(inputCompLi, inputLargLi, inputAltLi))
        setCustoReposicaoMP('')
        setValorPerdas(percentualDePerdas(perda).toFixed(2))
        setQuantidadePI('')
        const novoDado = { 
            descricaoPI: inDescricaoPI,
            quantidadeMP: quantidadeMP,
            unMedida: cardLinear ? 'm' : cardArea ? 'm²' : cardVolume ? 'm³' : '',
            percentualPerda: Number(valorDePerdas),
        };
        setPrevDados([...prevDados, novoDado]);
    };

    const [dados, setObjArray] = useState([]);
    
    const adicionarDado = (event) => {
        const custoMPePerca = (((Number(custoReposicaoMP) * (valorDePerdas / 100)) + (Number(custoReposicaoMP))) * quantidadeMP)
        event.preventDefault()
        const novoDado = { 
            id: dados.length,
            codigoPI: codigoPI,
            descricaoPI: inDescricaoPI,
            codigoMP: codigoMP,
            descricaoMP: descricaoMP, 
            quantidadeMP: quantidadeMP,
            unMedida: cardLinear ? 'm' : cardArea ? 'm²' : cardVolume ? 'm³' : '',
            custoReposicaoMP: (Number(custoReposicaoMP)),
            percentualPerda: valorDePerdas,
            custoMP: quantidadeMP * Number(custoReposicaoMP),
            custoMPePerca: custoMPePerca ,
            quantidadePI: quantidadePI,
            custoReposicao: custoMPePerca * quantidadePI,
        };
        setObjArray([...dados, novoDado]);
    };

    const removeItem = (index) => {
        const updatedItems = [...dados];
        updatedItems.splice(index, 1);
        setObjArray(updatedItems);
      };

    const [button, setButton] = useState(false)
    const stateButton = () => {
        setButton(!button)
    }

    return(
        <section className="areaCalculo">
           <div>
                <div className="areaCalculosCards">
                    <Card
                        addClass={cardLinear}
                        onClick={cardSelectLinear}
                        tituloCard='Linear (m)' 
                        iconTipoCalculo={<BiRuler />}
                        descricaoCard='* O Calculo "Linear" é para peças com medidas em linha (Metros), como Tubos em aço inox ou carbono, barra de aço ou plásticos (Poliacetal, PP), barras roscadas, entre outros.'/>
                
                    <Card
                        addClass={cardArea}
                        onClick={cardSelectArea}
                        tituloCard='Área (m²)' 
                        iconTipoCalculo={<RxDimensions />}
                        descricaoCard='* O Calculo "Área" é para produtos com unidade de medidas em M², como chapas de papelão, MDF, compensados, courvin, espumas entre outros.'/>
                
                    <Card
                        addClass={cardVolume}
                        onClick={cardSelectVomule}
                        tituloCard='Volume (m³)' 
                        iconTipoCalculo={<BiCube />}
                        descricaoCard='* O Calculo "Volume" é para produtos com unidade de medidas em M³, exemplo: Madeira.'/>
                </div>

                <div>
                    <Calculos 
                        cardLinear={cardLinear}
                        cardArea={cardArea}
                        cardVolume={cardVolume}
                        inputCompLi={inputCompLi}
                        setInputCompLi={setInputCompLi}
                        inputLargLi={inputLargLi}
                        setInputLargLi={setInputLargLi}
                        inputAltLi={inputAltLi}
                        setInputAltLi={setInputAltLi}
                        adicionarPrevDado={adicionarPrevDado}
                        resultCard={resultCard}
                        inputComp={inputComp}
                        setInputComp={setInputComp}
                        inputLarg={inputLarg}
                        setInputLarg={setInputLarg}
                        inputAlt={inputAlt}
                        setInputAlt={setInputAlt}
                        percentualDePerdas={percentualDePerdas}
                        corte3mmCheckbox={corte3mmCheckbox}
                        stateCorte3mmCheckbox={stateCorte3mmCheckbox}
                        cortePincaInputComp={cortePincaInputComp}
                        valorPinca={valorPinca}
                        numerosPecasAlternativo={numerosPecasAlternativo}
                        nPecasAlt={nPecasAlt}
                        basePerca={basePerca}
                        verificarBasePerca={verificarBasePerca}
                        button={button}/>
                </div>
           </div>
           <Button
                button={button}
                stateButton={stateButton}
                ativado={'Fechar Tabela'}
                desativado={'Criar Tabela'}/>

           {button &&
            <CriarTabela 
            headerTable={headerTable}
            adicionarDado={adicionarDado}
            codigoPI={codigoPI}
            stateCodigoPI={stateCodigoPI}
            inDescricaoPI={inDescricaoPI}
            stateInDescricaoPI={stateInDescricaoPI}
            codigoMP={codigoMP}
            stateCodigoMP={stateCodigoMP}
            descricaoMP={descricaoMP}
            stateDescricaoMP={stateDescricaoMP}
            quantidadeMP={quantidadeMP}
            stateQuantidadeMP={stateQuantidadeMP}
            custoReposicaoMP={custoReposicaoMP}
            stateCustoReposicaoMP={stateCustoReposicaoMP}
            valorDePerdas={valorDePerdas}
            stateValorPerdas={stateValorPerdas}
            quantidadePI={quantidadePI}
            stateQuantidadePI={stateQuantidadePI}/>}

           {button && 
                <TabelaAreaCalculos 
                    dados={dados}
                    headersTable={headersTable}
                    headerTable={headerTable}
                    removeItem={removeItem}/>} 
        </section>
    )
}