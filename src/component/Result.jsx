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

    const [isKakaoBrower, setKakaoBrower] = useState(false);


    const { search } = useParams();

    useEffect(()=>{

      const isKakao = navigator.userAgent.match("KAKAOTALK"); 
      console.log(navigator.userAgent); 
      setKakaoBrower(Boolean(isKakao)); 

        const url = `/searchResult/${search}`;
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
        navigate('/')
    }


    const moveInstagram = (url) => {
      if(isKakaoBrower){
        window.open('kakaotalk://web/openExternal?url='+url, "_blank", "noopener, noreferrer");
      }else{
        window.open(url, "_blank", "noopener, noreferrer");
      }

  }

  const getBrowser = () => {
    const browsers = [
      'Chrome', 'Opera',
      'WebTV', 'Whale',
      'Beonex', 'Chimera',
      'NetPositive', 'Phoenix',
      'Firefox', 'Safari',
      'SkipStone', 'Netscape', 'Mozilla',
    ];
  
    const userAgent = window.navigator.userAgent.toLowerCase();
  
    if (userAgent.includes("edg")) {
      return "Edge";
    }
  
    if (userAgent.includes("trident") || userAgent.includes("msie")) {
      return "Internet Explorer";
    }
  
    return browsers.find((browser) => userAgent.includes(browser.toLowerCase())) || 'Other';
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
        
      <div id="final" className="final">
          <img
          src={require(`../images/p-bg/phoneBG.jpg`)}
          alt="phoneBG"
          className="img-fluid"
          style={{ width: "100%" }}
        />
                <button className="mx-auto mt-4" >이미지 다운로드</button>
      <h3 className="mx-auto mb-4 mt-5">나에게 필요한 말씀의 검은?</h3>
      <h2>사랑에는 거짓이 없다니 악을 미워하고 선에 속하라 로마서 12:9</h2>
      <section id="main" className="mx-auto">
        <section className="mx-auto" />
      
      </section>
      <div id="link">
        <button idclass="mt-3"onClick={() => moveInstagram("https://www.instagram.com/theholyspirit_fg")}>insta</button>
        <br />
        <button className="mx-auto mt-1">main</button>
      </div>
      <div id="link2" className="mt-1">
        <button className="mt-1">Link</button>
        <button className="mx-auto mt-1">KaKao</button>
      </div>
      <div className="logo-container">
        <img
          src="./images/logo.png"
          alt="mainImage"
          className="img-fluid logo-image"
        />
      </div>
    </div>
    
      
    );
  };


  
export default Result;