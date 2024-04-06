import React, { useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';

import logo from '../logo.svg';
import '../App.css';    
import Question from './Question';
import Main from './Main';

const Home = (props) => {
  const [path, setPath] = useState("");

  const pathHandler= (param) => {
    setPath(param);
  }

  let navigate = useNavigate();   



  if(path == 'start'){
    return(
      <Question path="start" pathHandler={pathHandler}/>
    )
  }else{
    return (
      <Main path="" pathHandler={pathHandler}/>
    );
} 
}
export default Home;
