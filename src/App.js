import React, { useState } from 'react';
import Home from './component/home'
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Second from './component/second';
import Main from './component/Main';


const App = () => {
  const [path, setPath] = useState("");

  const pathHandler= (param) => {
    setPath(param);
  }

  if(path == 'start'){
    return(
      <Main path="start" pathHandler={pathHandler}/>
    )
  }else{
    return(
      <Home path="" pathHandler={pathHandler}/>
    )
  }
}

export default App;
