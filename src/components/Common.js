import {useEffect} from 'react';
import axios from 'axios';
import ToastPop from '../components/Toast/ToastPop';


// api 호출 공통 함수
// axios.post('/api/userAthn/signUp', {
//     'email': signUpInputValue.userEmail,
//     'userNm' : signUpInputValue.userNm
// },
// {
//     headers: headers
// }
export const CommonPostAxios = (url, param, callback) => {
        axios.post('/api'+url, param,
        {
            headers : 'contentType : application/json; charset=utf=8;'            
        },
        {
            enctype : "multipart/form-data"
        }
        ).then((res) => {
            callback(res.data);
        }).catch((res) => {
            AuthLoginErr(res); 
        })
}

export const CommonGetAxios = (url, param, callback) => {
    useEffect(() => { 
        axios.get('/api'+url, {
            params : param
        },
        {
            headers : 'contentType : application/json; charset=utf=8'
        },
        {
            enctype : "multipart/form-data"
        }
        ).then((res) => {
            callback(res.data);
        }).catch((res) => {
            AuthLoginErr(res); 
        })
    }, []);
}

export const AuthLoginErr = (res) => {
    console.log(res);
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
                    return;
                }
            });
        }
    }
}
