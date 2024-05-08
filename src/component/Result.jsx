/* eslint-disable*/
import React, { useEffect, useState } from 'react';
import { useNavigate ,useLocation, useSearchParams,useParams } from 'react-router-dom';
import {useSelector , useDispatch} from "react-redux";
import {blobToBase64, getBrowser} from '../common/Utils';
import axios from 'axios';
import '../css/main.css';
import '../css/default.css';
import '../css/final.css';

const Result = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch(); 

    const location = window.location.href;
    
    const [data , setData] = useState(false);
    const [resultMBTI, setResultMBTI] = useState("");
    const [resultCnt, setResultCnt] = useState(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [ccmImgSrc, setCcmImgSrc] = useState(null);
    const [issueNum, setIssueNum] = useState(null);
    const [ccmUrl, setCcmUrl] = useState(null);
    const [kakaoUrl, setKakaoUrl] = useState(null);
    const [bibleChar, setBibleChar] = useState(null);

    const [bible, setBible] = useState(null);

    const [searchParams, setSearchParams] = useSearchParams();

    const { search } = useParams();

    useEffect(()=>{
        const url = `/holymbti/searchResult/${search}`;
        axios.get(url, {
          params: {
            search: searchParams.get("search")
          }
        })
         .then((res)=>{

          setResultCnt(res.data.mbtiCount);
          setResultMBTI(res.data.typeDtlName);
          setImgSrc(res.data.typeImgUrl);
          setIssueNum(res.data.issueNum);
          setResultCnt(res.data.mbtiCount);
          setBible(res.data.typePray)
          setCcmUrl(res.data.typeCcmUrl)
          setCcmImgSrc(res.data.typeCcmImgUrl);
          setKakaoUrl(res.data.typeThumbnailImageUrl);
          setBibleChar(res.data.typeDesc);
          
          setData(true)
         }).catch((error)=>{
          setData(false);
         })

    },[]);
      
    const moveHome = () => {
        dispatch({type:"CLEAR_SCORE"})
        navigate('/')
    }

    const movePage = (url) => {
      const browser = getBrowser();
      if(navigator.userAgent.match("KAKAOTALK") && browser == 'Safari'){
          window.open('kakaotalk://web/openExternal?url='+url, "_blank", "noopener, noreferrer");
 
      }else{
        window.open(url, "_blank", "noopener, noreferrer");
      }
  }

  const handleCopyClipBoard = async (text) => {
    try {
            await navigator.clipboard.writeText(text);
      alert("클립보드에 링크가 복사되었어요.");
    } catch (err) {
    }
  };

 
  const downloadFile = async () => {
    
    var useragt = navigator.userAgent.toLowerCase();
		var target_url = "https://www.holymbti.kro.kr";
		
		if(useragt.match(/kakaotalk/i)){
      fetch(imgSrc, { method: 'GET' })
      .then((res) => {
          return res.blob();
      })
      .then((blob) => {  
        if (navigator.share) {
          navigator.share({
          //  title: 'WebShare API Demo',
          //  url: 'https://codepen.io/ayoisaiah/pen/YbNazJ',
          files: [
            new File([blob], 'file.png', {
              type: blob.type,
            }),
          ],
          }).then(() => {
            console.log('Thanks for sharing!');
          })
          .catch(console.error);
        } else {

          blobToBase64(blob).then(res => {
            // do what you wanna do
          const a = document.createElement('a');
          a.href = res;
          a.download = "img";
          a.target="_blank"
          a.filename ="img"
          document.body.appendChild(a);
          a.click();
          setTimeout((_) => {
              window.URL.revokeObjectURL(url);
          }, 60000);
          a.remove(             );

          });

      
        }               
      })
   
		}else{
  
    fetch(imgSrc, { method: 'GET' })
        .then((res) => {
            return res.blob();
        })
        .then((blob) => {         

            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = "말씀의 검";
            document.body.appendChild(a);
            a.click();
            setTimeout((_) => {
                window.URL.revokeObjectURL(url);
            }, 60000);
            a.remove(             );

 
        })
        .catch((err) => {
            console.error('err: ', err);
        });
      
    } 

  
};


  const shareKakao = () => {
    const imageUrl = document.getElementById("resultImage").src;
    
    const resultUrl = `https://www.holymbti.kro.kr/searchResult/${issueNum}`;

    if (window.Kakao) {
      const kakao = window.Kakao;
 
      if (!kakao.isInitialized()) {
        kakao.init(process.env.REACT_APP_KAKAO_KEY);
      }
      Kakao.Share.sendDefault({
        
        objectType: 'feed',
        content: {
          title: '6월 1일, 부흥을 위한 말씀의 검',
          description: '마귀의 간계를 능히 대적하기 위하여 하나님의 전신갑주를 입으라',
          imageUrl:kakaoUrl,
          imageWidth:800,
          link: {
            // [내 애플리케이션] > [플랫폼] 에서 등록한 사이트 도메인과 일치해야 함
            mobileWebUrl: resultUrl,
            webUrl: resultUrl,
          },
        },
        buttons: [
          {
            title: '결과 보기',
            link: {
              mobileWebUrl: resultUrl,
              webUrl: resultUrl,
            },
          },
          {
            title: '테스트 하기',
            link: {
              mobileWebUrl: 'https://www.holymbti.kro.kr',
              webUrl: 'https://www.holymbti.kro.kr',
            },
          },
        ],
      });
    }
  };


    return (
        
      <div className="final-container">
        {data?
        <>
        <div className='bible-section'>
          <img id="resultTop" className='img-fluid' src={require(`../images/link5.jpg`)} alt="resultTop"/>

            <p className='bible'>{bible}</p> 
        </div>
     
        <div className="mbti-result">
          <img id="resultImage" className='img-fluid' style={{width:"431px"}}	src={imgSrc} alt={resultMBTI}/>
            <p className='bible-sword'>말씀 배경화면으로 전신갑주 완전무장!</p>
        </div>
        <div className='download-container'>
        <button  className="download-button" onClick={downloadFile}
        >
        이미지 다운로드</button>
        </div>
          <div className='bible-char-container'>
          <img id="bible-character" className='img-fluid ccm-img'	src={bibleChar} alt='bible-character'/>
          </div>

         
        <div className='ccm-img-container'>
        <img id="ccmImage" className='img-fluid ccm-img'	src={ccmImgSrc} alt='ccm'/>
        </div>

        <button className="listen-button" onClick={() => movePage(ccmUrl)}>
        들으러 가기</button>
        <div className='last-button-container'>
        <button className="last-button"  onClick={() => movePage("http://www.youthfg.com/since/1")}>홀스 홈페이지 바로가기</button>  
        <br/> 
        <button className="last-button-instagram" onClick={() => movePage("https://www.instagram.com/theholyspirit_fg")}>홀스 인스타 바로가기</button>  
        <br/>
        <button className="last-button" onClick={() => moveHome("https://www.instagram.com/theholyspirit_fg")}>테스트 다시하기</button>  
        </div>


        <div className='share-box'>
        <div className='share'>
        <img src={require(`../images/link-button.png`)} alt="result-logo" onClick={()=>handleCopyClipBoard(`${location}`)} className="img-fluid" style={{ width: "20%" }}/>
        <img  src={require(`../images/kakao.png`)}
            alt="카카오톡 공유 보내기 버튼"
            className="img-fluid"
            onClick={shareKakao}
            style={{ width: "20%" }}/>
        </div>
        </div>
    
        </>
         :null
         }

        <div id="logo" className='logo-container'>
          <img
            src={require(`../images/logo.png`)}
            alt="result-logo"
            className="img-fluid"
          />
        </div>
      </div>
    );
  };


  
export default Result;