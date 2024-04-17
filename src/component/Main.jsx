import React, { useState, useEffect } from 'react';
import '../css/App.css';    
import '../css/button.css'
import axios from 'axios';

const Main = (props) => {

  const [resultMember, setResultMember] = useState(0);

  useEffect(()=>{
    axios.post("/holymbti/getResultMember")
         .then((res)=>{
          setResultMember(res.data);
         })
  },[])

  const moveStart = () => {
    props.pathHandler("start");
  }
  return (
    <div className="App">
         <div className="start-page">
          <h2>전신갑주 입고 홀스 성회 가자!</h2>
          <p>나에게 필요한 말씀의 검은?</p>
          <button className="button" onClick={moveStart}>시작하기<br/><p>총 {resultMember}명 참여하였습니다.</p></button>
      
        </div>
    </div>
  );
}

export default Main;