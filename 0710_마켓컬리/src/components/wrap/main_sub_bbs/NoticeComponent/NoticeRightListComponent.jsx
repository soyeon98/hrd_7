import React from "react";
import {Link} from 'react-router-dom';

export default function NoticeRightListComponent({notice}) {
    
    const [list] = React.useState(5);  // 한화면에 보여질 목록개수
    const [pageNumber, setPageNumber] = React.useState(1); // 페이지번호
    const [groupPage] = React.useState(5); // 페이지번호
    const [cnt, setCnt] = React.useState(1); // 페이지번호

    const [startNum,setStartNum] = React.useState();
    const [endNum,setEndNum] = React.useState();

    const onClickPageNum=(e, num)=>{
        e.preventDefault();
        setPageNumber(num);
    }

    const onClickNextGroup=(e)=>{
        e.preventDefault();
        setCnt(cnt+1);
    }
    const onClickPrevGroup=(e)=>{
        e.preventDefault();
        setCnt(cnt-1);
    }

    // 그룹 시작번호 설정 => cnt 또는 groupPage값 변경이 있거나 설정되었다면 시작번호 설정 실행
    React.useEffect(()=>{
        setStartNum((cnt-1)*groupPage);
    },[cnt,groupPage]);

    // 그룹 끝번호 설정 => startNum 또는 groupPage값 변경이 있거나 설정되었다면 끝번호 설정 실행
    React.useEffect(()=>{
        setEndNum(startNum+groupPage);
        setPageNumber(startNum+1);
    },[startNum,groupPage]);

    return (
        <div id='noticeRight'>
            <div className="container">
                <div className="title">
                    <h3>공지사항<span>컬리의 새로운 소식들과 유용한 정보들을 한곳에서 확인하세요.</span></h3>
                </div>           
                <div className="content">
                    <dl>
                        <dt>
                            <span>번호</span>
                            <span>제목</span>
                            <span>작성자</span>
                            <span>작성일</span>
                        </dt>                        

                        {
                            notice.map((item, idx)=>{

                                if( Math.ceil((idx+1)/list) === pageNumber ){ // 클릭번튼 번호 전달 1(100~86) 2(85~70) 3 4 5 6 7

                                    return(
                                        
                                            <dd key={item.NO}>
                                                <Link to={`/notice_view?listNum=${item.번호}`}>  {/* 글보기 페이지 */}
                                                    <span>{item.번호}</span>
                                                    <span>{item.제목}</span>
                                                    <span>{item.작성자}</span>
                                                    <span>{item.작성일}</span>
                                                </Link>
                                            </dd>
                                    )
                                 }
                            })        

                        }
                    </dl>

                    <div className="page-button-box">
                       {cnt>1&& <a href="!#" className="prev-btn" onClick={onClickPrevGroup}>&lt;</a> }
                        {
                            (()=>{
                                let totalRecord = notice.length;
                                let pageBtnNum = Math.ceil(totalRecord/list); // page-button-box 개수
                                let arr =[]; // 페이지번호롸 a 태그 모두 저장된 배열변수

                                for(let i=startNum;i<endNum;i++){
                                  
                                    arr = [...arr,<a href="!#" className={pageNumber===(i+1)?'on':''} onClick={(e)=>onClickPageNum(e,(i+1))}>{i+1}</a>];
                                    
                                }
                                return arr;
                            })()
                        }
                         {cnt < Math.ceil(notice.length/list/groupPage) && <a href="!#" className="next-btn" onClick={onClickNextGroup}>&gt;</a>}   
                    </div>    

                </div>
            </div>
        </div>
    );
};