import React,{Component} from 'react'

import {
    Link
} from 'react-router-dom';
import Pagination from 'util/pagination/index.jsx';
import TableList from 'util/table-list/index.jsx';

import User from 'service/user-service.jsx';
import MUtil from 'util/mm.jsx';

const __mm = new MUtil();
const _user = new User();

import PageTitle  from 'component/page-title/index.jsx'

class UserList extends Component {
    constructor(props){
        super(props);
        this.state ={
            list: [],
            pageNum : 1,
        }
    }
    componentDidMount(){
        this.loadUserList()
    }
    loadUserList(){
        _user.getUserList(this.state.pageNum).then(res => {
            this.setState(res);
        }).catch(errMsg => {
            this.setState({
                list: [],
            })
            __mm.errorTips(errMsg);
        })
    }
    render(){
        return (
            <div id="page-wrapper">
                <PageTitle title='用户列表'></PageTitle>
                <TableList tableHeads={[
                    'Id',
                    '用户名',
                    '邮箱',
                    '电话',
                    '注册时间',
                ]}>
                    {
                        this.state.list.map((user,index) => {
                            return (
                                <tr key={index}>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{new Date(user.createTime).toLocaleString()}</td>
                                </tr>
                            )
                        })
                    }
                </TableList>
                <Pagination
                    current={this.state.pageNum}
                    total={this.state.total}
                    onChange={(pageNum) => this.onPageNumChange(pageNum)}
                ></Pagination>
            </div>
        )
    }
    onPageNumChange(pageNum){
        this.setState({
            pageNum: pageNum,
        }, () => {
            this.loadUserList();   
        })
    }
}

export default UserList