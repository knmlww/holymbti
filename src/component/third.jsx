import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Third = (props) => {
  const [started, setStarted] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [question, setQuestion] = useState([]);

  useEffect(()=>{
   // axios.get("/json/question2.json")
      axios.get("/api/server_test")  
         .then((res)=>{
     //     const response = JSON.parse(res.data);
       //   setQuestion(res.data);
          console.dir(res);
         })
  })
  // 시작 버튼을 클릭할 때 호출되는 함수
  const handleStartButtonClick = () => {
    setStarted(true);
  };

  // 선택한 옵션을 처리하는 함수
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    // 선택한 옵션을 처리하는 추가 로직을 여기에 작성할 수 있습니다.
  };

  return (
    <>
    {question?
      question.map((list)=>(
        <div>
          <h2>{list.question}</h2>
          {list.options?
          list.options.map((option) =>(  
          <button onClick={() => handleOptionSelect(option.value)}>{option.text}</button>
           ))
           :<h2>데이터 통신 오류</h2>
          }
        </div>
         
      ))
    :<h2>데이터 통신 오류</h2>}  
    </>
  );
}


export default Third;