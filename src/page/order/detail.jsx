import React,{Component} from 'react'

import {
    Link
} from 'react-router-dom';
import Order from 'service/order-serviece.jsx';
import MUtil from 'util/mm.jsx';
import TableList from 'util/table-list/index.jsx';

import './detail.scss'
const __mm = new MUtil();
const _order = new Order();

import PageTitle  from 'component/page-title/index.jsx'

class OrderDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            orderNumber: this.props.match.params.orderNumber,
            orderInfo: {}
        }
    }
    componentDidMount(){
        this.loadOrderDetail();
    }
    loadOrderDetail(){
        _order.getOrderDetail(this.state.orderNumber).then((res) => {
            this.setState({
                orderInfo: res,
            })
        },(errMsg) => {
            __mm.errorTips(errMsg)
        })
    }
    onCategoryChange(categoryId, parentCategoryId){
        this.setState({
            categoryId,
            parentCategoryId
        })
    }
    onValueChange(e){
        let name = e.target.name,
            value = e.target.value.trim();
        this.setState({
            [name]: value,
        })
    }
    render(){
        let reveiverInfo =  this.state.orderInfo.shippingVo || {},
            productList = this.state.orderInfo.orderItemVoList || [];
        let tableHeads =[
            {name: '商品图片' , width: '10%'},
            {name: '商品信息' , width: '45%'},
            {name: '单价' , width: '15%'},
            {name: '数量' , width: '15%'},
            {name: '合计' , width: '15%'},
        ];
        return (
            <div id="page-wrapper">
                <PageTitle title='订单详情'></PageTitle>
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className='col-md-2 control-label'>
                            订单号
                        </label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                                {this.state.orderInfo.orderNo}
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className='col-md-2 control-label'>
                            创建时间
                        </label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                                {this.state.orderInfo.createTime}
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className='col-md-2 control-label'>
                            收件人
                        </label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                                {reveiverInfo.receiverName},
                                {reveiverInfo.receiverProvince}
                                {reveiverInfo.receiverCity}
                                {reveiverInfo.receiverAddresss} 
                                {reveiverInfo.receiverMobile || reveiverInfo.receiverPhone}
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className='col-md-2 control-label'>
                            订单状态
                        </label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                                {this.state.orderInfo.statusDesc}
                                {
                                    this.state.orderInfo.state === 20
                                    ? <button 
                                        className='btn btn-default btn-sm btn-send-goods'
                                        onClick={(e) => this.onSendGoods(e)}
                                      >立即发货</button>
                                    : null
                                }
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className='col-md-2 control-label'>
                            支付方式
                        </label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                                {this.state.orderInfo.paymentTypeDesc}
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className='col-md-2 control-label'>
                            订单金额
                        </label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                                ￥{this.state.orderInfo.payment}
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className='col-md-2 control-label'>
                            商品列表
                        </label>
                        <div className="col-md-10">
                            <p className="form-control-static">
                                <TableList
                                    tableHeads={tableHeads}
                                >
                                    {productList.map((product,index) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <img 
                                                        src={`${this.state.orderInfo.imageHost}${product.productImage}`} 
                                                        alt={product.productName} 
                                                        className='p-img'
                                                    />
                                                </td>
                                                <td>
                                                    {product.productName}
                                                </td>
                                                <td>
                                                    ￥{product.currentUnitPrice}
                                                </td>
                                                <td>
                                                    {product.quantity}
                                                </td>
                                                <td>
                                                    ￥{product.totalPrice}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </TableList>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    getSubImagesString(){
        return this.state.subImages.map((image) => image.uri).join(',')
    }
    onSendGoods(){
        if(window.confirm('是否确认该订单已经发货？')) {
            _order.sendGoods(this.state.orderNumber).then(res => {
                __mm.successTips('发货成功')
                this.loadOrderDetail();
            },(errMsg) => {
                __mm.errorTips(errMsg);
            })
        }
    }
}

export default OrderDetail;