import React from 'react';
import axios from 'axios';
import NoticeLeftNavComponent from './NoticeComponent/NoticeLeftNavComponent';
import {useSearchParams} from 'react-router-dom';

export default function NoticeUpdatePageComponent() {

    const [param,setParam] = useSearchParams();
    const listNum = param.get('listNum');
    const [notice,setNotice] = React.useState({});

    React.useEffect(()=>{
        let formData = new FormData();
        formData.append('idx',listNum);
        axios({
            url:'./data/notice_page/board.json',
            method:'get'
            // method:'post',
            // data:formData // 해당하는 글번호, 키의 데이터
        })
        .then((res)=>{
            if(res.status===200){
                let result = res.data.notice.filter((item)=>item.NO===Number(listNum));

                setNotice(result[0]);
                setState({
                    ...state,
                    subject:result[0].제목,
                    contents:result[0].내용
                })

                console.log(notice);
            }
        })
        .catch((err)=>{
            console.log('AXIOS 실패'+ err);
        })

    
    },[listNum]);

    const [state, setState] = React.useState({
        subject:'',
        contents:''
    });
    const {subject, contents} = state;

    const onSubmitWrite=(e)=>{
        e.preventDefault();
        // axios()        
    }

    // 수정 시 입력
    const onChangeSubject=(e)=>{
        setState({
            ...state,
            subject: e.target.value,
        })
    }
    // 수정 시 입력
    const onChangeContents=(e)=>{
        setState({
            ...state,
            contents: e.target.value,
        })
    }

    const onClickSave =async(e)=>{
        e.preventDefault();
        sessionStorage.setItem('NOTICE_UPDATE',JSON.stringify(state));
        window.location.pathname="/notice";
    }
    const onClickNoticeList =(e)=>{
        e.preventDefault();
        window.location.pathname='/notice';
    }

    React.useEffect(()=>{


    },[notice]);

    return (

        <div id='noticeUpdate' className='notice-write'>
            <div className="container">
                <div className="left">
                    <NoticeLeftNavComponent />
                </div>
                <div className="right">
                    <div className="title">
                        <h2>공지사항 / 수정페이지</h2>
                    </div>
                    <div className="content">
                        <form onSubmit={onSubmitWrite}>
                            <ul>
                                <li>
                                    <label htmlFor="subject">제목<i>*</i></label>
                                    <input
                                        onChange={onChangeSubject}
                                        type="text"
                                        name='subject'
                                        id='subject'
                                        value={subject}
                                        placeholder='제목을 입력해 주세요'
                                    />
                                </li>
                                <li>
                                    <label htmlFor="contents">내용<i>*</i></label>
                                    <textarea
                                        onChange={onChangeContents}
                                        name="contents"
                                        id="contents"
                                        placeholder='내용을 입력해 주세요'
                                        value={contents}
                                    ></textarea>
                                </li>
                            </ul>
                            <div className="button-box">
                                <button className='update' onClick={onClickSave}>저장</button>
                                <button className='update' onClick={onClickNoticeList}>목록</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>


    );
};

