import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Question = (props) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [questionArr, setQuestionArr] = useState([]);
  const [currentQuestion , setCurrentQuestion] = useState(null);
  const [questionIndex , setQuestionIndex] = useState(0);
  useEffect(()=>{
    axios.get("/json/question2.json")
         .then((res)=>{
          setQuestionArr(res.data);
          setCurrentQuestion(res.data[0]);
         })
  },[])

  const moveNextQuestion = (option) => {
    setQuestionIndex(questionIndex+1);
    setCurrentQuestion(questionArr[questionIndex+1]);
  };

  return (
  
        <div>
           {currentQuestion &&(
            <h2>{currentQuestion.question}</h2>             
            )
          }  
          {currentQuestion &&(
            currentQuestion.options.map((list,index) => (
              <button key={list.value} onClick={() => moveNextQuestion(list.value)}>{list.text}</button>
              )
            )
          )}
        </div>

  );
}


export default Question;