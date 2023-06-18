import React from "react";
import './Button.css' 

export const Button = ({button, stateButton, ativado, desativado}) => {
    
    return(
        <button
            className="button"
            onClick={stateButton}>
            {button === true ? ativado : desativado}
        </button>
    )
}