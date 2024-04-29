import React, { useState, useEffect } from 'react';
import {useDispatch , useSelector} from "react-redux";
import { useNavigate  } from 'react-router-dom';

import '../css/main.css';
import '../css/default.css';
import '../css/calculate.css'
import axios from 'axios';

const Calculate = (props) => {
  const dispatch = useDispatch();

  let navigate = useNavigate();

  
  const [swordCount, setSwordCount] = useState(1);
  const [resultMember, setResultMember] = useState(0);
  const [data , setData] = useState(false);

  const  iScore  = useSelector(state => state.iScore);
  const  eScore  = useSelector(state => state.eScore);
  const  nScore  = useSelector(state => state.nScore);
  const  sScore  = useSelector(state => state.sScore);
  const  tScore  = useSelector(state => state.tScore);
  const  fScore  = useSelector(state => state.fScore);
  const  jScore  = useSelector(state => state.jScore);
  const  pScore  = useSelector(state => state.pScore);

  useEffect(()=>{
    const generateImage = (param) => {
      const ran = Math.random();
  
  
        if(ran<0.5){
          
        const imageName = param.concat("1");
        return imageName;
  
        }else{
        const imageName = param.concat("2");
        return imageName;
        }
        
      }
  
    const generateNumber = () => {
      let result = "";
  
      const characters = '0123456789';
      const charactersLength = characters.length;
  
      for (let i = 0; i < 9; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength);
        result += characters.charAt(randomIndex);
      }
  
      return parseInt(result);
    }

    
  const generateMBTI = () => {

    
    let result = "";
    let i_result = 0;
    let e_result = 0;
    let n_result = 0;
    let s_result = 0;
    let t_result = 0;
    let f_result = 0;
    let j_result = 0;
    let p_result = 0;

    if(iScore > eScore){
        result += 'I';
        i_result += 1;
    }else{
        result += 'E';
        e_result += 1;
    }

    if(nScore > sScore){
        result += 'N';
        n_result += 1;
    }else{
        result += 'S';
        s_result += 1;
    }

    if(tScore > fScore){
        result += 'T';
        t_result += 1;
    }else{
        result += 'F';
        f_result += 1;
    }

    if(jScore > pScore){
        result += 'J';
        j_result += 1;
    }else{
        result += 'P';
        p_result += 1;
    }

    const generatedImage = generateImage(result);

    const generatedNumber = generateNumber();

    const url = '/holymbti/insertResult';
    const data = {
        "issueNum" : generatedNumber,
        'mbtiResult' : result,
        'iresult' : i_result,
        'eresult' : e_result,
        'nresult' : n_result,
        'sresult' : s_result,
        'tresult' : t_result,
        'fresult' : f_result,
        'jresult' : j_result,
        'presult' : p_result,
        'imgName' : generatedImage,
        'imgUrl'  : '123'

    };

    const config = {"Content-Type": 'application/json'};

    axios.post(url,data,config)
      .then(res => {
        // 성공 처리
        dispatch({type: 'SAVE_RESULT',payload:result});
       // navigate(`/searchResult?search=${generatedNumber}` ,{ state: generatedNumber });
       navigate(`/searchResult/${generatedNumber}` ,{ state: generatedNumber });
    }).catch(err => {
      // 에러 처리
      //console.dir(err);// --> 서버단 에러메세지 출력~
      //console.dir()
    });
  
  }


    setTimeout(() => {
      generateMBTI();
      }, 6000);
  },[])



  useEffect(()=>{
    setTimeout(() => {
      setSwordCount(swordCount+1);

      if(swordCount === 3){
        setSwordCount(1);
      }
      }, 500);
  },[swordCount])



  return (
    <div id='calculate' className='calculate'>
        <div id='image' className='calculate-image-container'>
            <img src={require(`../images/sword_move.gif`)} alt="q1Image" className={'img-fluid '} style={{ width: "30%" }}/>
        <p className='loading'>말씀의 검 만드는 중...</p>
        </div>

    </div>
  );
}

export default Calculate;