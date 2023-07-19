import React from 'react';
import './scss/quick_menu.scss';
import $ from 'jquery';
import deliveryInfo from './img/deliveryInfo.png'
import ico_arrow_up from'./img/ico_arrow_up.svg';
import ico_arrow_down from'./img/ico_arrow_down.svg';

export default function QuickMenuComponent ({product,isIntro})  {

    const [state, setState] = React.useState({
        isFixed:false,
        isViewProduct:true,
    });

    const [viewData, setViewData] = React.useState([]);
    // 스크롤이벤트 동작 시 스크롤 탑값이 섹션1에 탑값에 도달하면 
    // fixed로 구현한다.
    React.useEffect(()=>{
        let sec1Top = 0;
        let isFixed =false;
        let quickMenu = $('#quickMenu');

        try{
            sec1Top =$('#section1').scrollTop()+40;
        }
        catch(e){
           
        }
            
        $(window).scroll(function(){
            if( $(window).scrollTop()>=sec1Top){
                isFixed=true;
                 quickMenu.css({marginTop:-quickMenu.height()/2})
            }
            else{
                isFixed =false;
                quickMenu.css({marginTop:0})
            }
            setState({
                ...state,
                isFixed:isFixed
            })
        });
    },[state.isFixed]);

    // 로컬스토레이지 getItem();
    const getLocalStorage=()=>{  
        let key = 'SY_VIEW_PRODUCT';
        
        if(localStorage.getItem(product.key)!==null){
            let viewData = JSON.parse(localStorage.getItem(key));
            setViewData( viewData );
        }

    }

 


    React.useEffect(()=>{       
        getLocalStorage();
    },[]);


    React.useEffect(()=>{
        getLocalStorage();
    },[product.sign]);

    // 최근 본 상품 위 아래 슬라이드 이동
    const refList  = React.useRef();
    const [cnt, setCnt]  = React.useState(1);

    const listMainSlide=()=>{
        refList.current.style.transition = 'all .6s ease-in-out'; 
        refList.current.style.transform = `translateY(${-84*cnt}px)`;
    }
    
    React.useEffect(()=>{        
        listMainSlide();
    },[cnt]);

    // 최근 본상품 위로 클릭이벤트
    const onClickUpEvent=(e)=>{
        e.preventDefault();
        
        if( cnt <= viewData.length-4 ){
            setCnt(cnt=>cnt+1);
        } 

    }
    // 최근 본상품 아래로 클릭이벤트
    const onClickDownEvent=(e)=>{
        e.preventDefault();
        
        if( cnt > 0 ){ 
            setCnt(cnt=>cnt-1);
        }      

    }

    


    return (
        <div id='quickMenu' className={ `${isIntro?'intro':''} ${state.isFixed?`on`:''}`} >
            <ul>
                <li>
                    <a href="!#">
                        <img src={deliveryInfo} alt="" />
                    </a>
                </li>
                <li>
                    <span><a href="!#">등급별혜택</a></span>
                    <span><a href="!#">레시피</a></span>
                </li>
                <li className='view-product'>
                      {
                        state.isViewProduct && (
                        <div>
                            <span><a href="!#" onClick={onClickDownEvent}><img src={ico_arrow_up} alt="" /></a></span>
                            <h3>최근 본상품</h3>
                            <div className="view-box">
                                <ul className='wrap-box' ref={refList}>
                                    {
                                        viewData.map((item,idx)=>{
                                            return(
                                                <li key={idx}><a href="!#"><img src={item.이미지} alt="" /></a></li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>    
                            <span onClick={onClickUpEvent}><a href="!#"><img src={ico_arrow_up} alt="" /></a></span>                    
                        </div>
                        )
                    }
                </li>
            </ul>
        </div>
    );
};

