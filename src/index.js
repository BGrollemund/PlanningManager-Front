// TODO: gestion des créneaux (proportionnalité, collision)
// TODO: menu Stats
// TODO: Login et sauvegarde quand loggé (BACK)
// TODO: Menu admin (BACK)


import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";

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
