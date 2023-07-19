import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import postcode from 'react-daum-postcode';
// 고정페이지
import NotView404PageComponent from './wrap/NotView404PageComponent';
import TopModalComponent from './wrap/TopModalComponent';
import HeaderComponent from './wrap/HeaderComponent';
import MainIntroComponent from './wrap/MainIntroComponent';

// 서브페이지
import Sub1Compnent from './wrap/main_sub/Sub1Compnent';
import Sub2Compnent from './wrap/main_sub/Sub2Compnent';
import Sub3Compnent from './wrap/main_sub/Sub3Compnent';
import Sub4Compnent from './wrap/main_sub/Sub4Compnent';
// 회원가입
import SignUpComponent from './wrap/main_sub/SignUpComponent';
// 로그인
import SignInComponent from './wrap/main_sub/SignInComponent';
import SignInIdSearchComponent from './wrap/main_sub/SignInIdSearchComponent';
import SignInPwResetComponent from './wrap/main_sub/SignInPwResetComponent';
import SignInPwSearchComponent from './wrap/main_sub/SignInPwSearchComponent';
// 최근 본 상품 상세페이지 컴포넌트
import ProductComponent from './wrap/ProductComponent';
// 장바구니
import CartComponent from './wrap/CartComponent';

// 게시판 BBS
import NoticeComponent from './wrap/main_sub_bbs/NoticeComponent';
import NoticeWriteFormPageComponent from './wrap/main_sub_bbs/NoticeWriteFormPageComponent';
import NoticeViewPageComponent from './wrap/main_sub_bbs/NoticeViewPageComponent';

// 고정페이지
import FooterComponent from './wrap/FooterComponent';
import ConfirmModal from './wrap/ConfirmModal';
import GoTopComponent from './wrap/GoTopComponent';
import QuickMenuComponent from './wrap/QuickMenuComponent';

// 컨텍스트 사용
import { AddressApiContext } from '../context/AddressApiContext';
import { ConfirmContext } from '../context/ConfirmContext';
import { CartContext } from '../context/CartContext';
import { GlobalContext } from '../context/GlobalContext';
import ConfirmOkCancel from './wrap/ConfirmOkCancel';
import NoticeUpdatePageComponent from './wrap/main_sub_bbs/NoticeUpdatePageComponent';

//메인 모달 => 로컬스로리지 dataTime 사용
import MainmodalComponent from './wrap/MainmodalComponent';
import PostCodeComponent from './wrap/PostCodeComponent';

export default function WrapComponent() {

    //주소검색 API 모달
    const [postModal,setPostModal]=React.useState(false);

    const postCodeClose=()=>{
        setPostModal(false);
    }
    // 헤더영역, 장바구니, 회원가입 폼 배송지 등록 및 변경
    const openPopupDaumPostApi = async () => {
        setPostModal(true);
    }

    // 메인모달 showIn showOut
    const [mainModal,setMainModal] =React.useState(true);

    // 메인모달 showIn / showOut 메서드
    const mainModalShowIn=()=>{
        setMainModal(true);
    }
    // 자식컴포넌트에서 클릭하면 닫히게
    const mainModalShowOut=()=>{
        setMainModal(false);
    }

    const mainModalOneYearShowOut=()=>{
        let toDay = new Date();
        toDay.setFullYear(toDay.getFullYear()+1);
        const obj={
            id:202306301151,
            mainModalExpires:toDay.getTime()
        }
        localStorage.setItem('MAINMODALONEYEARCLOSE',JSON.stringify(obj));
        setMainModal(false);
    }

    // 로딩시 로컬스토리지 데이터 중 MAINMODALONEYEARCLOSE 키를 이용 키값을 가져온다
    // 키값이 만료기한으로 남아 있다면 모달창을 열지 않고 지났다면 열여준다 
    React.useEffect(()=>{
       
        if( localStorage.getItem('MAINMODALONEYEARCLOSE')!==null){
            let result = JSON.parse(localStorage.getItem('MAINMODALONEYEARCLOSE'));
            let toDay = new Date();
            // toDay.setFullYear(toDay.getFullYear()+1);
            if(toDay >= result.expires){ // 만료일 지나면 모달 열린다
                setMainModal(true);
                localStorage.removeItem('MAINMODALONEYEARCLOSE');
            }
            else{ // 만료일 이전이면 모달 닫기(숨기기)
                setMainModal(false);
            }
        }
    });

    const [adminKey] = React.useState({
        topModalKey: 'SY_KURLY_TOPMODAL',
        addressKey: 'SYADDRESS',
        cartProductKey: 'SY_KURLY_CART_PRODUCT',
        viewProductKey: 'SY_VIEW_PRODUCT'
    },[]);

    const { topModalKey, addressKey, cartProductKey, viewProductKey } = adminKey;

    // 마켓컬리 주소 통합 상태관리
    const [addr, setAddr] = React.useState({
        주소1: '',
        주소2: '',
        isAddr: false
    });
    // 새로고침 시 자동 실행
    const addressAuto = async () => {
        if (sessionStorage.getItem(addressKey) !== null) {
            const 주소1 = JSON.parse(sessionStorage.getItem(addressKey)).주소1;
            const 주소2 = JSON.parse(sessionStorage.getItem(addressKey)).주소2;
            setAddr({
                주소1: 주소1,
                주소2: 주소2,
                isAddr: true
            })
        }
        return '';
    }
    // 로딩 시 실행
    React.useEffect(() => {
        addressAuto();
    }, [])



    // 장바구니 수량 카운트 상태 변수
    const [cartCount, setCartCount] = React.useState(0);

    // 징비구니 수량 카운트 상태 변수를 전달하는 함수
    const cartCountNumber = (num) => {
        setCartCount(num);
    }

    //네비게이션
    const [isIntro, setIsIntro] = React.useState(true);
    // 헤더영역에서 라우터 링크 이용 값을 변경한다
    const setIntroFn = (z) => {
        setIsIntro(z)
    }

    const [product, setProduct] = React.useState({
        key: viewProductKey,
        sign: false,
        getViewProduct: []
    });
    // 비구조화 구조분할할당
    const { getViewProduct, key, sign } = product;

    const setViewProduct = (value) => {
        let arr = [];
        if (localStorage.getItem(key) !== null) {
            arr = JSON.parse(localStorage.getItem(key));
            arr = [value, ...arr]
            localStorage.setItem(key, JSON.stringify(arr));
            setProduct({
                ...product,
                sign: !sign,
                getViewProduct: arr
            });
        }
        else {
            arr = [...arr, value];
            localStorage.setItem(key, JSON.stringify(arr));
            setProduct({
                ...product,
                sign: !sign,
                getViewProduct: arr
            });
        }

    }


    const [state, setState] = React.useState({
        minutes: 2,
        seconds: 59,
        setId: 0,
        msg: '',
        isEnd: false,
        //헤더의 프롭스로 전달하기
        mapText: '',
        isMap: true
    });

    const timerCounterFn = () => {
        let setId = 0;
        let minutes = 2;
        let seconds = 59;
        let msg = '';
        let isEnd = false;
        setId = setInterval(function () {
            seconds--;
            if (seconds < 0) {
                seconds = 59;
                minutes--;
                if (minutes < 0) {
                    clearInterval(setId);
                    seconds = 0;
                    minutes = 0;
                    msg = '유효시간이 경과되었습니다.'; //모달창 메시지
                    isEnd = true; //모달창 true
                }
            }
            setState({
                ...state,
                seconds: seconds,
                minutes: minutes,
                setId: setId,
                msg: msg,
                isEnd: isEnd
            })
        }, 1000);
    }

    const mapAddressFn = (z) => {
        setState({
            ...state,
            mapText: z,
            isMap: false
        })
    }

    //// 모달 상태관리 //////////////////////////////////////////
    const [modal, setModal] = React.useState({
        confirmMsg: '모달창에 자식창에서 보내온 메시지 내용',
        isConfirmModal: false,

        confirmMsgOkCancel: '확인 취소 컨펌모달창입니다',
        isConfirmOkcancel: false,
        isConfirmOkcancelResult: ''
    });

    const { confirmMsg, isConfirmModal, confirmMsgOkCancel, isConfirmOkcancelResult } = modal;

    // 삭제 확인,취소 컨펌 모달창 열기 메서드
    const confirmModalOkCancelOpen = (msg) => {
        setModal({
            ...modal,
            confirmMsgOkCancel: msg,
            isConfirmOkcancel: true
        })
    }
    // 삭제 확인,취소 컨펌 모달창 닫기 메서드
    const confirmModalOkCancelClose = (value) => {
        setModal({
            ...modal,
            isConfirmOkcancel: false,
            isConfirmOkcancelResult: value
        })
    }

    // 1. 모달창 닫기 이벤트 => 모달창에 있는 버튼 클릭이벤트 메서드 만들기
    const confirmModalClose = (e) => {
        setModal({
            ...modal,
            isConfirmModal: false
        })
    }
    // 2. 모달창 열기 이벤트 => 모든 자식 컴포넌트에서 모달 열기와 메시지 전달하기
    const confirmModalOpen = (msg) => {
        setModal({
            ...modal,
            isConfirmModal: true,
            confirmMsg: msg
        })
    }


    //// 1. 탑모달 //////////////////////////////////
    const [topModal, setTopModal] = React.useState({
        key: topModalKey,
        isTopModal: true
    });
    // 2. 탑모달 닫기 함수 => 쿠키설정
    const topModalClose = (value, expires) => {
        setTopModal({
            ...topModal,
            isTopModal: false
        })
        setCookieMethod(value, expires);
    }

    // 4. 쿠키 설정/저장 : 탑모달 닫기 클릭 시 쿠키 설정.저장
    const setCookieMethod = (value, expires) => {
        let toDay = new Date();
        toDay.setDate(toDay.getDate() + expires);
        document.cookie = `${topModal.key}=${value};path=/;expires=${toDay.toUTCString()};`;
    }
    // 5. 쿠키 가져오기 : 설정된 쿠키가 없으면 탑모달 열림 있으면(찾았다면 found) 닫힘
    const getCookieMethod = () => {
        // console.log(document.cookie);
        if (document.cookie === '') return; // 예외처리
        const result = document.cookie.split(';');
        let cookie = [];
        result.map((item, idx) => {
            cookie[idx] = {
                key: item.split('=')[0].trim(), //trim() 공백제거
                value: item.split('=')[1].trim()
            }
        });
        // console.log(cookie);
        // 찾기 key : 'SY_KURLY_TOPMODAL'
        cookie.map((item) => {

            if (item.key === topModal.key && item.value === 'yes') {
                setTopModal({
                    ...topModal,
                    isTopModal: false
                })
            }

        })
    }

    React.useEffect(() => {
        getCookieMethod();
    }, [topModal.isTopModal]);




    return (
        <div id='wrap'>
            <GlobalContext.Provider value={{ topModalKey, addressKey, cartProductKey, viewProductKey,mainModalShowOut,mainModalOneYearShowOut,addressAuto,postCodeClose}}>
                {
                    topModal.isTopModal && <TopModalComponent topModalClose={topModalClose} />
                }
                <ConfirmContext.Provider value={{ confirmMsg, confirmModalOpen, confirmModalClose, isConfirmModal, confirmModalOkCancelOpen, confirmModalOkCancelClose, confirmMsgOkCancel, isConfirmOkcancelResult }}>
                    <CartContext.Provider value={{ cartCountNumber, cartCount }}>
                        <AddressApiContext.Provider value={{ addr, openPopupDaumPostApi }}>
                            <BrowserRouter basename={process.env.PUBLIC_URL}>
                                <Routes>
                                    <Route path="/" element={<HeaderComponent setIntroFn={setIntroFn} />}>
                                        <Route index element={<MainIntroComponent setViewProduct={setViewProduct} />} />
                                        <Route path='/main' element={<MainIntroComponent setViewProduct={setViewProduct} />} />
                                        <Route path='/sub1' element={<Sub1Compnent setViewProduct={setViewProduct} />} />
                                        <Route path='/sub2' element={<Sub2Compnent setViewProduct={setViewProduct} />} />
                                        <Route path='/sub3' element={<Sub3Compnent setViewProduct={setViewProduct} />} />
                                        <Route path='/sub4' element={<Sub4Compnent setViewProduct={setViewProduct} />} />
                                        <Route path='/signup' element={<SignUpComponent timer={state} timerCounterFn={timerCounterFn} mapAddressFn={mapAddressFn} />} />
                                        <Route path='/signin' element={<SignInComponent />} />
                                        <Route path='/idSearch' element={<SignInIdSearchComponent />} />
                                        <Route path='/pwSearch' element={<SignInPwSearchComponent />} />
                                        <Route path='/pwReset' element={<SignInPwResetComponent />} />
                                        <Route path='/product' element={<ProductComponent />} />
                                        <Route path='/cart' element={<CartComponent confirmModalOpen={confirmModalOpen} />} />
                                        <Route path='/notice' element={<NoticeComponent />} />
                                        <Route path='/notice_write' element={<NoticeWriteFormPageComponent />} />
                                        <Route path='/notice_view' element={<NoticeViewPageComponent />} />
                                        <Route path='/notice_update' element={<NoticeUpdatePageComponent />} />
                                        <Route path='/*' element={<NotView404PageComponent />} />
                                    </Route>
                                </Routes>
                            </BrowserRouter>
                        </AddressApiContext.Provider>

                        <FooterComponent />

                        {
                            modal.isConfirmModal && <ConfirmModal />
                        }
                        {
                            modal.isConfirmOkcancel && <ConfirmOkCancel />
                        }
                        {
                            mainModal&&<MainmodalComponent/>
                        }
                        {
                            postModal&&<PostCodeComponent/>
                        }
                    </CartContext.Provider>
                </ConfirmContext.Provider>
                <GoTopComponent />
                <QuickMenuComponent product={product} isIntro={isIntro} />
            </GlobalContext.Provider>
        </div>
    );
};