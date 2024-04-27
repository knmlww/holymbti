import React, { useState } from 'react';

import '../css/App.css';    
import Question from './Question';
import Calculate from './Calculate';
import Main from './Main';

const Home = (props) => {
  const [path, setPath] = useState("");

  const pathHandler= (param) => {
    setPath(param);
  }


  if(path == 'start'){
    return(
      <Question path="start" pathHandler={pathHandler}/>
    )
  }else if(path == 'calculate'){
    return(
      <Calculate path="calculate" pathHandler={pathHandler}/>
    )
  }
  else{
    return (
      <Main path="" pathHandler={pathHandler}/>
    );
} 
}
export default Home;
