import React, {useEffect, useState} from 'react';
import axios from 'axios';
import ToastPop from './component/toast/ToastPop';

// api 호출 공통 함수

export const CommonAxios = (url, params, methodType, callback) => {
    useEffect(() => {
        axios(
            {
                url : "/api" + url,
                params : params,
                method : methodType,
                contentType : "application/json; charset=utf=8",
                enctype : "multipart/form-data" // form태그 데이터 전송
            }
        ).then((res) => {
            callback(res.data);
        }).catch((res) => {
            AuthLoginErr(res); 
        })
    }, [] );
}

export const AuthLoginErr = (res) => {
    if(res.response.status !== 200) {
        if(res.response.status === 403) {
            ToastPop({
                toastOpenYn: true,
                type: 'error',
                message: "세션이 만료되었습니다. 다시 로그인해주세요.",
                options: {
                    sec: 2000,
                },
                callback: () => {
                    document.location.href = '/'
                }
            });
        }else{
            ToastPop({
                toastOpenYn: true,
                type: 'error',
                message: "요청에 실패하였습니다.",
                options: {
                    sec: 2000,
                },
                callback: () => {
                    document.location.href = '/'
                }
            });
        }
    }
}
