import React from 'react';
import './scss/main_modal.scss';
import { GlobalContext } from '../../context/GlobalContext';

export default function MainmodalComponent () {

    const {mainModalShowOut,mainModalOneYearShowOut}=React.useContext(GlobalContext);

    const onClickModalYearClose=(e)=>{
        e.preventDefault();
        mainModalOneYearShowOut();
      
    }
    const onClickModalClose=(e)=>{
        e.preventDefault();
        mainModalShowOut();
    }


    return (
        <div id='mainModal'>
            <div className="container">
                <div className="content">
                    <div className="modal">
                        <div className="img-box">
                            <img src="./images/intro/47ba90e5-40a4-4bfd-b1f6-e8b444942a9d.jpg" alt="" />
                        </div>
                        <div className="button-box">
                            <button onClick={onClickModalYearClose}>다시 안 보기</button>
                            <button onClick={onClickModalClose}>닫기</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
