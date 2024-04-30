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
          setResultMBTI(res.data.mbtiResult);
          setImgSrc(res.data.imgName);
          setIssueNum(res.data.issueNum);
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
        
      <div id='final' className="final">
        {data?
        <>
        <img id="resultTop"	className='resultTop' src={require(`../images/resultTop.png`)} alt="resultTop"/>
        <p className='bible'>당신의 MBTI 유형은 {resultMBTI} 입니다!</p>
      
        <div className="mbti-result">
          <img id="resultImage" width="431" height="431"	src={require(`../images/INTJ1.jpg`)} alt='INTJ1'/>
            <p className='bible'>말씀 배경화면으로 전신갑주 완전무장!</p>
        </div>
        <div className='download-container'>
        <button className="download-button" onClick={() => moveInstagram("https://www.instagram.com/theholyspirit_fg")}>
        이미지 다운로드</button>
        </div>
{/*
        <div className='result-button-container'>
        <button className="button" onClick={() => moveInstagram("https://www.instagram.com/theholyspirit_fg")}>
        홀스 성회 인스타그램</button>
        <button className="button" onClick={moveHome}>
        메인 화면으로 돌아가기</button>
        <button className="button" onClick={()=>handleCopyClipBoard(`${location}`)}>
        링크 공유하기</button>
        <button className="button" onClick={()=>shareKakao()}>
        카카오톡 공유하기</button>
        </div>
        */
        }
        <img id="ccmImage" width="431" height="431"	src={require(`../images/ccm.png`)} alt='ccm'/>
        </>
         :null
         }
      </div>
      
    );
  };


  
export default Result;