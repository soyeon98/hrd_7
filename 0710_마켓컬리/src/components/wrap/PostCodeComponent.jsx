import React from 'react';
import PostCode from 'react-daum-postcode';
import './scss/post_code.scss';
import { GlobalContext } from '../../context/GlobalContext';

export default function PostCodeComponent() {

    const [state,setState]=React.useState({
        주소1:'',
        주소2:'',
        우편번호:'',
        영문주소:''
    });

    const {addressAuto,postCodeClose} = React.useContext(GlobalContext);

    const {주소1,주소2,우편번호,영문주소} =state;

    const onCompletePost = (data) => {
        if(data.address!==null){
            setState({
                ...state,
                주소1:data.address,
                우편번호:data.zonecode,
                영문주소:data.addressEnglish
            })
        }

    }

    const onChangeAdde1=(e)=>{
        setState({
            ...state,
            주소1:e.target.value
        })
    }

    // 주소2 입력상자 이벤트
    const onChangeAddr2=(e)=>{
        setState({
            ...state,
            주소2:e.target.value
        })
    }

    // 주소 저장

    const onClickSave=(e)=>{
        e.preventDefault();
        const addr={
            주소1:주소1,
            주소2:주소2
        }
        sessionStorage.setItem('SYADDRESS',JSON.stringify(addr));
        postCodeClose();
    }

    return (
        <div id='postCode'>
            <div className="container">
                <div className="contents">
                    <div class="gap">
                        <div class="title">
                            <h1><strong>샛별배송</strong><span> 지역입니다.</span></h1>
                            <h2>매일 새벽, 문 앞까지 신선함을 전해드려요.</h2>
                        </div>
                        <div class="content">
                            <ul>
                                <li>
                                    <div class="input-box box1">
                                        <input 
                                            type="text" name="api_addr1" id="apiAddr1" 
                                            placeholder="주소검색 API 검색 주소 바인딩" 
                                            value={`(${우편번호}) ${주소1}`}
                                            disabled={true}
                                            onChange={onChangeAdde1}
                                        />
                                        <button onClick="sample2_execDaumPostcode();"><img src="./images/sign_up/search.svg" alt="" />재검색</button>
                                    </div>
                                </li>
                                <li>
                                    <div class="input-box box2">
                                        <input type="text" name="api_addr2" id="apiAddr2" placeholder="나머지 주소를 입력해 주세요" value={주소2} onChange={onChangeAddr2}/>
                                    </div>
                                </li>
                                <li>
                                    <p>
                                        ※ 저장된 배송지는 최대 7일 간 임시 저장 후 자동 삭제됩니다.<br />
                                        로그인 할 경우, 회원님의 배송지 목록에 추가됩니다.
                                    </p>
                                </li>
                                <li>
                                    <button class="save" type="button" onClick={onClickSave}>저장</button>
                                </li>
                                <li>
                                    <h4><img src="./images/popup/notice_14_14_f03f40.svg" alt="" />샛별배송 지역 중 배송불가 장소 안내</h4>
                                </li>
                                <li>
                                    <h5>관공서 / 학교 / 병원 / 시장 / 공단지역 / 산간지역 / 백화점 등</h5>
                                    <a class="more-view-btn" href="!#">자세히 보기<img src="./images/popup/ico_arrow_down_11x10.svg" alt="" /></a>
                                    <div class="sub">
                                        <ul>
                                            <li>가락동농수산물도매시장</li>
                                            <li>가락동농수산물시장</li>
                                            <li>가천대학교</li>
                                            <li>고려대학교안암캠퍼스</li>
                                            <li>고매동 일부(일부지역만 배송가능)</li>
                                            <li>국립중앙박물관</li>
                                            <li>국민대학교</li>
                                            <li>덕성여자대학교</li>
                                            <li>덕양구 신원동 일부(일부지역만 배송가능)</li>
                                            <li>도내동 일부(원흥지구만 배송가능)</li>
                                            <li>동덕여자대학교</li>
                                            <li>반월특수지구</li>
                                            <li>서경대학교</li>
                                            <li>서울사이버대학교</li>
                                            <li>서울시립대학교</li>
                                            <li>서울여자대학교</li>
                                            <li>성균관대학교</li>
                                            <li>성신여자대학교</li>
                                            <li>세종대학교</li>
                                            <li>연세대학교</li>
                                            <li>이화여자대학교</li>
                                            <li>한국외국어대학교</li>
                                            <li>홍익대학교</li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <PostCode id="post"
                        autoClose
                        onComplete={onCompletePost}
                        style={{ width: "100%", height: '100%', border: 0 }}
                    />
                </div>


            </div>

        </div>
    );
};

