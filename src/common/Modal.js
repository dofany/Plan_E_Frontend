import React from 'react';
import {Background, LoadingText} from './Styles';
import Spinner from "react-bootstrap/Spinner";
import icon from '../assets/ezgif.com-gif-maker.gif';

export const Modal = () => {
    return(
        <Background>
            {/*<LoadingText>잠시만 기다려 주세요.</LoadingText>*/}
            {/*<Spinner animation="grow" variant="info" />*/}
            <img src={icon} alt="로딩중" width="5%" />
        </Background>
    )
};

export default Modal;
