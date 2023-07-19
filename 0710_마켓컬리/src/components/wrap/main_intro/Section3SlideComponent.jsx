import React from 'react';

export default function Section3SlideComponent ({상품,n,setViewProduct}) {

    const slideWrap = React.useRef();
    const [cnt, setCnt] = React.useState(0);


    // 판매가격, 정가 콤마형식
    const commaPrice=(price)=>{
        let value = price.toString();
        const regExp =/(^\d+)(\d{3})/g;
        
        while(regExp.test(value)){
            return value.replace(regExp, '$1,$2');
        }
    }
    React.useEffect(()=>{
        slideWrap.current.style.transition = `all 0.6s ease-in-out`;
        slideWrap.current.style.left = `${-100*cnt}%`;
        // 오른쪽 끝 정지
        if(cnt>(n/4-2)){ // 20/4=5 => 0 1 2 3 4
            setCnt(n/4-2);
            slideWrap.current.style.left = `${-100*(n/4-2)}%`; 
        }

        // 왼쪽 끝 정지
        if(cnt<=0){ //
            setCnt(0);
            slideWrap.current.style.left = `${-100*0}%`; 
        }

    },[cnt]);

    const onClickNext=(e)=>{
        e.preventDefault();
        setCnt(cnt+1);
    }
    const onClickPrev=(e)=>{
        e.preventDefault();
        setCnt(cnt-1);
    }

    const onClickProductList=(e,item)=>{
        e.preventDefault();
       let obj={
        제품코드:item.제품코드,
        이미지:`http://localhost:3000/images/sub1/${item.이미지}`,
        배송구분:item.배송구분,
        제조사:item.제조사,
        제품명:item.제품명,
        제품특성:item.제품특성,
        정가:item.정가,
        할인율:item.할인율,
        판매가: Math.round(item.정가*(1-item.할인율)),
        판매처:item.판매처,
        보관방법:item.보관방법,
        저장일시: new Date().getTime()
       }
       console.log(obj);
       setViewProduct(obj);
       // 상세페이지 이동
       window.location.pathname='/product'
    }

    return (
        <>        
            <div className="container">
                <div className="gap">
            <div className="title">
                <h2>이 상품 어때요?</h2>
            </div>
            <div className="content">
                <div className="slide-container">
                    <div className="slide-view">
                        <ul ref={slideWrap} className="slide-wrap">
                            { 
                                상품.map((item)=>{
                                    return(
                                        <li  className="slide" key={item.제품코드}>
                                            <div className="col-gap">
                                                <a href="!#" onClick={(e)=>onClickProductList(e, item)}>
                                                    <div className="img-box">
                                                        <img src= {`./images/sub1/${item.이미지}`} alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_kart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>
                                                            <li>{}</li>
                                                            <li><strong>[{item.제조사}]</strong><em>{item.제품명}</em></li>
                                                            <li>{}</li>
                                                            <li><span className='rate-price'>{item.할인율===0? '':`${Math.round(item.할인율*100)}%`}</span><span className='panme-price'>{commaPrice(Math.round(item.정가*(1-item.할인율)))}원</span></li>
                                                            <li>{item.할인율 === 0 ? '':<s> {commaPrice(item.정가)}원 </s>}</li>
                                                            <li>후기</li>
                                                        </ul>      
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                    )
                                })

                            }
                        </ul>
                    </div>
                </div>
            </div>
                </div>
            </div>
            <a onClick={onClickPrev} href="!#" className='left-arrow-btn'><img src="./images/intro/ico_lt_wht.svg" alt="" /></a>
            <a onClick={onClickNext} href="!#" className='right-arrow-btn'><img src="./images/intro/ico_lt_wht.svg" alt="" /></a>
        </>

    );
};

