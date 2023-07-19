import React from 'react';
import {Link} from 'react-router-dom';
import '../scss/signin_id_result.scss';
import {useSearchParams} from 'react-router-dom';

export default function SignInIdSearchResultComponent () {

    const [param, setParam] = useSearchParams();  
    const user_id = param.get('user_id');

 

    const [userId, setUserId] = React.useState('moonjong');
    const [gaib, setGaib] = React.useState('2019.01.01');

    const onClickPwSearch=(e)=>{
        e.preventDefault();
        window.location.pathname = '/pwSearch';
    }

    const onClickLogin=(e)=>{
        e.preventDefault();
        window.location.pathname = '/signin';
    }
   

    return (
        <main id='signInIdResult'>
            <section id="secino1">
                <div className="container">
                    <div className="title">
                        <h2>고객님의 컬리 계정을 찾았습니다.</h2>
                        <p>아이디 확인 후 로그인 해주세요.</p>
                    </div>
                    <div className="content">
                        <form>
                            <ul>
                                <li>
                                    <span><img src="./images/sigin_in/icon_id_search_result.svg" alt="" /></span>
                                    <span>
                                        <strong>{userId}</strong>
                                        <em>가입일 {gaib}</em>
                                    </span>
                                </li>
                                <li></li>
                                <li><button onClick={onClickPwSearch}>비밀번호찾기</button></li>
                                <li><button onClick={onClickLogin}>로그인</button></li>
                            </ul>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
};