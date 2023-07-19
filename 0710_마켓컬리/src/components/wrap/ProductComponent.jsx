import React from 'react';
import viewProductImg from './img/product/14083281-ebe0-49f2-8a4a-90f8d277737a.jpg';
import iconHeart from './img/product/heart_icon.svg';
import iconBell from './img/product/bell_icon.svg';
import './scss/product.scss';
import { CartContext } from '../../context/CartContext';
import { GlobalContext } from '../../context/GlobalContext';

export default function ProductComponent () {

    const {cartCountNumber}=React.useContext(CartContext);
    const {viewProductKey,cartProductKey}=React.useContext(GlobalContext);

    const [cnt, setCnt] = React.useState(1);
    const [state,setState] = React.useState({
        상품:{},
        key: cartProductKey,
    })
    const [isCart, setIsCart]  = React.useState(false);
    const [isCartOk, setIsCartOk]  = React.useState(false);

    const {상품, key} = state;

    React.useEffect(()=>{
        
        setState({
            ...state,
            상품 : {
                ...state.상품,
                수량: cnt,
                총상품금액: Math.round(cnt*(상품.정가*(1-상품.할인율)))
            }
        })
    },[cnt,state.상품]);

    // 개수 증가 함수
    const onClickAdd=(e)=>{
        e.preventDefault();
      
        setCnt(cnt+1);
        setIsCart(true);
    }
    // 개수 감소 함수
    const onClickSub=(e)=>{
        e.preventDefault();
    
        if(cnt<=1) return;               
        setCnt(cnt-1);
        setIsCart(true);
    }

    React.useEffect(()=>{
        if(localStorage.getItem(viewProductKey)!==null){
            let result =JSON.parse(localStorage.getItem(viewProductKey));
        
            setState({
                ...state,
                상품:result[0]

            })
        }
    },[])

    const onClickCart=(e)=>{
        e.preventDefault();

        // 수량 총금액 계산값이 없다면
        if(isCart===false){  // + - 수량증감 변화가 없는상태 즉 수량증감 버튼 클릭안한상태
            setState({
                ...state,
                상품 : {
                    ...state.상품,
                    수량: 1,
                    총상품금액: Math.round(1*(상품.정가*(1-상품.할인율)))
                }
            })
        }
        setIsCart(false);
        setIsCartOk(true); // 장바구니 버튼 클릭 했다.

    }

    React.useEffect(()=>{
        let arr = [];

        if(isCartOk===true){  //장바구니를 클릭하면 실행

            if(localStorage.getItem(cartProductKey)===null){ // 저장소가 비어있으면 배열 생성, 저장
                arr = [상품]
            }
            else{ // 저장소가 비어져있지 않으면 기존 배열에 1행 상품목록을 추가
                arr = JSON.parse(localStorage.getItem(cartProductKey));
                const result = arr.map((item)=>item.제품코드===상품.제품코드?true:false)
                arr.map((item)=>item.제품코드===상품.제품코드?{...item,수량:item.수량+=상품.수량,총상품금액:item.총상품금액+=상품.총상품금액}:item);
                if(result.includes(true)!==true){
                    arr=[상품,...arr]
                }
                console.log(result);
               
                // 중복 데이터 비교 후 수량, 금액 합산
            }
            localStorage.setItem(cartProductKey, JSON.stringify(arr) ); 
            setIsCartOk(false);  // 다음에 다시 클릭할 경우 초기화  버튼 클릭 안한 상태로 다시 유지
            cartCountNumber(arr.length);   // 여기에서 최상위 컴포넌트에게 수량을 전달한다. 그럼 최상위 컴포넌트는 헤더컴포넌트에게 프롭스로 전달한다.
            setCnt(1);
        }

    },[isCartOk])

    React.useEffect(()=>{
        if(localStorage.getItem(cartProductKey)!==null){
            let arr = JSON.parse(localStorage.getItem(cartProductKey));
            cartCountNumber(arr.length);
        }
    },[]);

    const commaPrice=(price)=>{
        let value = price.toString();
        const regExp =/(^\d+)(\d{3})/g;
        
        while(regExp.test(value)){
            return value.replace(regExp, '$1,$2');
        }
    }


    return (
        <div id='product'>
            <div className="container">
                <section id="section1">
                    <div className="content">
                        <div className="left">
                            <div className="img-box">
                                <img src={상품.이미지} alt="" />
                            </div>
                        </div>
                        <div className="right">
                            <div className="top">
                                <ul>
                                    <li><h4>{상품.배송구분}</h4></li>
                                    <li><h2>{`[${상품.제조사}]${상품.제품명}`}</h2></li>
                                    <li><p>{상품.제품특성}</p></li>
                                    <li>
                                        {
                                            상품.할인율 > 0 && <span>{Math.round(상품.할인율*100)}%&nbsp;&nbsp;&nbsp;</span>
                                        }<strong>{(상품.정가*(1-상품.할인율)).toLocaleString('ko-KR')}원</strong>
                                    </li>
                                    <li><em>{commaPrice(Math.round(상품.정가))}원</em></li>
                                    <li><h5>로그인 후, 할인 및 적립 혜택이 제공됩니다.</h5></li>
                                    <li><a href="!#">컬리카드 - 최대 <strong>934원</strong> 적립 + 첫 결제 3만원 할인</a></li>
                                </ul>
                            </div>
                            <div className="middle">
                                <ul>
                                    <li>
                                        <div className="col1">
                                            배송
                                        </div>
                                        <div className="col2">
                                            <strong>{상품.배송구분}</strong><br />
                                            <p>23시 전 주문 시 내일 아침 7시 전 도착(대구·부산·울산 샛별배송 운영시간 별도 확인)</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="col1">
                                            판매자
                                        </div>
                                        <div className="col2">
                                            {상품.판매처}
                                        </div>
                                    </li>
                                    <li>
                                        <div className="col1">
                                            포장타입
                                        </div>
                                        <div className="col2">
                                            <strong>냉동 (종이포장)</strong><br />
                                            <p>택배배송은 에코 포장이 스티로폼으로 대체됩니다.</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="col1">
                                            판매단위
                                        </div>
                                        <div className="col2">
                                            1팩
                                        </div>
                                    </li>
                                    <li>
                                        <div className="col1">
                                            중량/용량
                                        </div>
                                        <div className="col2">
                                            프렌치랙(300g) + 시즈닝(10g)
                                        </div>
                                    </li>
                                    <li>
                                        <div className="col1">
                                            <strong>원산지</strong>
                                        </div>
                                        <div className="col2">
                                            <strong>상품설명/상세정보 참조</strong>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="col1">
                                            알레르기정보
                                        </div>
                                        <div className="col2">
                                            -시즈닝 : 본 제품은 대두, 밀, 우유, 돼지고기, 쇠고기, 토마토, 고등어, 게, 새우, 계란, 닭고기, 오징어, 복숭아, 호두, 조개류, 메밀, 땅콩, 아황산류, 잣을 사용한 제품과 같은 제조시설에서 제조하고 있습니다. 
                                        </div>
                                    </li>
                                    <li>
                                        <div className="col1">
                                            유통기한(또는 소비기한)정보
                                        </div>
                                        <div className="col2">
                                            출고일 기준, 유통기한 만기 155일 이상 남은 상품을 보내드립니다. (총유통기한 : 365일)
                                        </div>
                                    </li>
                                    <li>
                                        <div className="col1">
                                            상품선택
                                        </div>
                                        <div className="col2">
                                            {상품.제조사}{상품.제품명} <br />
                                            적립제외상품
                                        </div>
                                    </li>
                                    <li>
                                        <div className="col1">
                                            &nbsp;
                                        </div>
                                        <div className="col2">
                                            <div className="count-number-price">
                                                <div className="col2-left">
                                                    <button onClick={onClickSub}>-</button>
                                                    <span>{cnt}</span>
                                                    <button onClick={onClickAdd}>+</button>
                                                </div>
                                                <div className="col2-right">
                                                    <em>{(상품.정가*1).toLocaleString('ko-KR')}원</em>
                                                    <strong>{(상품.정가*(1-상품.할인율)).toLocaleString('ko-KR')}원</strong>
                                                </div>
                                            </div>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                            <div className="bottom">
                                <div className="total-calc">
                                    <h2>총 상품금액 : <strong>{(cnt*(상품.정가*(1-상품.할인율))).toLocaleString('ko-KR')}</strong><em>원</em></h2>
                                    <p><em>적립</em> 로그인 후, 할인 및 적립 혜택 제공</p>
                                </div>
                                <div className="cart-btn-box">
                                    <button><img src={iconHeart} alt="" /></button>
                                    <button><img src={iconBell} alt="" /></button>
                                    <button  onClick={onClickCart}>장바구니 담기</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="section2">
                    <div className="content"></div>
                </section>
                <section id="section3">
                    <div className="content"></div>
                </section>
                <section id="section4">
                    <div className="content"></div>
                </section>
                <section id="section5">
                    <div className="content"></div>
                </section>
                <section id="section6">
                    <div className="content"></div>
                </section>
                <section id="section7">
                    <div className="content"></div>
                </section>
                <section id="section8">
                    <div className="content"></div>
                </section>
                <section id="section9">
                    <div className="content"></div>
                </section>
                <section id="section10">
                    <div className="content"></div>
                </section>
                <section id="section11">
                    <div className="content"></div>
                </section>
                <section id="section12">
                    <div className="content"></div>
                </section>
                <section id="section13">
                    <div className="content"></div>
                </section>
            </div>
        </div>
    );
};
