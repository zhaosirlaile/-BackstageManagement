import React from 'react';

class TableList extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            isFirstLoading: true,
        }
    }
    componentWillReceiveProps(){
        // 李彪
        this.setState({
            isFirstLoading: false,
        })
    }
    render () {
        let tableHeader = this.props.tableHeads.map((item,index) => {
            if(typeof item === 'object') {
                return <th width={item.width} key={index}>{item.name}</th>
            } else if (typeof item === 'string') {
                return <th key={index}>{item}</th>
            }
        })
        let listBody = this.props.children;
        let listInfo = (
            <tr>
                <td colSpan={tableHeader.length} className='text-center'>
                    {this.state.isFirstLoading ? '正在加载数据...' : '没有找到相应的结果'}
                </td>
            </tr>
        )
        let tableBody = listBody.length > 0 ? listBody : listInfo

        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-12">
                        <table className='table table-striped table-border'>
                            <thead>
                                <tr>
                                    {tableHeader}
                                </tr>
                            </thead>
                            <tbody>
                                    {tableBody}
                            </tbody>
                        </table>
                        </div>
                    </div> 
                </div>
            </div>
        )
    }
}

export default TableList