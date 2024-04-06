import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useDispatch} from "react-redux";
import { useNavigate  } from 'react-router-dom';

const Question = (props) => {
  const dispatch = useDispatch();

  let navigate = useNavigate();

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

    dispatch({type: option});

    if(questionIndex === 11){
  
      navigate('/result');
    }
  };

  return (
  
        <div>
           {currentQuestion &&(
            <h2>{currentQuestion.question}</h2>             
            )
          }  
          {currentQuestion &&(
            currentQuestion.options.map((list,index) => (
              <>
              <button key={list.value} onClick={() => moveNextQuestion(list.value)}>{list.text}</button> <br/>
              </>
              )
            )
          )}
        </div>

  );
}


export default Question;