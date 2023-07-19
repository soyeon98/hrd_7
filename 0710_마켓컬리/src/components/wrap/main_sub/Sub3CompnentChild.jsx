import React from 'react';

export default function Sub3CompnentChild({ 알뜰쇼핑, setViewProduct }) {

    const [list] = React.useState(12);
    const [pageNumber, setPageNumber] = React.useState(1);
    const [groupPage] = React.useState(5);
    const [cnt, setCnt] = React.useState(1);

    const [startNum, setStartNum] = React.useState();
    const [endNum, setEndNum] = React.useState();

    const onClickPageNum = (e, num) => {
        e.preventDefault();
        setPageNumber(num);
    }

    const onClickNextGroup = (e) => {
        e.preventDefault();
        setCnt(cnt + 1);
    }
    const onClickPrevGroup = (e) => {
        e.preventDefault();
        setCnt(cnt - 1);
    }

    React.useEffect(() => {
        setStartNum((cnt - 1) * groupPage);
    }, [cnt, groupPage]);

    React.useEffect(() => {
        setEndNum(startNum + groupPage);
        setPageNumber(startNum + 1);
    }, [startNum, groupPage]);

    const commaPrice = (price) => {
        let value = price.toString();
        const regExp = /(^\d+)(\d{3})/g;
        while (regExp.test(value)) {
            return value.replace(regExp, '$1,$2');
        }
    }

    const onClickProductList = (e, item) => {
        e.preventDefault();
        let obj = {
            제품코드: item.제품코드,
            이미지: `http://localhost:3000/images/sub2/${item.이미지}`,
            배송구분: item.배송구분,
            제조사: item.제조사,
            제품명: item.제품명,
            제품특성: item.제품특성,
            정가: item.정가,
            할인율: item.할인율,
            판매가: Math.round(item.정가 * (1 - item.할인율)),
            판매처: item.판매처,
            보관방법: item.보관방법,
            저장일시: new Date().getTime()
        }
        console.log(obj);
        setViewProduct(obj);
        // 상세페이지 이동
        window.location.pathname = '/product'
    }


    return (
        <>
            <ul>
                {
                    알뜰쇼핑.map((item, idx) => {
                        if (Math.ceil((idx + 1) / list) === pageNumber) {

                            return (
                                <li key={item.제품코드}>
                                    <a href="!#" onClick={(e) => onClickProductList(e, item)}>
                                        <div className="img-box">
                                            <img src={`./images/sub2/${item.이미지}`} alt="" />
                                            <span>
                                                <img src="./images/sub1/icon_kart.svg" alt="" />
                                            </span>
                                        </div>
                                        <div className="tit-box">
                                            <ul>
                                                <li>{item.샛별배송}</li>
                                                <li><strong>[{item.제조사}]</strong><em>{item.제품명}</em></li>
                                                <li>{item.제품특성}</li>
                                                <li><span className='rate-price'>{item.할인율 === 0 ? '' : `${Math.round(item.할인율 * 100)}%`}</span><span className='panme-price'>{commaPrice(Math.round(item.정가 * (1 - item.할인율)))}원</span></li>
                                                <li>{item.할인율 === 0 ? '' : <s> {commaPrice(item.정가)}원 </s>}</li>
                                                <li>{item.판매처}</li>
                                            </ul>
                                        </div>
                                    </a>
                                </li>
                            )
                        }
                    })
                }
            </ul>
            <div className="page-button-box">
                {cnt > 1 && <a href="!#" className="prev-btn" onClick={onClickPrevGroup}>&lt;</a>}
                {
                    (() => {
                        let totalRecord = 알뜰쇼핑.length;
                        let pageBtnNum = Math.ceil(totalRecord / list);
                        let arr = [];

                        for (let i = startNum; i < endNum; i++) {

                            arr = [...arr, <a href="!#" className={pageNumber === (i + 1) ? 'on' : ''} onClick={(e) => onClickPageNum(e, (i + 1))}>{i + 1}</a>];

                        }
                        return arr;
                    })()
                }
                {cnt < Math.ceil(알뜰쇼핑.length / list / groupPage) && <a href="!#" className="next-btn" onClick={onClickNextGroup}>&gt;</a>}
            </div>
        </>
    );
};

