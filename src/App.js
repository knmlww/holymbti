import React, { useState } from 'react';
import Home from './component/home'
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Second from './component/second';
import Third from './component/third';


const App = () => {
  const [path, setPath] = useState("");

  const pathHandler= (param) => {
    setPath(param);
  }

  if(path == 'start'){
    return(
      <Third path="start" pathHandler={pathHandler}/>
    )
  }else{
    return(
      <Home path="" pathHandler={pathHandler}/>
    )
  }
  /*
  return (

    <>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/third" element={<Third/>} />
    </Routes>
    </>
  );*/

}

export default App;
