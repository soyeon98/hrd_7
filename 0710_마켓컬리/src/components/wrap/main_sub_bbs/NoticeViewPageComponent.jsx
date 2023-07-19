import React from 'react';
import axios from 'axios';
import './notice_scss/notice_view.scss';
import { ConfirmContext } from '../../../context/ConfirmContext';
// 쿼리스트링 => 키(listNum)와 키값(item.No)
// 파라미터 => 보내온 파라미터 데이터를 추출(검색)
import {useSearchParams} from 'react-router-dom';

export default function NoticeViewPageComponent () {

    const [param,setParam] = useSearchParams();
    const listNum = param.get('listNum');

    const [state,setState] = React.useState({
        공지사항:{}
    });
    const {공지사항} =state;
    React.useEffect(()=>{
        let formData = new FormData();
        formData.append('idx',listNum);
        axios({
            url:'/bbs1/bbsNoticeJSON.jsp',
            // method:'get'
            method:'post',
            data:formData // 해당하는 글번호, 키의 데이터
        })
        .then((res)=>{
            if(res.status===200){
                
                let result = res.data.공지사항.filter((item)=>item.번호===Number(listNum));
                
                setState({
                    ...state,
                    공지사항:result[0]
                })
         
            }
        })
        .catch((err)=>{
            console.log('AXIOS 실패'+ err);
        })
    },[listNum]);

    const {confirmModalOkCancelOpen,isConfirmOkcancelResult} = React.useContext(ConfirmContext);

    React.useEffect(()=>{
        if(isConfirmOkcancelResult==='확인'){
            alert('삭제되었습니다');
        }
    },[isConfirmOkcancelResult]);

    // 글목록 이동
    const onClickNoticeList=(e)=>{
        e.preventDefault();
        window.location.pathname='/notice';
    }

    // 글삭제
    const onClickDelete =(e)=>{
        e.preventDefault();
        confirmModalOkCancelOpen('글을 삭제하시겠습니까?');
    }
    // 글수정
    const onClickUpdate =(e)=>{
        e.preventDefault();
        window.location.pathname='/notice_update';
    }
    return (
        <div id='noticeView'>
            <div className="container">
                <div className="title">
                    <h2>공지사항</h2>
                    <p>컬리의 새로운 소식들과 유용한 정보들을 한곳에서 확인하세요.</p>
                </div>
                <div className="content">
                    <ul>
                        <li>
                            <div className="left">제목</div>
                            <div className="right">{공지사항.제목}</div>
                        </li>
                        <li>
                            <div className="left">작성일</div>
                            <div className="right">{공지사항.작성일}</div>
                        </li>
                        <li>
                            <div className="left">작성자</div>
                            <div className="right">{공지사항.작성자}</div>
                        </li>
                        <li>
                            <div className="contents">
                                {공지사항.제목}
                            </div>
                        </li>
                    </ul>
                    <div className="button-box">
                        <div className="left" >
                            <button onClick={onClickUpdate}>수정</button>
                            <button onClick={onClickDelete}>삭제</button>
                        </div>
                        <div className="right">
                            <button onClick={onClickNoticeList}>목록</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

