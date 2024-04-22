import React, { useState, useEffect } from 'react';
import '../css/App.css';    
import '../css/button.css'
import '../css/main.css';
import '../css/default.css';
import axios from 'axios';

const Main = (props) => {

  const [resultMember, setResultMember] = useState(0);
  const [data , setData] = useState(false);

  useEffect(()=>{
    axios.post("/holymbti/getResultMember")
         .then((res)=>{
          setResultMember(res.data);
          setData(true);
         }).catch((error)=>{
          setData(false);
         })
  },[])

  const moveStart = () => {
    props.pathHandler("start");
  }
  return (
  <div className="container">
    {data?
    <section id="main" className="mx-auto mt-2 py-5 px-5">
      <h3 className="mx-auto mb-4">전신갑주 입고 홀스 성회 가자</h3>
        <div className="col-5 mx-auto col-md-5 col-sm-5 col-12">
          <img  src={require(`../images/main2.png`)} className="img-fluid" alt="mainLogo" />
        </div>
      <p className="mt-3 mb-4">나에게 맞은 말씀의 검은?</p>
      <button onClick={moveStart}>시작하기</button>
      <div className="logo-container">
        <img
          src={require(`../images/logo.png`)}
          alt="mainImage"
          className="img-fluid logo-image"
        />
      </div>
    </section>
    :null}
  </div>
 
  );
}

export default Main;