import React, { useEffect, useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import {useSelector , useDispatch} from "react-redux";
import '../css/App.css';    
import '../css/button.css'

const Result = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch(); 
    const [resultMBTI, setResultMBTI] = useState("");

    const  iScore  = useSelector(state => state.iScore);
    const  eScore  = useSelector(state => state.eScore);
    const  nScore  = useSelector(state => state.nScore);
    const  sScore  = useSelector(state => state.sScore);
    const  tScore  = useSelector(state => state.tScore);
    const  fScore  = useSelector(state => state.fScore);
    const  jScore  = useSelector(state => state.jScore);
    const  pScore  = useSelector(state => state.pScore);

    useEffect(()=>{
        let result = "";

        if(iScore > eScore){
            result += 'I';
        }else{
            result += 'E';
        }

        if(nScore > sScore){
            result += 'N';
        }else{
            result += 'S';
        }

        if(tScore > fScore){
            result += 'T';
        }else{
            result += 'F';
        }

        if(jScore > pScore){
            result += 'J';
        }else{
            result += 'P';
        }


        setResultMBTI(result);
    },[]);
      
    const moveHome = () => {
        dispatch({type:"CLEAR_SCORE"})
        navigate('/')
    }

    return (
      <div className="App">
        <h1>당신의 심리 테스트 결과</h1>
        <p>당신의 MBTI 유형은 {resultMBTI} 입니다!</p>
        <div className="mbti-result">
            <p style={{ color: 'red', fontWeight: 'bold' }}>이 페이지는 테스트 페이지이며, 웹 디자인이 완료되지 않았을 수 있습니다.</p>
        </div>
        <button className="button" onClick={moveHome}>
        메인 화면으로 돌아가기</button>
      </div>
    );
  };


  
export default Result;