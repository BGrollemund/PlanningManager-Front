import React from "react";
import ReactDom from "react-dom";
import history from './history'
import { Router, Switch, Route } from "react-router-dom";

import "./assets/css/App.css";

import Admin from "./components/admin/Admin";
import App from "./components/App";
import NotFound from "./components/NotFound";

const Root = () => {
    return (
        <Router history={ history }>
            <Switch>
                <Route exact path="/" component={ App } />
                <Route path="/pm-dashboard-admin" exact component={ Admin } />
                <Route component={ NotFound } />
            </Switch>
        </Router>
    );
};

ReactDom.render(
    <Root/>,
    document.querySelector('#root')
);
