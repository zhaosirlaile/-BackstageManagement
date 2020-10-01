import MUtil from 'util/mm.jsx';

const __mm = new MUtil();

class Statistic{
    getHomeCount() {
        return  __mm.requset({
            type: 'post',
            url: '/manage/statistic/base_count.do',
        })

    }
}


export default Statistic;