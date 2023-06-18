import React from "react";
import './TabelaAreaCalculos.css';
import {BsTrash} from 'react-icons/bs'



export const TabelaAreaCalculos = ({dados, headersTable, headerTable, removeItem}) =>{

    const somarCustoReposicao = () =>{
        let valor =   0.00
        for(let index = 0; index < dados.length; index++){
            valor+= dados[index].custoReposicao
        }
        return valor
    }

    const dadosTabela = dados.map((dado, index) => {

        return(
            <tr key={index} className={index % 2 !== 0 ? 'line' : ''}>
                <td>{index + 1}</td>
                <td>{dado.codigoPI}</td>
                <td>{dado.descricaoPI}</td>
                <td>{dado.codigoMP}</td>
                <td>{dado.descricaoMP}</td>
                <td>{dado.quantidadeMP} {dado.unMedida}</td>
                <td>{`R$ ${(dado.custoReposicaoMP).toFixed(2).replace('.' , ',')}`}</td>
                <td>{`${dado.percentualPerda}%`}</td>
                <td>{`R$ ${(dado.custoMP).toFixed(2).replace('.',',')}`}</td>
                <td>{`R$ ${(dado.custoMPePerca).toFixed(2).replace('.' , ',')}`}</td>
                <td>{dado.quantidadePI}</td>
                <td>
                    <div>
                        <div>
                            {`R$ ${(dado.custoReposicao).toFixed(2).replace('.',',')}`}
                        </div>
                        <div><BsTrash 
                            className="trash"
                            onClick={() => removeItem(index)}/></div>
                    </div>
                </td>
            </tr>
    )})

    return(
        <section className="table">
            <table className="slide-in-left">
                <thead className="tableTitle">
                    <tr >
                        <th colSpan={headersTable.length}>
                            Custo Reposição
                        </th>
                    </tr>
                </thead>
                <thead>
                    <tr>
                        {headerTable}
                    </tr>
                </thead>
                <tbody>
                    {dadosTabela}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={headersTable.length}>Custo Reposição Total: R$ {(somarCustoReposicao()).toFixed(2).replace('.' , ',')}</td>
                    </tr>
                </tfoot>
            </table>
        </section>
    )
}