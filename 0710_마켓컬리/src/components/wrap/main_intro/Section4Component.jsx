import React from 'react';
import './scss/section4.scss';
import Section4SlideComponent from './Section4SlideComponent';
import axios from 'axios';

export default  function Section4Component ({setViewProduct})  {

    const [state,setState] = React.useState({
        일일특가:[]

    });

    const [timer,setTimer] = React.useState({
        hours:0,
        minutes:0,
        seconds:0
    });
    
    React.useEffect(()=>{
        axios({
            url:'./data/intro_page/section4.json',
            method:'get',
        })
        .then((res)=>{
            if(res.status===200){
                setState({
                    ...state,
                    일일특가:res.data.일일특가,
                    n:res.data.일일특가.length
                });
            }
        })
        .catch((err)=>{
            console.log(`AXIOS 실패 ${err}`);
        })
    },[]);



        React.useEffect(()=>{
            let setId=0;
            function saleTimer(){
                let start = new Date('2023-05-22 23:59:59');// 1. 타임세일 시작 시점
                let now = new Date();// 2. 현재시간 
                start.setHours(start.getHours()+24);// 3. 시간+24 일일특가 시간 셋팅 세터함수
                let end = start-now;  // 4. 남은 시간(세일 종료) = 타임세일시작시간(+24)-현재시간
        
                // 5. 카운트 박스 시 분 초 표기 1초 간격으로
                let eH=Math.floor(end/(60*60*1000)%24); //  시간 24시간
                let eM=Math.floor(end/(60*1000)%60); //   분 60분
                let eS=Math.floor(end/(1000)%60); //  초 60초
    
    
                // 6. 현재시간 >= 세일시간 이면 종료 모두(일,시,분,초) 초기화
                if(now >= start){
                    clearInterval(setId);
                    eH=0;
                    eM=0;
                    eS=0;
                    // $('.hours').text(eH<10?`0${eH}`:eH);
                    // $('.minutes').text(eM<10?`0${eM}`:eM);
                    // $('.seconds').text(eS<10?`0${eS}`:eS);   
                    setTimer({
                        ...timer,
                        hours:eH<10?`0${eH}`:eH,
                        minutes:eM<10?`0${eM}`:eM,
                        seconds:eS<10?`0${eS}`:eS

                    }) 
                }
                else{
                    // $('.hours').text(eH<10?`0${eH}`:eH);
                    // $('.minutes').text(eM<10?`0${eM}`:eM);
                    // $('.seconds').text(eS<10?`0${eS}`:eS);    
                    setTimer({
                        ...timer,
                        hours:eH<10?`0${eH}`:eH,
                        minutes:eM<10?`0${eM}`:eM,
                        seconds:eS<10?`0${eS}`:eS

                    }) 
                }
    
            }
    
            setId = setInterval(saleTimer,1000);
        },[]);
    return (
        <section id="section4">
            <div className="container">
                <div className="gap">
                    <div className="content">
                        <div className="left">
                            <ul>
                                <li>
                                    <h2>일일특가</h2>
                                </li>
                                <li>
                                    <h3>24시간 한정 특가</h3>
                                </li>
                                <li>
                                    <span><img src="./images/intro/icon_timer.svg" alt="" /></span>
                                    <span className='hours'>{timer.hours}</span>
                                    <span>:</span>
                                    <span className='minutes'>{timer.minutes}</span>
                                    <span>:</span>
                                    <span className='seconds'>{timer.seconds}</span>
                                </li>
                                <li>
                                    <p>망설이면 늦어요!</p>
                                </li>
                            </ul>
                        </div>
                        <Section4SlideComponent 일일특가={state.일일특가} setViewProduct={setViewProduct}/>
                    </div>
                </div>
            </div>
        </section>  
    );
};

