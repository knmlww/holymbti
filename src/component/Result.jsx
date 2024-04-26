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
      console.log(err);
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
      console.log(Kakao);
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
        
      <div id="final" className="container">
      <h3 className="mx-auto mb-4 mt-5">나에게 필요한 말씀의 검은?</h3>
      <h2>사랑에는 거짓이 없다니 악을 미워하고 선에 속하라 로마서 12:9</h2>
      <section id="main" className="mx-auto">
        <section className="mx-auto" />
        <img
          src={require(`../images/p-bg/phoneBG.jpg`)}
          alt="phoneBG"
          className="img-fluid phoneBG"
          style={{ width: "50%" }}
        />
      </section>
      <p>하나님 아버지
저희의 마음을 진정한 사랑으로 채워주시기를 기도합니다.
악한 것을 미워하고 선한 것에 속하도록 도와주소서
진실하고 위선 없는 사랑으로 주님을 기쁘시게 하는 삶을 살도록 저를 인도해 주십시오. 
당신의 사랑이 저를 통해 흐르게 하셔서 제가 이 세상의 빛으로 살아가게 하소서 
예수님의 이름으로 기도드립니다. 아멘</p>
      <div id="link">
        <button idclass="mt-3">insta</button>
        <br />
        <button className="mx-auto mt-1">main</button>
      </div>
      <div id="link2" className="mt-1">
        <button className="mt-1">Link</button>
        <button className="mx-auto mt-1">KaKao</button>
      </div>
      <div className="logo-container">
        <img
          src="./img/logo.png"
          alt="mainImage"
          className="img-fluid logo-image"
        />
      </div>
    </div>
    
      
    );
  };


  
export default Result;