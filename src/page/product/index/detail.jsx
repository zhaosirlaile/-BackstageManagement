import React,{Component} from 'react'

import {
    Link
} from 'react-router-dom';
import Product from 'service/product-service.jsx';
import MUtil from 'util/mm.jsx';

const __mm = new MUtil();
const _product = new Product();

import PageTitle  from 'component/page-title/index.jsx'
import CategorySelector from './category-selector.jsx';

import './save.scss';

class ProductDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            id                  : this.props.match.params.pid,
            name                : '',
            subtitle            : '',
            categoryId          : 0,
            parentCategoryId    : 0,
            subImages           : [],
            price               : '',
            detail              : '',
            status              : 1,
            stock               : 0,
        }
    }
    componentDidMount(){
        this.loadProduct();
    }
    loadProduct(){
        if(this.state.id) {
            _product.getProduct(this.state.id).then((res) => {
                let images = res.subImages.split(',');
                res.subImages = images.map((imgUri) => {
                    return {
                        uri: imgUri,
                        url: res.imageHost + imgUri,
                    }
                })
                this.setState(res)
            },(errMsg) => {
                __mm.errorTips(errMsg)
            })
        }
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
        return (
            <div id="page-wrapper">
                <PageTitle title='添加商品'></PageTitle>
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className='col-md-2 control-label'>
                            商品名称
                        </label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                                {this.state.name}
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className='col-md-2 control-label'>
                            商品描述
                        </label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                                {this.state.subtitle}
                            </p>
                        </div>
                    </div>
                    {/* 一级分类，及其二级分类 */}
                    <div className="form-group">
                        <label className='col-md-2 control-label'>
                            所属分类
                        </label>
                        <CategorySelector
                            readOnly
                            categoryId={this.state.categoryId}
                            parentCategoryId={this.state.parentCategoryId}
                        ></CategorySelector>
                    </div>
                    <div className="form-group">
                        <label className='col-md-2 control-label'>
                            商品价格
                        </label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input 
                                    type='number' 
                                    className="form-control"
                                    value={this.state.price}
                                    readOnly
                                />
                                <span className='input-group-addon'>
                                    元
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className='col-md-2 control-label'>
                            商品库存
                        </label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input 
                                    type='number' 
                                    className="form-control"
                                    value={this.state.stock}
                                    readOnly
                                />
                                <span className='input-group-addon'>
                                    件
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* 商品图片，需要使用 upload 功能 */}
                    <div className="form-group">
                        <label className='col-md-2 control-label'>
                            商品图片
                        </label>
                        <div className="col-md-10" style={{overflow:'hidden'}}>
                            {
                                this.state.subImages.length ? this.state.subImages.map((item,index) => {
                                    return (
                                        <div key={index}  className='img-con'>
                                            <img className='img' src={item.url} alt=""/>
                                        </div>
                                    )
                                })
                                : <div>暂无图片</div>
                            }
                        </div>
                    </div>
                    {/* 使用富文本编辑器 */}
                    <div className="form-group">
                        <label className='col-md-2 control-label'>
                            商品详情
                        </label>
                        <div 
                            className="col-md-10"
                            dangerouslySetInnerHTML={{
                                __html: this.state.detail
                            }}>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    getSubImagesString(){
        return this.state.subImages.map((image) => image.uri).join(',')
    }
}

export default ProductDetail