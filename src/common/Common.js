import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Loading from "./component/Loading/Loading";

// api 호출 공통 함수

export const CommonAxios = (url, data, methodType, callback) => {
    
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios(
            {
                url : "/api" + url,
                data : data,
                method : methodType,
                contentType : "application/json; charset=utf=8",
                enctype : "multipart/form-data" // form태그 데이터 전송
            }
        ).then((response) => {
            callback(response.data);
        }).catch(function(error){
            JSON.stringify(error);
        }).finally(function(){
            setLoading(false);
        });
    }, [] );
    

    // 로딩바 리턴
    return (
        <div>{loading && <Loading />}</div>
    );
}
