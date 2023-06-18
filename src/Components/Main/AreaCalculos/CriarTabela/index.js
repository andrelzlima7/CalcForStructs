import React from "react";
import './CriarTabela.css'
import {BsDatabaseFillAdd} from 'react-icons/bs'

export const CriarTabela = ({headerTable, adicionarDado, codigoPI, stateCodigoPI, inDescricaoPI, stateInDescricaoPI, codigoMP, stateCodigoMP, descricaoMP, stateDescricaoMP, quantidadeMP, stateQuantidadeMP, custoReposicaoMP, stateCustoReposicaoMP, valorDePerdas, stateValorPerdas, quantidadePI, stateQuantidadePI}) => {

    return(
        <section className="table">
            <table className="slide-in-left">
                <thead>
                    <tr>
                        {headerTable}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td><input 
                                type="text" 
                                placeholder="Código PI"
                                value={codigoPI}
                                onChange={stateCodigoPI}>
                            </input>
                        </td>
                        <td><textarea 
                                rows={3} 
                                placeholder="Descrição PI"
                                value={inDescricaoPI}
                                onChange={stateInDescricaoPI}>
                            </textarea>
                        </td>
                        <td><input 
                                type="text" 
                                placeholder="Código MP"
                                value={codigoMP}
                                onChange={stateCodigoMP}>
                            </input>
                        </td>
                        <td><textarea 
                                rows={3} 
                                placeholder="Descrição MP"
                                value={descricaoMP}
                                onChange={stateDescricaoMP}>
                            </textarea>
                        </td>
                        <td><input 
                                type="number" 
                                placeholder="Quantidade"
                                value={quantidadeMP}
                                onChange={stateQuantidadeMP}>
                            </input>
                        </td>
                        <td><input 
                                type="number" 
                                placeholder="Valor MP"
                                value={custoReposicaoMP}
                                onChange={stateCustoReposicaoMP}>
                            </input>
                        </td>
                        <td><input 
                                type="number" 
                                placeholder="% Perda"
                                value={valorDePerdas}
                                onChange={stateValorPerdas}>
                            </input>
                        </td>
                        
                        <td>{`R$ ${(quantidadeMP * custoReposicaoMP).toFixed(2).replace('.' , ',')}`}</td>
                        
                        <td>{`R$ ${(((Number(custoReposicaoMP) * (Number(valorDePerdas) / 100)) + Number(custoReposicaoMP)) * Number(quantidadeMP)).toFixed(2).replace('.' , ',')}`}</td>
                        
                        <td><input 
                                type="number" 
                                placeholder="Quantidade PI"
                                value={quantidadePI}
                                onChange={stateQuantidadePI}>
                            </input>
                        </td>
                        <td>
                            <div>
                                <div>
                                    {`R$ ${((((Number(custoReposicaoMP) * (Number(valorDePerdas) / 100)) + Number(custoReposicaoMP)) * Number(quantidadeMP)) * quantidadePI).toFixed(2).replace('.' , ',')}`}
                                </div>
                                <div>
                                    <span>
                                        <BsDatabaseFillAdd onClick={(event) => adicionarDado(event)} />
                                    </span>
                                </div>
                            </div>
                            </td>
                    </tr>
                </tbody>
            </table>
        </section>
    )
}