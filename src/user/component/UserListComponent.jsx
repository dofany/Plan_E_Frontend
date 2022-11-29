import React, { Component } from 'react';
import axios from "axios";
// import BoardService from '../service/BoardService';

class UserListComponent extends Component {
    constructor(props) {
        super(props)
    // # 1.
        this.state = {
            users: []
        }

    }
    // # 2.
    componentDidMount() {
        axios.get('/api/user/getUserList').then((res) => {
            this.setState({ users: res.data});
        });
    }

    // # 3.
    render() {
        return (
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
                            {
                                this.state.users.map(
                                    user =>
                                    <tr key = {user.userId}>
                                        <td> {user.userId} </td>
                                        <td> {user.userName} </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default UserListComponent;
