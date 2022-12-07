import React, {useState} from 'react';
import {Button, Modal} from "react-bootstrap";

function ModalPop(props, {modalClose}) {
    // 모달 초기화
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const handleCloseCancel = () => {
        setShow(false);
        props.modalClose(false);
    };
    const handleCloseOk = () => {
        setShow(false);
        props.modalClose(true);
    };


    return(
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.text}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={ handleCloseCancel }>
                    취소
                </Button>
                <Button variant="primary" onClick={ handleCloseOk }>확인</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalPop;
