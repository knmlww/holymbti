import React from 'react';
import { Link, useNavigate  } from 'react-router-dom';

import logo from '../logo.svg';
import '../App.css';    

const Home = (props) => {

  let navigate = useNavigate();   

  const moveSecond = () => {
    props.pathHandler("start");
  }
  return (
    <div className="App">
         <div className="start-page">
          <h1>심리테스트 시작하기</h1>
          <p>당신의 심리 상태를 알아보는 테스트입니다.</p>
          <p style={{ color: 'red', fontWeight: 'bold' }}>이 페이지는 테스트 페이지이며, 웹 디자인이 완료되지 않았을 수 있습니다.</p>
          <button onClick={moveSecond}>시작하기</button>
        </div>
  </div>
  );
}

export default Home;