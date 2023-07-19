import React from 'react';
import { Link } from 'react-router-dom';
import '../scss/sign_in_id_search.scss';

export default function SignInPwSearchComponent () {

    // 타이머 상태관리 변수
    const [minutes,setMinutes] = React.useState(0);
    const [seconds,setSeconds] = React.useState(0);

    const [isTab,setIsTab] = React.useState(false);
    const [isBtn,setIsBtn] = React.useState(false);
    const [isBtn2,setIsBtn2] = React.useState(false);

    // 휴대폰 인증
    const [userid,setUserName] = React.useState('');
    const [userHp,setUserHp] = React.useState('');
    // 이메일 인증
    const [userid2,setUserName2] = React.useState('');
    const [userEmail,setUserEmail] = React.useState('');
    // 인증키
    const [isAuth,setisAuth] = React.useState(false);
    const [userHpAuth,setUserHpAuth] = React.useState('');
    // useRef
    const userid1Ref = React.useRef();
    const userHpRef = React.useRef();
    const userid2Ref = React.useRef();
    const userEmailRef = React.useRef();

    const onChangeUserId=(e)=>{ //이름 입력상자
        setUserName(e.target.value);
    }
    const onChangeUserId2=(e)=>{ //이름 입력상자
        setUserName2(e.target.value);
    }
    const onChangeUserHp=(e)=>{ //휴대폰 입력상자
        setUserHp(e.target.value);
    }
    const onChangeUserEmail=(e)=>{ //이메일 입력상자
        setUserEmail(e.target.value);
    }
    const onChangeAuth=(e)=>{ //인증번호 입력상자
        setUserHpAuth(e.target.value);
    }

    const onClickTabBtn =(e,value)=>{
        e.preventDefault();
        if(value==='휴대폰'){
            setIsTab(false);
        }
        else{
            setIsTab(true);
        }
    }

    const onClickDel =(e,value)=>{
        e.preventDefault();
        if(value==='userid'){
            setUserName('');
            userid1Ref.current.focus();
        }
        else if(value==='userid2'){
            setUserName2('');
            userid2Ref.current.focus();
        }
        else if(value==='userHp'){
            setUserHp('');
            userHpRef.current.focus();
        }
        else if(value==='userEmail'){
            setUserEmail('');
            userEmailRef.current.focus();
        }
    }

    const onClickHpAuth = (e)=>{
        e.preventDefault();
        setisAuth(true);
    }
    const onClickHpAuthOk = (e)=>{
        e.preventDefault();
        // 인증확인됐다고 가정
        // 비밀번호 재 설정 페이지로 이동
        window.location.pathname='/pwReset'
    }

    // 타이머함수
    React.useEffect(()=>{
        let setId=0;
        let startTime=0;
        let nowTime=0;
        let endTime=0;

        const timerCount=()=>{
            console.log('timer');
        }
        if(isAuth===true){
            timerCount();
        }

    },[isAuth]);


    React.useEffect(()=>{
        if(isTab===false){
            (userid!=='' && userHp!=='')?setIsBtn(true):setIsBtn(false)
        }
        else{
            (userid2!=='' && userEmail!=='')?setIsBtn2(true):setIsBtn2(false)
        }
    },[userid,userHp,userEmail])

    return (
        <div id='signInPwSearch' className='signInSearch'>
                    <section id="section1">
                <div className="container">
                    <div className="title">
                        <h2>비밀번호 찾기</h2>
                    </div>
                    <div className="content">
                        <form action="">
                            <ul>
                                <li>
                                    <button onClick={(e)=>onClickTabBtn(e,'휴대폰')} className={isTab?'':'on'}>휴대폰 인증</button>
                                    <button onClick={(e)=>onClickTabBtn(e,'이메일')} className={isTab?'on':''}>이메일 인증</button>
                                </li>
                                {
                                    !isTab?
                                    (
                                        <>
                                            <li><label htmlFor="userid">아이디</label></li>
                                            <li>
                                                <input type="text" name='user_id' id='userid' placeholder='아이디를 입력해 주세요' onChange={onChangeUserId} value={userid} ref={userid1Ref} />
                                                {   userid!==''&&
                                                    <a onClick={(e)=>onClickDel(e,'userid')}href="!#"><img src="./images/sign_in/icon_del.svg" alt="" /></a>
                                                }
                                            </li>
                                            <li><label htmlFor="userHp">휴대폰 번호</label></li>
                                            <li>
                                                <input type="text" name='user_hp' id='userHp' placeholder='휴대폰번호를 입력해 주세요' onChange={onChangeUserHp} value={userHp} ref={userHpRef} />
                                                 {  userHp!==''&&
                                                    <a onClick={(e)=>onClickDel(e,'userHp')}href="!#"><img src="./images/sign_in/icon_del.svg" alt="" /></a>
                                                }
                                            </li>
      
                                            {
                                                isAuth &&(
                                                    <>
                                                        <li><label htmlFor="userHpAuth">인증번호</label></li>
                                                        <li></li>
                                                        <li>
                                                            <input type="text" name='user_hp_auth' id='userHpAuth' placeholder='인증번호 7자리' onChange={onChangeAuth} value={userHpAuth} />
                                                            <button>재발송</button>
                                                            <span>
                                                                <em>{minutes<10?`0${minutes}`:minutes}</em>
                                                                <i>:</i>
                                                                <em>{seconds<10?`0${seconds}`:seconds}</em>
                                                            </span>
                                                        </li>
                                                    </>
                                                )
                                            }
                                            <li className='hp-btn'>
                                            {        
                                                !isAuth ?
                                                    (<button onClick={onClickHpAuth} className={isBtn?'on':''}>인증번호 받기</button>)
                                                    :
                                                    (<button onClick={onClickHpAuthOk} className={isBtn?'on':''}>확인</button>)
                                            }
                                            </li>
                                        </>
                                    )
                                    :
                                    (                                  
                                        <>
                                            <li><label htmlFor="userid2">아이디</label></li>
                                            <li>
                                                <input type="text" name='user_id2' id='userid2' placeholder='아이디를 입력해 주세요' onChange={onChangeUserId2} value={userid2} ref={userid2Ref}/> 
                                                {   userid2!==''&&
                                                    <a onClick={(e)=>onClickDel(e,'userid2')}  href="!#"><img src="./images/sign_in/icon_del.svg" alt="" /></a>
                                                }
                                            </li>
                                            <li><label htmlFor="userEmail">이메일</label></li>
                                            <li>
                                                <input type="email" name='user_email' id='userEmail' placeholder='이메일을 입력해 주세요' onChange={onChangeUserEmail} value={userEmail} ref={userEmailRef}/>
                                                {   userEmail!==''&&
                                                    <a onClick={(e)=>onClickDel(e,'userEmail')} href="!#"><img src="./images/sign_in/icon_del.svg" alt="" /></a>
                                                }
                                            </li>
                                            <li></li>
                                            <li><button className={isBtn2?'on':''}>받기</button></li>
                                        </>
                                    )
                                }


                                
                            </ul>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};


