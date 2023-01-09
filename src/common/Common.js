import React, {useEffect, useState} from 'react';
import axios from 'axios';

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
        ).then((response) => {
            callback(response.data);
        }).catch((response) => {
            if(response.response.status !== 200) {
                if(response.response.status === 403) {
                    alert("세션이 만료되었습니다.");
                    document.location.href = "/";
                }
            } else {
                alert("요청에 실패하였습니다.");
            }
        })
    }, [] );
}
