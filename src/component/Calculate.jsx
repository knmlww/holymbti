import React, { useState, useEffect } from 'react';

import '../css/main.css';
import '../css/default.css';
import '../css/calculate.css'
import axios from 'axios';

const Calculate = (props) => {

  const [resultMember, setResultMember] = useState(0);
  const [data , setData] = useState(false);


  return (
    <div id='calculate' className='calculate-container'>
        <div id='image' className='calculate-image-container'>
            <img src={require(`../images/q/q5.png`)} alt="q1Image" className={'img-fluid '} style={{ width: "50%" }}/>
        <p className='loading'>말씀의 검 만드는 중...</p>
        </div>
    </div>
  );
}

export default Calculate;