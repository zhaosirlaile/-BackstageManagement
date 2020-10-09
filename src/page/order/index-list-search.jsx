import React,{Component} from 'react'

class ListSearch extends Component {
    constructor(props){
        super(props);
        this.state = {
            orderNumber: '',
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
        this.props.onSearch(this.state.orderNumber);
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
                            <select className='form-control'>
                                <option value=''>按订单号查询</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <input 
                                name='orderNumber'
                                onChange={
                                    (e) => {
                                        this.onValueChange(e)
                                    }
                                }
                                onKeyUp={(e) => this.onSearchKeywordKeyUp(e)}
                                type="text" 
                                placeholder='订单号' 
                                className="form-control"
                            />
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