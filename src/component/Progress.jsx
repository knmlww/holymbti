
import React, {useState,useEffect} from 'react'


const Progress = (props) => {
    
    const [progress,setProgress] = useState(3);

    useEffect(()=>{
        const paramProgress = ((props.currentQuestion+1) / props.totalQuestions) * 100;

        setProgress(paramProgress);
      })
    
    return (
      <div style={{ padding: '10%' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>

          <div style={{ flex: '1', marginLeft: '20px' }}>
            <div style={{ height: '10px', backgroundColor: '#ddd', borderRadius: '5px', overflow: 'hidden' }}>
              <div style={{ width: `${progress}%`, height: '100%', backgroundColor: '#007bff' }}></div>
            </div>
          </div>
        </div>
        <div>{props.currentQuestion+1}/{props.totalQuestions}</div>
      </div>
    );
  };
  
  
  export default Progress;