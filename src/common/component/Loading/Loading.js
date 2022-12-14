import React from 'react';
import {Background, LoadingText} from '../../Styles';
import Spinner from "react-bootstrap/Spinner";
import icon from '../../../assets/ezgif.com-gif-maker.gif';
import icon2 from '../../../assets/ezgif.com-gif-maker (1).gif';

export const Loading = () => {
    return(
        <Background>
            {/*<LoadingText>잠시만 기다려 주세요.</LoadingText>*/}
            {/*<Spinner animation="grow" variant="info" />*/}
            {/*<img src={icon2} alt="test" width="30px" height="30px" />*/}
            <img src={icon} alt="로딩중" width="7%" />
        </Background>
        )
};

export default Loading;
