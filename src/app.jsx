import React from 'react';
import ReactDOM from 'react-dom';

import Home from 'page/home/index.jsx';
import Layout from 'component/layout/index.jsx';
import Login from 'page/login/index.jsx';
import UserList from 'page/user/index.jsx';
import ErrorPage from 'page/error/index.jsx';
import ProductRouter from 'page/product/router.jsx';
import orderList from 'page/order/index.jsx';
import orderDetail from 'page/order/detail.jsx';


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from 'react-router-dom';

class App extends React.Component {

    render() {
        let LayoutRouter = (
            <Layout>
                <Switch>
                    <Route exact path='/' component={Home}></Route>
                    <Route path='/product' component={ProductRouter}></Route>
                    <Route path='/product-category' component={ProductRouter}></Route>
                    <Route path='/order/index' component={orderList}></Route>
                    <Route path='/order/detail/:orderNumber' component={orderDetail}></Route>
                    <Route path='/user/index' component={UserList}></Route>
                    <Redirect exact from='/order' to='/order/index'></Redirect>
                    <Redirect exact from='/user' to='/user/index'></Redirect>
                    <Route component={ErrorPage}></Route>
    
                </Switch>
            </Layout>
        );
        return (
            <Router>
                <Switch>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/' render={props => LayoutRouter}></Route>
                </Switch>
            </Router>
        )
    }
}

ReactDOM.render(
    <App></App>,
    document.getElementById('app')
)