import React from "react";
import './Nav.css'

export const Nav = ({clickMenu}) =>{
    
    return(
        <nav className={clickMenu ? "nav slide-in-left" : 'nav slide-out-left'}>
            <ul>
                <li>TESTE MENU NUMERO 1</li>
                <li>TESTE MENU NUMERO 2</li>
                <li>TESTE MENU NUMERO 3</li>
                <li>TESTE MENU NUMERO 4</li>
                <li>TESTE MENU NUMERO 5</li>
            </ul>
        </nav>
    )
}