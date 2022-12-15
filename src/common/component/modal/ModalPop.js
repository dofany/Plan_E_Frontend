import React, {useState} from 'react';
import {Button, Modal} from "react-bootstrap";

function ModalPop(props) {
    console.log('----모달 호출 됨----');
    console.log(props);
    // 모달 초기화
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    // if(props.modalForm.open) {
    //     setShow(true);
    // }
    const handleCloseCancel = () => {
        setShow(false);
        props.modalForm.callback(false);
    };
    const handleCloseOk = () => {
        setShow(false);
        props.modalForm.callback(true);
    };


    return(
        <Modal
            show={props.modalForm.open}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>{props.modalForm.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.modalForm.text}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={ handleCloseOk }>확인</Button>
                <Button variant="secondary" onClick={ handleCloseCancel }>취소</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalPop;
