import React, { useEffect, useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import {useSelector , useDispatch} from "react-redux";
import axios from 'axios';
import '../css/App.css';    
import '../css/button.css'

const Result = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch(); 
    const [resultMBTI, setResultMBTI] = useState("");
    const [resultCnt, setResultCnt] = useState(null);

    const  result = useSelector(state => state.resultMBTI);

    useEffect(()=>{
        const url = '/holymbti/findMyMBTICount';

        const data = {
            'mbtiResult' : result,
        };
        const config = {"Content-Type": 'application/json'};
        axios.post(url,data,config)
         .then((res)=>{
            setResultCnt(res.data);
         })

        setResultMBTI(result);
    },[]);
      
    const moveHome = () => {
        dispatch({type:"CLEAR_SCORE"})
        navigate('/')
    }

    return (
      <div className="App">
        <h2>나에게 필요한 말씀의 검은?</h2>
        <p>당신의 MBTI 유형은 {resultMBTI} 입니다!</p>
      
        <div className="mbti-result">
            <p>나와 같은 MBTI 유형의 수는 {resultCnt}명 입니다!</p>
            <p>당신에게 필요한 말씀의 검의 유형은 곧 추가될 예정입니다!</p>
            <p style={{ color: 'red', fontWeight: 'bold' }}>이 페이지는 테스트 페이지이며, 웹 디자인이 완료되지 않았을 수 있습니다.</p>
        </div>
        <button className="button" onClick={moveHome}>
        메인 화면으로 돌아가기</button>
      </div>
    );
  };


  
export default Result;