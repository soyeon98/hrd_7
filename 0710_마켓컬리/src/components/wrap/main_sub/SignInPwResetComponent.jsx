import React from 'react';
import { Link } from 'react-router-dom';
import '../scss/sign_in_pw_reset.scss';

export default function SignInPwResetComponent () {

    const [userPw,setUserPw] = React.useState('');
    const [userPw2,setUserPw2] = React.useState('');

    const onChangeNewPw =(e)=>{
        setUserPw(e.target.value);
    }
    const onChangeNewPw2 =(e)=>{
        setUserPw2(e.target.value);
    }
    const onClickPwSave =(e)=>{
        e.preventDefault();
        alert('비밀번호가 저장되었습니다.');
        window.location.pathname='./signIn'
    }

    return (
        <div id='signInPwReset'>
            <section id="section1">
                <div className="container">
                    <div className="title">
                        <h2>비밀번호 재설정</h2>
                    </div>
                    <div className="content">
                        <form action="">
                            <ul>
                                <li><label htmlFor="userPw">새 비밀번호 등록</label></li>
                                <li>
                                    <input 
                                        type="text" name='user_pw' id='userPw' placeholder='새 비밀번호를 입력해 주세요' 
                                        value={''}
                                        onChange={onChangeNewPw}
                                    />
                                </li>
                                <li><label htmlFor="userPw2">새 비밀번호 확인</label></li>
                                <li>
                                    <input 
                                        type="password" name='user_pw2' id='userPw2' placeholder='새 비밀번호를 한번 더 입력해 주세요'  
                                        value={''}
                                        onChange={onChangeNewPw2}

                                    />
                                </li>

                                <li><button onClick={onClickPwSave}>확인</button></li>
                         
                            </ul>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};


