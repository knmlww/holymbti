/* eslint-disable*/
import React, { useEffect, useState } from 'react';
import { useNavigate ,useLocation, useSearchParams,useParams } from 'react-router-dom';
import {useSelector , useDispatch} from "react-redux";
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
    const [issueNum, setIssueNum] = useState(null);

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

          console.dir(res.data)
          setResultCnt(res.data.mbtiCount);
          setResultMBTI(res.data.mbtiResult);
          setImgSrc(res.data.imgName);
          setIssueNum(res.data.issueNum);
          setBible(res.data.typePray)
          setData(true)
         }).catch((error)=>{
          setData(false);
         })

    },[]);
      
    const moveHome = () => {
        dispatch({type:"CLEAR_SCORE"})
        navigate('/')
    }

    const moveInstagram = (url) => {
      window.open(url, "_blank", "noopener, noreferrer");
  }

  const handleCopyClipBoard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("클립보드에 링크가 복사되었어요.");
    } catch (err) {
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
          title: '나에게 필요한 말씀의 검은?',
          description: '테스트 입니다. 문구 추천 바랍니다',
          imageUrl:
           // 'http://k.kakaocdn.net/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
           imageUrl,
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
          <img id="resultTop" className='img-fluid' src={require(`../images/resultTop.png`)} alt="resultTop"/>

            <p className='bible'>{bible}</p> 
        </div>
    
        <div className="mbti-result">
          <img id="resultImage" className='img-fluid' width="431" height="431"	src={require(`../images/page.jpg`)} alt='INTJ1'/>
            <p className='bible-sword'>말씀 배경화면으로 전신갑주 완전무장!</p>
        </div>
        <div className='download-container'>
        <button className="download-button" onClick={() => moveInstagram("https://www.instagram.com/theholyspirit_fg")}>
        이미지 다운로드</button>
        </div>
          <div className='count-container'>
            <div className='countBox'>
              <p className='count-section'>나와 같은 검을 가진 사람의 수<span className='mbti-count'>3명</span></p>        
            </div>
          </div>

          <div className='ccm-container'>
            <div className='ccm'>
              <div className='ccm-title'>
              <p>나만의 추천 CCM</p> 
              </div>
              <div className='ccm-box'>
               
                <img id="cd" className='img-fluid ccm-img' src={require(`../images/musicbox2.png`)} alt="cd" style={{ width: "100%"}}/>
               
                 <div className='ccm-content'>
                  <div className='ccm-name'>주만 의지해</div>
                  <div className='ccm-singer'>마커스</div>
                  <div className='ccm-lyric'>선하신 주 나를 이끄심 보네
                      <br/>중심을 보시는 주님만 따르네
                      <br/>날 택하신 주만 의지해
                  </div>
                 </div>
                </div>   
                <div className='ccm-button'>    
                <button className="download-button" onClick={() => moveInstagram("https://www.instagram.com/theholyspirit_fg")}>들으러 가기</button>  
                </div>
            </div>
          </div>
        

        <div className='ccm-img-container'>
        <img id="ccmImage" className='img-fluid ccm-img'	src={require(`../images/ccm11.png`)} alt='ccm'/>
        </div>
        <div className='last-button-container'>
        <button className="last-button"  onClick={() => moveInstagram("https://www.instagram.com/theholyspirit_fg")}>홀스 홈페이지 바로가기</button>  
        <br/>
        <button className="last-button-instagram" onClick={() => moveInstagram("https://www.instagram.com/theholyspirit_fg")}>홀스 인스타 바로가기</button>  
        <br/>
        <button className="last-button" onClick={() => moveHome("https://www.instagram.com/theholyspirit_fg")}>테스트 다시하기</button>  
        </div>

        <div className='share-box'>
        <div className='share'>
        <img src={require(`../images/link-button.png`)} alt="result-logo" className="img-fluid" style={{ width: "20%" }}/>
        <img  src={require(`../images/kakao.png`)}
            alt="카카오톡 공유 보내기 버튼"
            className="img-fluid"
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