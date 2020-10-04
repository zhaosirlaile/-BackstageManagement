import React,{Component} from 'react'

import Product from 'service/product-service.jsx';
import MUtil from 'util/mm.jsx';

const __mm = new MUtil();
const _product = new Product();

import PageTitle  from 'component/page-title/index.jsx'

class CategoryAdd extends Component {
    constructor(props){
        super(props);
        this.state ={
            categoryList: [],
            parentId: 0,
            categoryName: '',
        }
    }
    componentDidMount(){
        this.loadCategoryList();
    }
    loadCategoryList(){
        _product.getCategoryList().then(res => {
            this.setState({
                categoryList:res,
            });
        }).catch(errMsg => {
            __mm.errorTips(errMsg);
        })
    }
    onValueChange(e){
        let name = e.target.name,
            value = e.target.value;
        this.setState({
            [name]: value,
        })
    }
    render(){
        return (
            <div id="page-wrapper">
                <PageTitle title='品类列表'></PageTitle>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label className='col-md-2 control-label'>
                                    所属品类
                                </label>
                                <div className="col-md-5">
                                    <select 
                                        name="parentId" 
                                        className='form-control'
                                        onChange={(e) => {
                                            this.onValueChange()
                                        }}
                                    >
                                        <option value="0">根品类</option>
                                        {this.state.categoryList.map((category,index) => {
                                            return <option value={category.id} key={category.id}>{category.name}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className='col-md-2 control-label'>
                                    品类名称
                                </label>
                                <div className="col-md-5">
                                    <input 
                                        type="text" 
                                        name='categoryName'
                                        className="form-control"
                                        placeholder='请输入品类名称'
                                        onChange={(e)=> this.onValueChange(e)}
                                        value={this.state.name}
                                    />
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
                </div>
            </div>
        )
    }
    onSubmit(e){
        let categoryName = this.state.categoryName.trim();
        if(categoryName) {
            _product.saveCategory({
                parentId: this.state.parentId,
                categoryName: categoryName,
            }).then((res) => {
              __mm.successTips(res);
              this.props.history.push('/product-category/index')
            }, errMsg => {
                __mm.errorTips(errMsg);
            })
        } else {
            __mm.errMsg('请输人品类名称')
        }
    }
}

export default CategoryAdd