import React,{Component} from 'react'

import {
    Link
} from 'react-router-dom';
import './category-selector.scss';

import PageTitle  from 'component/page-title/index.jsx'

import Product from 'service/product-service.jsx';
import MUtil from 'util/mm.jsx';

const __mm = new MUtil();
const _product = new Product();

class CategorySelector extends Component {
    constructor(props){
        super(props);
        this.state = {
            firstCategoryList : [],
            firstCategoryId: 0,
            secondCategoryList: [],
            secondCategoryId: 0,
        }
    }
    componentDidMount(){
        this.loadFirstCategory();
    }
    loadFirstCategory(){
        _product.getCategoryList().then(res => {
            this.setState({
                firstCategoryList: res
            })
        },(errMsg) => {
            __mm.errorTips(errMsg);
        })
    }
    onFirstCategoryChange(e){
        if(this.props.readOnly) {
            return;
        }
        let newValue = e.target.value || 0;
        this.setState({
            firstCategoryId: newValue || 0,
            secondCategoryId: 0,
            secondCategoryList: [],
        }, () => {
            this.loadSecondCategory()
            this.onPropsCategoryChange()
        })
    }
    componentWillReceiveProps(nextProps){
        let categoryIdChange = this.props.categoryId !== nextProps.categoryId,
            parentCategoryIdChange = this.props.parentCategoryId !== nextProps.parentCategoryId;
        if(!categoryIdChange && !parentCategoryIdChange) {
            return ;
        }

        if(nextProps.parentCategoryId === 0) {
            this.setState({
                firstCategoryId: nextProps.categoryId,
                secondCategoryId: 0,
            })
        } else {
            this.setState({
                firstCategoryId: nextProps.parentCategoryId,
                secondCategoryId: nextProps.categoryId
            }, () => {
                parentCategoryIdChange && this.loadSecondCategory();
            })
        }
    }
    loadSecondCategory(){
        _product.getCategoryList(this.state.firstCategoryId).then(res => {
            this.setState({
                secondCategoryList: res
            })
        },(errMsg) => {
            __mm.errorTips(errMsg);
        })
    }
    onSecondCategoryChange(e) {
        if(this.props.readOnly) {
            return;
        }
        let newValue = e.target.value || 0;
        this.setState({
            secondCategoryId: newValue,
        }, () => {
            this.onPropsCategoryChange()
        })
    }
    onPropsCategoryChange(){
        let categoryChangable = typeof this.props.onCategoryChange === 'function' ;
        if(this.state.secondCategoryId) {
            categoryChangable && this.props.onCategoryChange(this.state.secondCategoryId,this.state.firstCategoryId)
        }  else {
            categoryChangable && this.props.onCategoryChange(this.state.firstCategoryId,0)
        }
    }
    render(){
        return (
            <div className="col-md-10">
                <select 
                    value={this.state.firstCategoryId}
                    className='form-control cate-select'
                    onChange={(e) =>{
                        this.onFirstCategoryChange(e)
                    }}
                    readOnly={this.props.readOnly}
                >
                    <option value="">请选择一级分类</option>
                    {
                        this.state.firstCategoryList.map((item) => {
                            return <option value={item.id} key={item.id}>{item.name}</option>
                        })
                    }
                </select>
                {
                    this.state.secondCategoryList.length  ?
                        (<select 
                            readOnly={this.props.readOnly}
                            value={this.state.secondCategoryId}
                            className='form-control cate-select'
                            onChange={(e) =>{
                                this.onSecondCategoryChange(e)
                            }}
                        >
                            <option value="">请选择二级分类</option>
                            {
                                this.state.secondCategoryList.map((item) => {
                                    return <option value={item.id} key={item.id}>{item.name}</option>
                                })
                            }
                        </select>)
                    :
                        null
                }
                
            </div>
        )
    }
}

export default CategorySelector