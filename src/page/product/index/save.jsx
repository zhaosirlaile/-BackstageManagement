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

import FileUploader from 'util/file-uploader/index.jsx';
import RichEditor from 'util/rich-editor/index.jsx';


import './save.scss';

class ProductSave extends Component {
    constructor(props){
        super(props);
        this.state = {
            id                  : this.props.match.params.pid,
            name                : '',
            subtitle            : '',
            categoryId          : 0,
            parentCategoryId    : 0,
            subImages           : [],
            price               : 0,
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
                res.defaultDetail = res.detail;
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
                <PageTitle title={this.state.id ? '编辑商品' : '添加商品'}></PageTitle>
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className='col-md-2 control-label'>
                            商品名称
                        </label>
                        <div className="col-md-5">
                            <input 
                                type="text" 
                                name='name'
                                className="form-control"
                                placeholder='请输入商品名称'
                                onChange={(e)=> this.onValueChange(e)}
                                value={this.state.name}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className='col-md-2 control-label'>
                            商品描述
                        </label>
                        <div className="col-md-5">
                            <input 
                                name='subtitle'
                                type="text" 
                                className="form-control"
                                placeholder='请输入商品描述'
                                onChange={(e)=> this.onValueChange(e)}
                                value={this.state.subtitle}

                            />
                        </div>
                    </div>
                    {/* 一级分类，及其二级分类 */}
                    <div className="form-group">
                        <label className='col-md-2 control-label'>
                            所属分类
                        </label>
                        <CategorySelector
                            categoryId={this.state.categoryId}
                            parentCategoryId={this.state.parentCategoryId}
                            onCategoryChange={(categoryId, parentCategoryId) => {
                                this.onCategoryChange(categoryId, parentCategoryId);
                            }}
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
                                    name='price'
                                    placeholder='价格'
                                    onChange={(e)=> this.onValueChange(e)}
                                    value={this.state.price}
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
                                    name='stock'
                                    placeholder='库存'
                                    onChange={(e)=> this.onValueChange(e)}
                                    value={this.state.stock}
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
                                            <i className="fa fa-close" index={index} onClick={(e)=> this.onImageDelete(e)}></i>
                                        </div>
                                    )
                                })
                                : <div>请上传图片</div>
                            }
                        </div>
                        <div className="col-md-offset-2 col-md-10 file-upload-con">
                            <FileUploader
                                onSuccess={(res)=> {
                                    this.onUploadSuccess(res)
                                }}
                                onError={(errMsg) => {
                                    this.onUploadError(errMsg)
                                }}
                            ></FileUploader>
                        </div>
                    </div>
                    {/* 使用富文本编辑器 */}
                    <div className="form-group">
                        <label className='col-md-2 control-label'>
                            商品详情
                        </label>
                        <div className="col-md-10">
                            <RichEditor
                                detail={this.state.detail}
                                defaultDetail={this.state.defaultDetail}
                                onValueChange={(value) => this.onDetailValueChange(value)}
                            ></RichEditor>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-offset-2 col-md-10">
                            <button 
                                type='submit' 
                                className='btn btn-primary'
                                onClick={()=>{this.onSubmit()}}
                            >
                                提交
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    getSubImagesString(){
        return this.state.subImages.map((image) => image.uri).join(',')
    }
    onSubmit(){
        let product = {
                name                : this.state.name,
                subtitle            : this.state.subtitle,
                categoryId          : parseInt(this.state.categoryId),            
                subImages           : this.getSubImagesString(),
                price               : parseFloat(this.state.price),
                detail              : this.state.detail,
                status              : this.state.status,        
                stock               : parseInt(this.state.stock),
            },
            productCheckResult = _product.cheackProduct(product)
            if(this.state.id) {
                product.id = this.state.id
            }
        if(productCheckResult.status) {
            _product.saveProduct(product).then((res) => {
                __mm.successTips(res);
                this.props.history.push('/product/index')
            },(errMsg) => {
                __mm.errorTips(errMsg)
            })
        } else {
            __mm.errorTips(productCheckResult.msg)
        }
    }
    onDetailValueChange(value){
        this.setState({
            detail:value,
        })
    }
    onImageDelete(e) {
        let index = parseInt(e.target.getAttribute('index')),
            subImages = this.state.subImages;
        subImages.splice(index,1);
        this.setState({
            subImages: subImages,
        })
    }
    onUploadSuccess(res){
        let subImages = this.state.subImages;
        subImages.push(res);
        this.setState({
            subImages: subImages,
        })
    }
    onUploadError(errMsg){
        __mm.errorTips(errMsg)
    }
}

export default ProductSave