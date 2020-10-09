import MUtil from 'util/mm.jsx';

const __mm = new MUtil();

class Order{
    getOrderList(listParam) {
        let url = '',
            data = {};
        if(listParam.listType === 'list') {
            url = '/manage/order/list.do'
            data.pageNum = listParam.pageNum
        } else if(listParam.listType === 'search') {
            url = '/manage/order/search.do';
            data.pageNum = listParam.pageNum;
            data.orderNo = listParam.orderNo;
        }
        return __mm.requset({
            type: 'post',
            url: url,
            data: data
        })
    }
    getOrderDetail(orderNumber){
        return __mm.requset({
            type: 'post',
            url: '/manage/order/detail.do',
            data: {
                orderNo: orderNumber,
            }
        })

    }
    sendGoods(){
        return __mm.requset({
            type: 'post',
            url: '/manage/order/send_goods.do',
            data: {
                orderNo: orderNumber,
            }
        })
    }
}


export default Order;