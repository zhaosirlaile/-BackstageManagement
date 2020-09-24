import React,{Component} from 'react'

import NavTop from 'component/nav-top/index.jsx';
import NavSide from 'component/nav-side/index.jsx';


import './theme.css';

class Layout extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div id='wrapper'>
                <NavTop></NavTop>
                <NavSide></NavSide>
                {this.props.children}
            </div>
        )
    }
}

export default Layout