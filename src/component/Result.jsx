import React, { useEffect, useState } from 'react';
import { useNavigate ,useLocation  } from 'react-router-dom';
import {useSelector , useDispatch} from "react-redux";
import axios from 'axios';
import '../css/App.css';    
import '../css/button.css'

const Result = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch(); 
    
    const [data , setData] = useState(false);
    const [resultMBTI, setResultMBTI] = useState("");
    const [resultCnt, setResultCnt] = useState(null);
    const [imgSrc, setImgSrc] = useState(null);

    ///const  result = useSelector(state => state.resultMBTI);

    const { state } = useLocation();

    useEffect(()=>{
/*
      const generateImage = () => {
        const ran = Math.random();
  
  
          if(ran<0.5){
            
          const imageName = result.concat("1");
          setImgSrc(imageName);
          setData(true);
          }else{
          const imageName = result.concat("2");
          setImgSrc(imageName);
          setData(true);
          }
          
        }
*/

        const url = '/searchResult';

        axios.get(url, {
          params: {
            search: state
          }
        })
         .then((res)=>{
          console.dir(res.data)
         setResultCnt(res.data.mbtiCount);
          setResultMBTI(res.data.mbtiResult);
          setImgSrc(res.data.imgName);
          setData(true)
         }).catch((error)=>{
            setData(false);
         })

    },[]);
      
    const moveHome = () => {
        dispatch({type:"CLEAR_SCORE"})
        navigate('/')
    }

    const moveInstagram = (url) => {
      window.open(url, "_blank", "noopener, noreferrer");
  }

    return (
        
      <div className="App">
        {data?
        <>
        <h2>나에게 필요한 말씀의 검은?</h2>
        <p>당신의 MBTI 유형은 {resultMBTI} 입니다!</p>
      
        <div className="mbti-result">
            <p>나와 같은 MBTI 유형의 수는 <span>{resultCnt}</span>명 입니다!</p>
            <p>당신에게 필요한 말씀의 검의 유형은 곧 추가될 예정입니다!</p>
            {imgSrc?<img width="431" height="431"	src={require(`../images/${imgSrc}.jpg`)} alt={imgSrc}/>:null}

            <p style={{fontWeight: 'bold' }}>다른 유형은 홀스 공식 계정에서 확인하세요!</p>
        </div>
        <div className='result-button-container'>
        <button className="button" onClick={() => moveInstagram("https://www.instagram.com/theholyspirit_fg")}>
        홀스 성회 인스타그램</button>
        <button className="button" onClick={moveHome}>
        메인 화면으로 돌아가기</button>
        </div>

        </>
         :null }
      </div>
      
    );
  };


  
export default Result;