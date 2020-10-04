import React,{Component} from 'react'

import {
    Link
} from 'react-router-dom';
import TableList from 'util/table-list/index.jsx';

import Product from 'service/product-service.jsx';
import MUtil from 'util/mm.jsx';

const __mm = new MUtil();
const _product = new Product();

import PageTitle  from 'component/page-title/index.jsx'

class CategoryList extends Component {
    constructor(props){
        super(props);
        this.state ={
            list: [],
            parentCategoryId : this.props.match.params.categoryId || 0,
        }
    }
    componentDidMount(){
        this.loadCategoryList()
    }
    componentDidUpdate(prevProps,prevState){
        let oldPath = prevProps.location.pathname,
            newPath =this.props.location.pathname,
            newId = this.props.match.params.categoryId || 0;
        if(oldPath !== newPath) {
            this.setState({
                parentCategoryId:newId,
            },()=>{
                this.loadCategoryList();
            })
        }
    }
    loadCategoryList(){
        _product.getCategoryList(this.state.parentCategoryId).then(res => {
            this.setState({
                list:res,
            });
        }).catch(errMsg => {
            this.setState({
                list: [],
            })
            __mm.errorTips(errMsg);
        })
    }
    onUpdateName(categoryId,categoryName){
        let newName = window.prompt('请输入新的品类名称',categoryName)
        if(newName) {
            _product.updateCategoryName({
                categoryId: categoryId,
                categoryName:newName,
            }).then(res => {
                __mm.successTips(res)
                this.loadCategoryList();
            },errMsg => {
                __mm.errorTips(errMsg)
            })
        }
    }
    render(){
        return (
            <div id="page-wrapper">
                <PageTitle title='品类列表'>
                    <div className="page-header-right">
                        <Link className='btn btn-primary' to='/product-category/add'>
                            <i className="fa fa-plus"></i>
                            <span>添加品类</span>
                        </Link>
                    </div>
                </PageTitle>
                <div className="row">
                    <div className="col-md-12">
                        <p>父品类ID：{this.state.parentCategoryId}</p>
                    </div>
                </div>
                <TableList tableHeads={[
                    '品类ID',
                    '品类名称',
                    '操作',
                ]}>
                    {
                        this.state.list.map((category,index) => {
                            return (
                                <tr key={index}>
                                    <td>{category.id}</td>
                                    <td>{category.name}</td>
                                    <td>
                                        <a 
                                            onClick={(e) => {
                                                this.onUpdateName(category.id,category.name)
                                            }}
                                            className="opear">
                                                修改名称
                                        </a>
                                        {
                                            category.parentId === 0 ? 
                                            <Link to={`/product-category/index/${category.id}`}>查看子品类</Link>
                                            : null
                                        }
                                    </td>
                                </tr>
                            )
                        })
                    }
                </TableList>
            </div>
        )
    }
}

export default CategoryList