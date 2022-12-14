import React, {useState} from 'react';
import { CommonAxios } from '../../common/Common';


function UserList() {

    const [users, setUsers] = useState([]);


    // useEffect(() => {
    //     axios(
    //         {
    //             url : "/api/user/getUserList",
    //             method : 'get',
    //             contentType : "application/json; charset=utf=8",
    //             enctype : "multipart/form-data" // form태그 데이터 전송
    //         }
    //     ).then(function(response){
    //         getData(response.data);
    //     }).catch(function(error){
    //         JSON.stringify(error);
    //     });
    // }, [])

    CommonAxios("/user/getUserList", "" ,"get", getData);

    function getData(data) {
        setUsers(data);
    }
    
    return(
        <div>
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
                          <tr key = {item.userId}>
                              <td> {item.userId} </td>
                              <td> {item.userName} </td>
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