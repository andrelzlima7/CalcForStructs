import React from "react";
import './Card.css'
import {BsCalculator} from 'react-icons/bs'

export const Card = ({descricaoCard, tituloCard, iconTipoCalculo, onClick,addClass}) =>{
    return(
        <div className={addClass ? 'card cardAtivo' : 'card'}>
            <h3>{tituloCard}</h3>
            <span>{iconTipoCalculo}</span>
            <p>{descricaoCard}</p>
            <span onClick={onClick}>{<BsCalculator className="BsCalculator"/>}</span>
        </div>
    )
}