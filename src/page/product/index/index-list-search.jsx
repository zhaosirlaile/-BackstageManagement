import React,{Component} from 'react'

class ListSearch extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchType: 'productId',
            searchKeyword: '',
        }
    }
    onValueChange(e){
        let name = e.target.name,
            value = e.target.value.trim();
        this.setState({
            [name]: value,
        })
    }
    onSearch(){
        this.props.onSearch(this.state.searchType,this.state.searchKeyword);
    }
    onSearchKeywordKeyUp (e) {
        if(e.keyCode === 13) {
            this.onSearch();
        }
    }
    render(){
        return (
            <div className="row search-wrap">
                <div className="col-md-12">
                    <div className="form-inline">
                        <div className="form-group">
                            <select
                                name='searchType'
                                onChange={(e) => {
                                    this.onValueChange(e)
                                }} 
                                className='form-control'>
                                <option value="productId">按商品ID查询</option>
                                <option value="productName">按商品名称查询</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <input 
                                name='searchKeyword'
                                onChange={
                                    (e) => {
                                        this.onValueChange(e)
                                    }
                                }
                                onKeyUp={(e) => this.onSearchKeywordKeyUp(e)}
                                type="text" 
                                placeholder='关键词' className="form-control"/>
                        </div>
                        <div className='form-group'>
                            <button onClick={e => {this.onSearch()}} className='btn btn-primary'>搜索</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListSearch