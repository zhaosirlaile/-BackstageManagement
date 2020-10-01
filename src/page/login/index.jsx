import React,{Component} from 'react'

import './index.scss';
import User from 'service/user-service.jsx';
import MUtil from 'util/mm.jsx';

const __mm = new MUtil();
const _user = new User();


class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            username: '',
            password: '',
            redirect: __mm.getUrlParam('redirect') || '/',
        }
    }
    onInputChange(e) {
        this.setState({
            [e.target.name] : e.target.value,
        })
    }
    componentWillMount(){
        document.title = '登录 - MMALL ADMIN'
    }
    onSubmit() {
        let loginInfog = {
                username: this.state.username,
                password: this.state.password,
            },
            checkResult = __mm.checkLoginInfo(loginInfog)
        if(checkResult.status) {
            _user.login(loginInfog).then(res => {
                __mm.setStorage('userInfo',JSON.stringify(res))
                this.props.history.push(this.state.redirect)
            }).catch(errMsg => {
                __mm.errorTips(errMsg);
            })
        }else {
            __mm.errorTips(checkResult.msg);
        }
    }
    onInputKeyUp(e) {
        if(e.keyCode === 13) {
            this.onSubmit();
        }
    }
    render() {
        return (
            <div className="col-md-4 col-md-offset-4">
                <div className="panel panel-default login-panel">
                    <div className="panel-heading">
                        欢迎登录 - MMALL 管理系统
                    </div>
                    <div className="panel-body">
                        <div>
                            <div className="form-group">
                                <input 
                                    name='username'
                                    onChange={e => this.onInputChange(e)}
                                    type="test"
                                    className="form-control"
                                    placeholder='请输入用户名'
                                    onKeyUp={e => this.onInputKeyUp(e)}
                                />
                            </div>
                            <div className="form-group">
                                <input 
                                    name='password'
                                    onChange={e => this.onInputChange(e)}
                                    type="password"
                                    className="form-control"
                                    placeholder='请输入密码'
                                    onKeyUp={e => this.onInputKeyUp(e)}
                                />
                            </div>
                            <button
                                className='btn btn-primary btn-lg btn-block'
                                onClick={e => this.onSubmit()}
                            >
                                登录
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Login