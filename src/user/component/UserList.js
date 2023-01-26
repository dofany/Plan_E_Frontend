import React, {useState, useEffect} from 'react';
import {AuthLoginErr, CommonGetAxios, ScommonAxios} from '../../common/Common';
import Loading from "../../common/component/Loading/Loading";
import axios from "axios";

function UserList() {

    const [users, setUsers] = useState([]);
    // 우선적으로 loading을 true로 함
    const [loading, setLoading] = useState(true);

    // api 호출 예시
    // params : input 값(object 타입으로 넣어야함)
    const param = {email : 'test12@gmail.com'}
    CommonGetAxios("/user/userFind", param , getData);

    // 콜백함수(우선적 테스트용 => api 호출이 안될시 무한으로 로딩바가 생성됨)
    // 지속적 개선할 예정
    function getData(data) {
        setUsers(data);
        setLoading(false);
    }

    // useEffect(() => {
    //     axios(
    //         {
    //             url : "/api/user/userFind",
    //             method : 'get',
    //             contentType : "application/json; charset=utf=8",
    //             enctype : "multipart/form-data", // form태그 데이터 전송
    //             params : params
                
    //         }
    //     ).then(function(response){
    //         setUsers(response.data);
    //         setLoading(false);
    //     }).catch(function(response){
    //         AuthLoginErr(response);
    //     });
    // }, [])

    return(
        <div>
            <div>
                {loading ? <Loading /> : null}
            </div>
            <h2 className="text-center">PlanE API Test</h2>
            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead className="text-center">
                        <tr>
                            <th>사용자 아이디</th>
                            <th>사용자명 </th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {users.map(item =>  (
                          <tr key = {item.email}>
                              <td> {item.email} </td>
                              <td> {item.userNm} </td>
                          </tr>
                        )
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserList;