import React from 'react';
import { ConfirmContext } from '../../../context/ConfirmContext';
import '../scss/sign_in_id_search.scss';


export default function SignInIdSearchComponent () {

    const {confirmModalOpen} = React.useContext(ConfirmContext);

    // 타이머 상태관리 변수
    const [minutes,setMinutes] = React.useState(0);
    const [seconds,setSeconds] = React.useState(0);
    

    const [isTab,setIsTab] = React.useState(false);
    const [isBtn,setIsBtn] = React.useState(false);
    const [isBtn2,setIsBtn2] = React.useState(false);

    // 휴대폰 인증
    const [userName,setUserName] = React.useState('');
    const [userHp,setUserHp] = React.useState('');
    // 이메일 인증
    const [userName2,setUserName2] = React.useState('');
    const [userEmail,setUserEmail] = React.useState('');
    // 인증키
    const [isAuth,setisAuth] = React.useState(false);
    const [userHpAuth,setUserHpAuth] = React.useState('');
    // useRef
    const userName1Ref = React.useRef();
    const userHpRef = React.useRef();
    const userName2Ref = React.useRef();
    const userEmailRef = React.useRef();
    


   


    const onChangeUserName=(e)=>{ //이름 입력상자
        setUserName(e.target.value);
    }
    const onChangeUserName2=(e)=>{ //이름 입력상자
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
        if(value==='userName'){
            setUserName('');
            userName1Ref.current.focus();
        }
        else if(value==='userName2'){
            setUserName2('');
            userName2Ref.current.focus();
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

        let authNum = Math.round(Math.random()*(9000000+100000));
        setUserHp(authNum);
        confirmModalOpen(`인증번호가 발송되었습니다 ${authNum}`);

    }
    const onClickHpAuthOk = (e)=>{
        e.preventDefault();
        // 인증확인됐다고 가정
        // 비밀번호 재 설정 페이지로 이동
        window.location.pathname='/pwReset'
    }

    React.useEffect(()=>{
        if(isTab===false){
            (userName!=='' && userHp!=='')?setIsBtn(true):setIsBtn(false)
        }
        else{
            (userName2!=='' && userEmail!=='')?setIsBtn2(true):setIsBtn2(false)
        }
    },[userName,userHp,userEmail]);

        // 타이머함수
        React.useEffect(()=>{
            let setId=0;
            let startTime=0;
            let nowTime=0;
            let endTime=0;
            let now = new Date();
    
            const timerCount=()=>{
                startTime= new Date(now);
                nowTime= new Date();

                startTime.setMinutes(startTime.getMinutes()+3);
                endTime = startTime-nowTime;
                if(nowTime >= startTime){
                    clearInterval(setId);
                    setMinutes(0);
                    setSeconds(0);
                }
                else{
                    let m = Math.floor(endTime/(60*1000)%60);
                    let s = Math.floor(endTime/(1000)%60);
                    setMinutes(m);
                    setSeconds(s);
                }
            }
            if(isAuth===true){
                setId=setInterval(timerCount,1000);
            }
    
        },[isAuth]);

    return (
        <div id='signInIdSearch' className='signInSearch'>
            <section id="section1">
                <div className="container">
                    <div className="title">
                        <h2>아이디 찾기</h2>
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
                                            <li><label htmlFor="userName">이름</label></li>
                                            <li>
                                                <input type="text" name='user_name' id='userName' placeholder='이름을 입력해 주세요' onChange={onChangeUserName} value={userName} ref={userName1Ref} />
                                                {   userName!==''&&
                                                    <a onClick={(e)=>onClickDel(e,'userName')}href="!#"><img src="./images/sign_in/icon_del.svg" alt="" /></a>
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
                                                            <input type="text" name='user_hp_auth' id='userHpAuth' placeholder='인증번호 7자리' onChange={onChangeAuth} value={userHpAuth}/>
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
                                            <li><label htmlFor="userName2">이름</label></li>
                                            <li>
                                                <input type="text" name='user_name2' id='userName2' placeholder='이름을 입력해 주세요' onChange={onChangeUserName2} value={userName2} ref={userName2Ref}/> 
                                                {   userName2!==''&&
                                                    <a onClick={(e)=>onClickDel(e,'userName2')}  href="!#"><img src="./images/sign_in/icon_del.svg" alt="" /></a>
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


