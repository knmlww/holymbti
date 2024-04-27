import React, { useState, useEffect } from 'react';

import '../css/main.css';
import '../css/default.css';
import '../css/calculate.css'
import axios from 'axios';

const Calculate = (props) => {


  const [swordCount, setSwordCount] = useState(1);
  const [resultMember, setResultMember] = useState(0);
  const [data , setData] = useState(false);



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
            <img src={require(`../images/sword${swordCount}.jpg`)} alt="q1Image" className={'img-fluid '} style={{ width: "30%" }}/>
        <p className='loading'>말씀의 검 만드는 중...</p>
        </div>

    </div>
  );
}

export default Calculate;