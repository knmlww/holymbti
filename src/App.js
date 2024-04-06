import React, { useState } from 'react';
import Home from './component/Home'
import './App.css';
import Question from './component/Question';


const App = () => {
  const [path, setPath] = useState("");

  const pathHandler= (param) => {
    setPath(param);
  }

  if(path == 'start'){
    return(
      <Question path="start" pathHandler={pathHandler}/>
    )
  }else{
    return(
      <Home path="" pathHandler={pathHandler}/>
    )
  }
}

export default App;
