import React from 'react';
import './scss/section1_slide.scss'

export default function Section1SlideComponent ({슬라이드,n})  {

    // React.useEffect(()=>{
    //     slide.map((item)=>{
    //         console.log(item.src);
    //     });
    // },[]);
    const slideWrap = React.useRef(); // 제이쿼리 돔 요소 선택자
  
    const [cnt,setCnt] = React.useState(0)

    React.useEffect(()=>{
        slideWrap.current.style.width=`${(n+2)*100}%`;
    })
    React.useEffect(()=>{
        slideWrap.current.style=`left:${-(100*cnt)}%`;
        slideWrap.current.style.transition='all 0.6s ease-in-out';
        // 처음으로 리턴 : 계속 롤링하기 위해
        if(cnt>n){
            slideWrap.current.style=`left:0`;
            slideWrap.current.style.transition='none';
            setCnt(1);
        }
        // 
        if(cnt<0){
            slideWrap.current.style=`left:${-100*n}%`;
            slideWrap.current.style.transition='none';
            setCnt(n-1);
        }
    },[cnt])

    const onClickNext=(e)=>{
        e.preventDefault();
        setCnt(
            
           cnt+1
        )
    }
    const onClickPrev=(e)=>{
        e.preventDefault();
        setCnt(cnt-1)
    }

    const onClickEvent=(e)=>{
        e.preventDefault();
    }
    return (
        <div className="slide-container">
            <div className="slide-view">
                <ul ref={slideWrap} className="slide-wrap">
                    {
                        슬라이드.map((item,idx)=>{
                            return(
                                <li className="slide" key={idx}><a onClick={onClickEvent} href="!#"><img src={item.src} alt="" /></a></li>
                            )
                        })
                     
                    }
                   
                </ul>
            </div>
            
            <a href="!#" className='left-arrow-btn' onClick={onClickPrev}><img src="./images/intro/ico_arrow_gray.svg" alt="" /></a>
            <a href="!#" className='right-arrow-btn' onClick={onClickNext} ><img src="./images/intro/ico_arrow_gray.svg" alt="" /></a>
            <span className='page-count-box'>
                <em className='current-number'>{cnt+1>n?1:cnt+1}</em>
                <i>/</i>
                <em className='total-number'>{n}</em>
            </span>

        </div>
    );
};

