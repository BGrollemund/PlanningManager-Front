import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./assets/css/App.css";

import App from "./components/App";


const Root = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={ App } />
            </Switch>
        </BrowserRouter>
    );
};

ReactDom.render(
    <Root/>,
    document.querySelector('#root')
);
