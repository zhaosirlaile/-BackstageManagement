import React from 'react';
import ReactDOM from 'react-dom';

import Home from 'page/home/index.jsx';
import Layout from 'component/layout/index.jsx';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from 'react-router-dom';

class App extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <Router>
                <Layout>
                    <Switch>
                        <Route exact path='/' component={Home}></Route>
                        <Redirect from='*' to='/'></Redirect>
                    </Switch>
                </Layout>
            </Router>
        )
    }
}

ReactDOM.render(
    <App></App>,
    document.getElementById('app')
)