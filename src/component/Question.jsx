import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useDispatch} from "react-redux";
import { useNavigate  } from 'react-router-dom';
import '../css/App.css';    
import '../css/button.css'

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
  
    <div className="App">
           {currentQuestion &&(
            <h2>{currentQuestion.question}</h2>             
            )
          }  
          <div className="button-container">
          {currentQuestion &&(
            currentQuestion.options.map((list,index) => (
              <button  className="button" key={list.value} onClick={() => moveNextQuestion(list.value)}>{list.text}</button>
              )
            )
          )}
          </div>
        </div>

  );
}


export default Question;