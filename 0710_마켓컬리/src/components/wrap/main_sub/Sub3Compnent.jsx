import React from 'react';
import axios from 'axios';
import Sub3CompnentChild from './Sub3CompnentChild';
import '../scss/sub1.scss';

export default function Sub3Compnent  ({setViewProduct}) {

    const [state,setState] = React.useState({
        알뜰쇼핑:[]
    });
    const getAlProduct=()=>{
        axios({
            url:'./data/sub_page/product.json',
            method:'GET'
        })
        .then((res)=>{
         
            setState({
                ...state,
                알뜰쇼핑:res.data.알뜰쇼핑
            });
        })
        .catch((err)=>{
            console.log("AXIOS 오류",err);
        })
    } 
    React.useEffect(()=>{
        getAlProduct();
    },[]);

    const [isClass,setIsClass]=React.useState([true,true,true,true,true]);
    const [subH,setSubH]=React.useState([0,0,0,0,0]); 
    const subRef = React.useRef([]);
    
    React.useEffect(()=>{
        subH.map((item,idx)=>{
            subH[idx]=subRef.current[idx].offsetHeight;
        })
    },[]);

    const onClickCategory=(e,n)=>{
        e.preventDefault();
    
        if(isClass[n] === true){
            isClass[n] = false;
            subRef.current[n].style.height = `0px`;
        }
        else{
            isClass[n] = true;
            subRef.current[n].style.height = `${subH[n]}px`;
        }
        setIsClass([...isClass]);
    }
    
    return (
        <main id='sub1'>
            <section id="section1">
                <div className="container">
                    <div className="gap">
                        <div className="content">
                            <a href="!#">
                                <img src="./images/sub1/0HpXehniZlRXiBeSfEFpPK8rSl35tGLPMUOwNNWK.png" alt="" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <section id="section2">
                <div className="container">
                    <div className="gap">
                        <div className="title">
                            <h2>알뜰쇼핑</h2>
                        </div>
                        <div className="content">
                            <div className="left">
                                <div className="left-title">
                                    <strong>필터</strong>
                                    <span>
                                        <img src="./images/sub1/icon_format.svg" alt="" />
                                        <em>초기화</em>
                                    </span>
                                </div>
                                <div className="left-content">
                                    <div>
                                        <a onClick={(e)=>onClickCategory(e,0)} href="!#" className={`category-btn category1 ${isClass[0]?` on`:''}`}><span>카테고리</span><img src="./images/sub1/icon_up.svg" alt="" /></a>
                                        <div ref={(obj)=>(subRef.current[0]=obj)} className="sub">
                                            <ul>
                                            <li>
                                                <label htmlFor="">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1'  value={'샐러드 간편식'} />
                                                        샐러드 간편식
                                                </label>
                                                </li> 
                                            <li>
                                                <label htmlFor="">
                                                        <input type="checkbox" name='category1_chk2' id='category1Chk2'  value={'과일·견과·쌀'} />
                                                        과일·견과·쌀
                                                </label>
                                                </li> 
                                            <li>
                                                <label htmlFor="">
                                                        <input type="checkbox" name='category1_chk3' id='category1Chk3'  value={'국·반찬·메인요리'} />
                                                        국·반찬·메인요리
                                                </label>
                                                </li> 
                                            <li>
                                                <label htmlFor="">
                                                        <input type="checkbox" name='category1_chk4' id='category1Chk4'  value={'면·양념·오일'} />
                                                        면·양념·오일
                                                </label>
                                                </li> 
                                            <li>
                                                <label htmlFor="">
                                                        <input type="checkbox" name='category1_chk5' id='category1Chk5'  value={'수산·해산·건어물'} />
                                                        수산·해산·건어물
                                                </label>
                                                </li> 
                                            <li>
                                                <label htmlFor="">
                                                        <input type="checkbox" name='category1_chk6' id='category1Chk6'  value={'생활용품·리빙·캠핑'} />
                                                        생활용품·리빙·캠핑
                                                </label>
                                                </li> 
                                            <li>
                                                <label htmlFor="">
                                                        <input type="checkbox" name='category1_chk7' id='category1Chk7'  value={'헤어·바디·구강'} />
                                                        헤어·바디·구강
                                                </label>
                                                </li> 
                                            <li>
                                                <label htmlFor="">
                                                        <input type="checkbox" name='category1_chk8' id='category1Chk8'  value={'베이커리·치즈·델리'} />
                                                        베이커리·치즈·델리
                                                </label>
                                                </li> 
                                            <li>
                                                <label htmlFor="">
                                                        <input type="checkbox" name='category1_chk9' id='category1Chk9'  value={'베이비·키즈·완구'} />
                                                        베이비·키즈·완구
                                                </label>
                                                </li> 
                                            <li>
                                                <label htmlFor="">
                                                        <input type="checkbox" name='category1_chk10' id='category1Chk10'  value={'생수·음료·우유·커피'} />
                                                        생수·음료·우유·커피
                                                </label>
                                                </li> 
                                            <li>
                                                <label htmlFor="">
                                                        <input type="checkbox" name='category1_chk11' id='category1Chk11'  value={'건강식품'} />
                                                        건강식품
                                                </label>
                                                </li> 
                                            </ul>
                                        </div>
                                        <a onClick={(e)=>onClickCategory(e,1)} href="!#" className={`category-btn category2 ${isClass[1]?` on`:''}`}><span>브랜드</span><img src="./images/sub1/icon_up.svg" alt="" /></a>
                                        <div ref={(obj)=>(subRef.current[1]=obj)} className="sub">
                                            <ul>
                                            <li>
                                                <label htmlFor="">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1'  value={'샐러드 간편식'} />
                                                        샐러드 간편식
                                                </label>
                                                </li> 
                                            <li>
                                                <label htmlFor="">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1'  value={'과일·견과·쌀'} />
                                                        과일·견과·쌀
                                                </label>
                                                </li> 
                                            <li>
                                                <label htmlFor="">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1'  value={'국·반찬·메인요리'} />
                                                        국·반찬·메인요리
                                                </label>
                                                </li> 
                                            <li>
                                                <label htmlFor="">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1'  value={'면·양념·오일'} />
                                                        면·양념·오일
                                                </label>
                                                </li> 
                                            <li>
                                                <label htmlFor="">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1'  value={'수산·해산·건어물'} />
                                                        수산·해산·건어물
                                                </label>
                                                </li> 
                                            <li>
                                                <label htmlFor="">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1'  value={'생활용품·리빙·캠핑'} />
                                                        생활용품·리빙·캠핑
                                                </label>
                                                </li> 
                                            <li>
                                                <label htmlFor="">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1'  value={'헤어·바디·구강'} />
                                                        헤어·바디·구강
                                                </label>
                                                </li> 
                                            <li>
                                                <label htmlFor="">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1'  value={'베이커리·치즈·델리'} />
                                                        베이커리·치즈·델리
                                                </label>
                                                </li> 
                                            <li>
                                                <label htmlFor="">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1'  value={'베이비·키즈·완구'} />
                                                        베이비·키즈·완구
                                                </label>
                                                </li> 
                                            <li>
                                                <label htmlFor="">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1'  value={'생수·음료·우유·커피'} />
                                                        생수·음료·우유·커피
                                                </label>
                                                </li> 
                                            <li>
                                                <label htmlFor="">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1'  value={'건강식품'} />
                                                        건강식품
                                                </label>
                                                </li> 
                                            </ul>
                                        </div>
                                        <a onClick={(e)=>onClickCategory(e,2)} href="!#" className={`category-btn category3 ${isClass[2]?` on`:''}`}><span>가격</span><img src="./images/sub1/icon_up.svg" alt="" /></a>
                                        <div ref={(obj)=>(subRef.current[2]=obj)} className="sub">
                                            <ul>
                                            <li>
                                                <label htmlFor="">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1'  value={'샐러드 간편식'} />
                                                        샐러드 간편식
                                                </label>
                                                </li> 
                                            <li>
                                                <label htmlFor="">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1'  value={'과일·견과·쌀'} />
                                                        과일·견과·쌀
                                                </label>
                                                </li> 
                                            <li>
                                                <label htmlFor="">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1'  value={'국·반찬·메인요리'} />
                                                        국·반찬·메인요리
                                                </label>
                                                </li> 
                                            <li>
                                                <label htmlFor="">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1'  value={'면·양념·오일'} />
                                                        면·양념·오일
                                                </label>
                                                </li> 
                                            <li>
                                                <label htmlFor="">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1'  value={'수산·해산·건어물'} />
                                                        수산·해산·건어물
                                                </label>
                                                </li> 
                                            <li>
                                                <label htmlFor="">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1'  value={'생활용품·리빙·캠핑'} />
                                                        생활용품·리빙·캠핑
                                                </label>
                                                </li> 
                                            <li>
                                                <label htmlFor="">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1'  value={'헤어·바디·구강'} />
                                                        헤어·바디·구강
                                                </label>
                                                </li> 
                                            <li>
                                                <label htmlFor="">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1'  value={'베이커리·치즈·델리'} />
                                                        베이커리·치즈·델리
                                                </label>
                                                </li> 
                                            <li>
                                                <label htmlFor="">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1'  value={'베이비·키즈·완구'} />
                                                        베이비·키즈·완구
                                                </label>
                                                </li> 
                                            <li>
                                                <label htmlFor="">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1'  value={'생수·음료·우유·커피'} />
                                                        생수·음료·우유·커피
                                                </label>
                                                </li> 
                                            <li>
                                                <label htmlFor="">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1'  value={'건강식품'} />
                                                        건강식품
                                                </label>
                                                </li> 
                                            </ul>
                                        </div>
                                        <a onClick={(e)=>onClickCategory(e,3)} href="!#" className={`category-btn category4 ${isClass[3]?` on`:''}`}><span>혜택</span><img src="./images/sub1/icon_up.svg" alt="" /></a>
                                        <div ref={(obj)=>(subRef.current[3]=obj)} className="sub">
                                            <ul>
                                            <li>
                                                <label htmlFor="">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1'  value={'샐러드 간편식'} />
                                                        샐러드 간편식
                                                </label>
                                                </li> 
                                            <li>
                                                <label htmlFor="">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1'  value={'과일·견과·쌀'} />
                                                        과일·견과·쌀
                                                </label>
                                                </li> 
                                            <li>
                                                <label htmlFor="">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1'  value={'국·반찬·메인요리'} />
                                                        국·반찬·메인요리
                                                </label>
                                                </li> 
                                            <li>
                                                <label htmlFor="">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1'  value={'면·양념·오일'} />
                                                        면·양념·오일
                                                </label>
                                                </li> 
                                            <li>
                                                <label htmlFor="">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1'  value={'수산·해산·건어물'} />
                                                        수산·해산·건어물
                                                </label>
                                                </li> 
                                            <li>
                                                <label htmlFor="">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1'  value={'생활용품·리빙·캠핑'} />
                                                        생활용품·리빙·캠핑
                                                </label>
                                                </li> 
                                            <li>
                                                <label htmlFor="">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1'  value={'헤어·바디·구강'} />
                                                        헤어·바디·구강
                                                </label>
                                                </li> 
                                            <li>
                                                <label htmlFor="">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1'  value={'베이커리·치즈·델리'} />
                                                        베이커리·치즈·델리
                                                </label>
                                                </li> 
                                            <li>
                                                <label htmlFor="">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1'  value={'베이비·키즈·완구'} />
                                                        베이비·키즈·완구
                                                </label>
                                                </li> 
                                            <li>
                                                <label htmlFor="">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1'  value={'생수·음료·우유·커피'} />
                                                        생수·음료·우유·커피
                                                </label>
                                                </li> 
                                            <li>
                                                <label htmlFor="">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1'  value={'건강식품'} />
                                                        건강식품
                                                </label>
                                                </li> 
                                            </ul>
                                        </div>
                                        <a onClick={(e)=>onClickCategory(e,4)} href="!#" className={`category-btn category5 ${isClass[4]?` on`:''}`}><span>유형</span><img src="./images/sub1/icon_up.svg" alt="" /></a>
                                        <div ref={(obj)=>(subRef.current[4]=obj)} className="sub">
                                            <ul>
                                            <li>
                                                <label htmlFor="">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1'  value={'샐러드 간편식'} />
                                                        샐러드 간편식
                                                </label>
                                                </li> 
                                            <li>
                                                <label htmlFor="">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1'  value={'과일·견과·쌀'} />
                                                        과일·견과·쌀
                                                </label>
                                                </li> 
                                            <li>
                                                <label htmlFor="">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1'  value={'국·반찬·메인요리'} />
                                                        국·반찬·메인요리
                                                </label>
                                                </li> 
                                            <li>
                                                <label htmlFor="">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1'  value={'면·양념·오일'} />
                                                        면·양념·오일
                                                </label>
                                                </li> 
                                            <li>
                                                <label htmlFor="">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1'  value={'수산·해산·건어물'} />
                                                        수산·해산·건어물
                                                </label>
                                                </li> 
                                            <li>
                                                <label htmlFor="">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1'  value={'생활용품·리빙·캠핑'} />
                                                        생활용품·리빙·캠핑
                                                </label>
                                                </li> 
                                            <li>
                                                <label htmlFor="">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1'  value={'헤어·바디·구강'} />
                                                        헤어·바디·구강
                                                </label>
                                                </li> 
                                            <li>
                                                <label htmlFor="">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1'  value={'베이커리·치즈·델리'} />
                                                        베이커리·치즈·델리
                                                </label>
                                                </li> 
                                            <li>
                                                <label htmlFor="">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1'  value={'베이비·키즈·완구'} />
                                                        베이비·키즈·완구
                                                </label>
                                                </li> 
                                            <li>
                                                <label htmlFor="">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1'  value={'생수·음료·우유·커피'} />
                                                        생수·음료·우유·커피
                                                </label>
                                                </li> 
                                            <li>
                                                <label htmlFor="">
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1'  value={'건강식품'} />
                                                        건강식품
                                                </label>
                                                </li> 
                                            </ul>
                                        </div>
                                    </div>                                    

                                </div>
                            </div>
                            <div className="right">
                                <div className="right-title">
                                    <strong>총 215건</strong>
                                    <span>
                                        <a href="!#" className='order-btn'><span>추천순</span><img src="./images/sub1/icon_question.svg" alt="" /></a>
                                        <i>|</i>
                                        <a href="!#" className='order-btn on'>신상품순</a>
                                        <i>|</i>
                                        <a href="!#" className='order-btn'>판매량순</a>
                                        <i>|</i>
                                        <a href="!#" className='order-btn'>혜택순</a>
                                        <i>|</i>
                                        <a href="!#" className='order-btn'>낮은 가격순</a>
                                        <i>|</i>
                                        <a href="!#" className='order-btn'>높은 가격순</a>
                                    </span>
                                </div>
                                <div className="right-content">
                                
                                <Sub3CompnentChild 알뜰쇼핑={state.알뜰쇼핑} setViewProduct={setViewProduct}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>                          
            </section>
        </main>
    );
};


