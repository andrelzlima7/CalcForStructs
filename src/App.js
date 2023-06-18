import React, { useState } from 'react';
import './App.css';
import {Header} from './Components/Header'
import { Nav } from './Components/Nav';
import { Main } from './Components/Main';

const App = () => {
  const [menuAtivo, setMenuAtivo] = useState(false)
  const clickMenu = () => {
    setMenuAtivo(!menuAtivo)
  }

  return (
    <div className="App">
      <Header clickMenu={clickMenu}/>

      {menuAtivo && <Nav clickMenu={clickMenu}/>}

      <Main />
    </div>
    );
}

export default App
