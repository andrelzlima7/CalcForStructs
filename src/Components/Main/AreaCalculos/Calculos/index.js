import React, { Fragment } from "react";
import './Calculos.css'
import { InputNumber } from "./InputNumber";
import {RxDimensions} from 'react-icons/rx'
import {BiRuler, BiCube} from 'react-icons/bi'
import {GiCircularSawblade} from 'react-icons/gi'
import {FiPercent} from 'react-icons/fi'
import {GrTableAdd} from 'react-icons/gr'
import {CgSpaceBetweenV} from 'react-icons/cg'

export const Calculos = ({cardLinear, cardArea, cardVolume, adicionarPrevDado, inputCompLi, setInputCompLi, inputLargLi, setInputLargLi, inputAltLi, setInputAltLi, inputComp, setInputComp, inputLarg, setInputLarg, inputAlt, setInputAlt, resultCard, percentualDePerdas, corte3mmCheckbox, stateCorte3mmCheckbox, cortePincaInputComp, valorPinca, numerosPecasAlternativo, nPecasAlt, basePerca, verificarBasePerca, button}) =>{
    
    const newValue = (event, setInput) =>{
        event.preventDefault()
        const {value} = event.target;
        setInput(value)
    }

    const corteInputCompLi = corte3mmCheckbox ? Number(inputCompLi) + 3 : inputCompLi

    const corteInputComp = (Number(inputComp) - (Number(cortePincaInputComp)))

    const numeroDePecasLinear = Math.floor(corteInputComp / corteInputCompLi)
    const numeroDePecasArea1 = Math.floor(inputComp / inputCompLi) * Math.floor(inputLarg / inputLargLi)
    const numeroDePecasArea2 = Math.floor(inputComp / inputLargLi) * Math.floor(inputLarg / inputCompLi)

    return(
        <div>
            {(cardLinear || cardArea || cardVolume) && 
                <div className="calculos slide-in-right">
                    <div>
                        {(cardLinear || cardArea || cardVolume) && 
                            <InputNumber
                                onChange={(event) => newValue(event, setInputComp)}
                                value={inputComp}
                                placeholder='Comprimento (mm)' 
                                label='Comprimento Bruto: '/>}
                        {(cardArea || cardVolume) && 
                            <InputNumber 
                                onChange={(event) => newValue(event, setInputLarg)}
                                value={inputLarg}
                                placeholder='Largura (mm)' 
                                label='Largura Bruto: '/>}
                        {(cardVolume) && 
                            <InputNumber
                                onChange={(event) => newValue(event, setInputAlt)}
                                value={inputAlt}
                                placeholder='Altura (mm)' 
                                label='Altura Bruto: '/>}
                        <div>
                            {cardLinear && <span><BiRuler className="icon" /> {`${resultCard(inputComp, inputLarg, inputAlt)} m`}</span>}
                            {cardArea && <span><RxDimensions className="icon" /> {`${resultCard(inputComp, inputLarg, inputAlt)} m²`}</span>}
                            {cardVolume && <span><BiCube className="icon" /> {`${resultCard(inputComp, inputLarg, inputAlt)} m³`}</span>}
                        </div>
                    </div>
                    <div>
                        {(cardLinear || cardArea || cardVolume) && 
                            <InputNumber 
                            onChange={(event) => newValue(event, setInputCompLi)}
                            value={inputCompLi}
                            placeholder='Comprimento (mm)' 
                            label='Comprimento Líquido: '/>}
                        {(cardArea || cardVolume) && 
                            <InputNumber 
                            onChange={(event) => newValue(event, setInputLargLi)}
                            value={inputLargLi}
                            placeholder='Largura (mm)' 
                            label='Largura Líquido: '/>}
                        {(cardVolume) &&
                            <InputNumber 
                            onChange={(event) => newValue(event, setInputAltLi)}
                            value={inputAltLi}
                            placeholder='Altura (mm)' 
                            label='Altura Líquido: '/>}
                        <div className="resultLiq">
                            {cardLinear && 
                                <div>
                                    <span><BiRuler className="icon" /> {`${resultCard(inputCompLi, inputLargLi, inputAltLi)} m`}</span>
                                    <div>
                                        <input 
                                            type="checkbox" 
                                            onChange={stateCorte3mmCheckbox} 
                                            value={corte3mmCheckbox}></input>
                                        <label>3 mm <span><GiCircularSawblade className={corte3mmCheckbox ? "rotating-element" : ""}/></span></label>
                                    </div>
                                    <div>
                                        <input 
                                            type="number"
                                            className="inputNumber"
                                            onChange={valorPinca}
                                            value={cortePincaInputComp}></input>
                                        <label> mm <span><CgSpaceBetweenV /></span></label>
                                    </div>
                                </div>}
                            {cardArea && <span><RxDimensions className="icon" /> {`${resultCard(inputCompLi, inputLargLi, inputAltLi)} m²`}</span>}
                            {cardVolume && <span><BiCube className="icon" /> {`${resultCard(inputCompLi, inputLargLi, inputAltLi)} m³`}</span>}
                        </div>
                    </div>
                <div className="resultados">
                    <div className="selectBasePerda">
                        <div>
                            <label htmlFor="radioBruto">Bruto</label>
                            <input 
                                id="radioBruto" 
                                name="basePerca" 
                                type="radio"
                                value={'radioBruto'}
                                checked={basePerca === 'radioBruto'}
                                onChange={verificarBasePerca}></input>
                        </div>
                        <div>
                            <label htmlFor="radioLiquido">Total Líquido</label>
                            <input 
                                id="radioLiquido" 
                                name="basePerca" 
                                type="radio"
                                value={'radioLiquido'}
                                checked={basePerca === 'radioLiquido'}
                                onChange={verificarBasePerca}></input>
                        </div>
                    </div>
                    

                    {(cardLinear || cardVolume) && 
                        <div>
                            <div>
                                <div><span><GiCircularSawblade /></span>Plano A: {`${Math.floor(numeroDePecasLinear)} unidade(s)`}</div>
                                <div><span><FiPercent /></span> Perda: {`${percentualDePerdas(Math.floor(numeroDePecasLinear)).toFixed(2)}%`}</div>
                            </div>
                            {button && <GrTableAdd onClick={(event) => adicionarPrevDado(event, numeroDePecasLinear)} className="GrTableAdd"/>}
                        </div>
                    }
                    {cardArea && 
                        <Fragment>
                            <div>
                                <div>
                                    <div><span><GiCircularSawblade /></span>Plano A: {`${numeroDePecasArea1} unidade(s)`}</div>
                                    <div><span><FiPercent /></span> Perda: {`${percentualDePerdas(numeroDePecasArea1).toFixed(2)} %`}</div>
                                </div>
                                {button && <GrTableAdd onClick={(event) => adicionarPrevDado(event, numeroDePecasArea1)} className="GrTableAdd"/>}
                            </div>
                            <div>
                                <div>
                                    <div><span><GiCircularSawblade /></span>Plano B: {`${numeroDePecasArea2} unidade(s)`}</div>
                                    <div><span><FiPercent /></span> Perda: {`${percentualDePerdas(numeroDePecasArea2).toFixed(2)} %`}</div>
                                </div>
                                {button && <GrTableAdd onClick={(event) => adicionarPrevDado(event, numeroDePecasArea2)} className="GrTableAdd"/>}
                            </div>
                        </Fragment> 
                    }
                    <div className="planoAlternativo">
                        <div>
                            <div><span><GiCircularSawblade /></span>Plano Alternativo:
                                <input 
                                    onChange={nPecasAlt}
                                    value={numerosPecasAlternativo}
                                    type="number">
                                </input>
                            </div>
                            <div><span><FiPercent /></span>Perda: {`${percentualDePerdas(numerosPecasAlternativo).toFixed(2)} %`}</div>
                        </div>
                        {button && <GrTableAdd onClick={(event) => adicionarPrevDado(event, numerosPecasAlternativo)} className="GrTableAdd"/>}
                    </div>
                </div>
            </div>}
        </div>
    )
}