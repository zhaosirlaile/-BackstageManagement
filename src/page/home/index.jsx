import React,{Component} from 'react'

import PageTitle  from 'component/page-title/index.jsx'

class Home extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="首页"></PageTitle>
                <div className="row">
                    <div className="col-md-12">
                        body
                    </div>
                </div>
            </div>
        )
    }
}

export default Home