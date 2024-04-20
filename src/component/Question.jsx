import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useDispatch , useSelector} from "react-redux";
import { useNavigate  } from 'react-router-dom';
import '../css/App.css';    
import '../css/button.css'
import Progress from './Progress';

const Question = (props) => {
  const dispatch = useDispatch();

  let navigate = useNavigate();

  const [questionArr, setQuestionArr] = useState([]);
  const [currentQuestion , setCurrentQuestion] = useState(null);
  const [questionIndex , setQuestionIndex] = useState(0);

  const  iScore  = useSelector(state => state.iScore);
  const  eScore  = useSelector(state => state.eScore);
  const  nScore  = useSelector(state => state.nScore);
  const  sScore  = useSelector(state => state.sScore);
  const  tScore  = useSelector(state => state.tScore);
  const  fScore  = useSelector(state => state.fScore);
  const  jScore  = useSelector(state => state.jScore);
  const  pScore  = useSelector(state => state.pScore);
 
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
          'imgName' : generatedImage

      };

      const config = {"Content-Type": 'application/json'};

      axios.post(url,data,config)
        .then(res => {
          // 성공 처리
          dispatch({type: 'SAVE_RESULT',payload:result});
          navigate(`/searchResult?search=${generatedNumber}` ,{ state: generatedNumber });
      }).catch(err => {
        // 에러 처리
        //console.dir(err);// --> 서버단 에러메세지 출력~
        //console.dir()
      });
    
    }
  };

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

  return (
  
    <div className="App">
   
           {currentQuestion &&(
            <>
            <h2>{currentQuestion.question}</h2>          
            <Progress totalQuestions={questionArr.length} currentQuestion={questionIndex}/>   
            </>
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