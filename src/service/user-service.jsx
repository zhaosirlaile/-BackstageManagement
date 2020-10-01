import MUtil from 'util/mm.jsx';

const __mm = new MUtil();

class User{
    login(loginInfo) {
        return  __mm.requset({
            type: 'post',
            url: '/manage/user/login.do',
            data: loginInfo
        })

    }
    logout(){
        return  __mm.requset({
            type: 'post',
            url: '/user/logout.do',
        })
    }
    getUserList(pageNum) {
        return __mm.requset({
            type: 'post',
            url: '/manage/user/list.do',
            data: {
                pageNum,
            }
        })
    }
}


export default User;