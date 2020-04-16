import React from "react";

import config from "../../config/app.config.json";

import Connection from "./Connection";

class Header extends React.Component {
    render() {
        return (
          <header>
              <div>
                  <h1>{ config.siteInfos.name }</h1>
                  <p><em>{ config.siteInfos.slogan }</em></p>
              </div>
              <div className="flex-grow-1"/>
              <Connection
                  changeUserAttr={ this.props.changeUserAttr }
                  userAttr={ this.props.userAttr } />
          </header>
        );
    }
}

export default Header;
