import React from 'react';
import './scss/confirm_modal.scss';
import { ConfirmContext } from '../../context/ConfirmContext';

export default function ConfirmOkCancel () {

    const {confirmModalOkCancelClose,confirmMsgOkCancel} = React.useContext(ConfirmContext);

    // 삭제 모달창 취소 & 확인 버튼 클릭 이벤트 구현
    const onClickConfirmModalClose =(e,value)=>{
        e.preventDefault();
        
        confirmModalOkCancelClose(value);
    }

    return (
        <div id="confirmModal2">
            <div className="wrap">
                <div className="container">
                    <div className="content">
                        <div className="title-box">
                            <h1>{confirmMsgOkCancel}</h1>
                        </div>
                        <div className="button-box">
                            <button onClick={(e) => onClickConfirmModalClose(e, "취소")}>취소</button>
                            <button onClick={(e) => onClickConfirmModalClose(e, "확인")}>확인</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

