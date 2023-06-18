import React from "react";
import './Header.css';
import {HiMenu} from 'react-icons/hi'
import {BsGithub, BsLinkedin} from 'react-icons/bs'


export const Header = ({clickMenu}) => {
    return(
        <header className="header">
            <div>
                <HiMenu className="hiMenu" title="Desabilitado"/>
                <h1>Modulo de Producão</h1>
                <input className="headerSearch" type="search" placeholder="Pesquisa desabilitada temporariamente"></input>
            </div>
            <div className="imgArk">
                <a href="https://www.linkedin.com/in/andr%C3%A9-luiz-de-lima-66958319b/" target="blank" alt=""><BsLinkedin /></a>
                <a href="https://github.com/andrelzlima7" target="blank" alt=""><BsGithub /></a>
            </div>
        </header>
    )
}
