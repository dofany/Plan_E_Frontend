import React, {useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import {render} from "react-dom";

function ModalPop({open, setPopup, message, title, callback}) {

    const handleClose = () => {
        setPopup({open: false});
    }
    const handleCloseCancel = () => {
        setPopup({open: false});
        if(callback) {
            callback(false);
        }
    };
    const handleCloseOk = () => {
        setPopup({open: false});
        if(callback) {
            callback(true);
        }
    };


    return(
        <>
        <Modal
            show={open}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {message}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={ handleCloseOk }>확인</Button>
                <Button variant="secondary" onClick={ handleCloseCancel }>취소</Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}
export default ModalPop;
