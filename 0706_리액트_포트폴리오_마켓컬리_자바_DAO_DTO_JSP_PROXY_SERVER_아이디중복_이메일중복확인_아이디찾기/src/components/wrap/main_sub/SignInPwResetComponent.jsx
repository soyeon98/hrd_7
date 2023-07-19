import React from 'react';
import {Link} from 'react-router-dom';
import '../scss/singin_pw_reset.scss';


export default function SignInPwResetComponent () {

    const [userPw, serUserPw] = React.useState('');
    const [userPw2, serUserPw2] = React.useState('');

    const onChangeNewPw=(e)=>{
        e.preventDefault();
        serUserPw(e.target.value);
    }
    
    const onChangeNewPw2=(e)=>{
        e.preventDefault();
        serUserPw2(e.target.value);
    }

    const onClickPwSave=(e)=>{
        e.preventDefault();
        alert('새비밀번호가 저장되었습니다.');
        window.location.pathname = "/signin";
    }

    return (
        <main id='signInPwReset'>
            <section id="secino1">
                <div className="container">
                    <div className="title">
                        <h2>비밀번호 재설정</h2>
                    </div>
                    <div className="content">
                        <form>
                            <ul>
                                <li><label htmlFor="userPw">새 비밀번호 등록</label></li>
                                <li>
                                    <input 
                                    onChange={onChangeNewPw}
                                    type="password" 
                                    name='user_pw' 
                                    id='userPw' 
                                    value={userPw} 
                                    placeholder='새 비밀번호를 입력해 주세요'
                                    />
                                </li>
                                <li><label htmlFor="userPw2">새 비밀번호 확인</label></li>
                                <li>
                                    <input 
                                    onChange={onChangeNewPw2}
                                    type="password" 
                                    name='user_pw2' 
                                    id='userPw2' 
                                    value={userPw2}  
                                    placeholder='새 비밀번호를 한 번 더 입력해 주세요'
                                    />
                                </li>
                                <li><button onClick={onClickPwSave}>확인</button></li>
                            </ul>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
};