import React, { useState, useEffect } from 'react';
import {useDispatch} from "react-redux";


import '../css/main.css';
import '../css/default.css';
import axios from 'axios';

const Main = (props) => {

  const dispatch = useDispatch();

  const [resultMember, setResultMember] = useState(0);
  const [data , setData] = useState(false);

  useEffect(()=>{
    dispatch({type:"CLEAR_SCORE"})
  },[])

  const moveStart = () => {
    props.pathHandler("start");
  }
  return (
  <div className="container">
    {//data?
    <section className="mx-auto mt-2">
      <h3 className="mx-auto mb-4">전신갑주 입고<br/> 홀스 성회 가자</h3>
        <div className="col-5 mx-auto col-md-5 col-sm-5 col-12">
          <img  src={require(`../images/main2.png`)} className="img-fluid" alt="mainLogo" />
        </div>
      <p className="mt-3 mb-4">나에게 필요한 말씀의 검은?</p>
      <button onClick={moveStart}>시작하기</button>
      <div className="logo-container">
        <img
          src={require(`../images/logo.png`)}
          alt="mainImage"
          className="img-fluid"
        />
      </div>
    </section>
   // :null
    }
  </div>
 
  );
}

export default Main;