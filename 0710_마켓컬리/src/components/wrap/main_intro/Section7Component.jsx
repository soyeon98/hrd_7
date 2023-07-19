import React from 'react';
import $ from 'jquery';
import './scss/section7.scss';
import Section7SlideComponent from './Section7SlideComponent';
import axios from 'axios';

export default function Section7Component({setViewProduct})  {

    // 1. state상태관리 변수 지정 상태관리 - 배열변수,상품개수 n
    // 2. AXIOS 외부데이터 상품 가져오기 그리고 변수에 데이터 넣기 
    // 3. React.useEffect() 상품개수 등록되면 즉시 슬라이드 전체너비 설정하기
    // 4. 상태변수 데이터를 자식컴포넌트에게 내려준다.
    // 5. 자식컴포넌트는 비구조화로 변수 받아서 템플릿 요소에 반복처리 바인딩한다.

    // 1.
    const [state,setState] = React.useState({
        상품:[],
        n:0
    });

    React.useEffect(()=>{
        axios({
            url:'./data/intro_page/section7.json',
            method:'get',
        })
        .then((res)=>{
            if(res.status===200){
                setState({
                    ...state,
                    상품:res.data.상품,
                    n:res.data.상품.length
                });
            }
        })
        .catch((err)=>{
            console.log(`AXIOS 실패 ${err}`);
        })
    },[]);

        // React.useEffect(()=>{
        //     const $slideContainer =$('#section7 .slide-container');
        //     const $slideWrap =$('#section7 .slide-wrap');
        //     const $slide =$('#section7 .slide-wrap .slide');
        //     const $leftArrowBtn = $('#section7 .left-arrow-btn');
        //     const $rightArrowBtn = $('#section7 .right-arrow-btn');
        //     let cnt=0;
        //     let n=state.n/4
        //     $slideWrap.css({width:`${25*state.n}%`})
        //     //1. 메인슬라이드함수
        //     function mainSlide(){
        //         $slideWrap.stop().animate({left:`${cnt*-100}%`},600,function(){  
        //             if(cnt>=n-1){
        //                 $rightArrowBtn.stop().fadeOut(600);
        //             }  
        //             else{
        //                 $rightArrowBtn.stop().fadeIn(600);
        //             }
        //             if(cnt<=0){
        //                 $leftArrowBtn.stop().fadeOut(600);
        //             }
        //             else{
        //                 $leftArrowBtn.stop().fadeIn(600);
        //             }
        //         });
        //     }
        //     //2-1. 다음 카운트 함수
        //     function nextCount(){
        //         cnt++;
        //         if(cnt>=n-1){cnt=n-1}              
        //         mainSlide();
        //     }
        //     //2-2. 이전 카운트 함수
        //     function prevCount(){
        //         cnt--;
        //         if(cnt<=0){cnt=0}
        //         mainSlide();
        //     }
        //     //3. 다음 화살버튼 클릭 이벤트
        //     $leftArrowBtn.on({
        //         click(e){
        //             e.preventDefault();
        //             prevCount();
        //         }
        //     });
        //     $rightArrowBtn.on({
        //         click(e){
        //             e.preventDefault();
        //             nextCount();
        //         }
        //     });
    
        // },[state.n]);

    return (
        <section id="section7">
             <Section7SlideComponent 상품={state.상품} n={state.n} setViewProduct={setViewProduct}/>

        </section>
    );
};

