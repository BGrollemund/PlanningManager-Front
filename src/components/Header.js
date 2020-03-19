import React from "react";

import config from "../config/app.config.json";

class Header extends React.Component {
    render() {
        return (
          <header>
              <div>
                  <h1>{ config.siteInfos.name }</h1>
                  <p><em>{ config.siteInfos.slogan }</em></p>
              </div>
              <div></div>
              <div>
                  <a href="/" target="_blank">Documentation</a>
              </div>
          </header>
        );
    }
}

export default Header;
