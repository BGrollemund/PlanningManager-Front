import React from "react";

import config from "../../config/app.config.json";

class Header extends React.Component {

    shouldComponentUpdate( nextProps, nextState, nextContext ) {
        return false;
    }

    render() {
        return (
          <header>
              <div>
                  <h1>{ config.siteInfos.name }</h1>
                  <p><em>{ config.siteInfos.slogan }</em></p>
              </div>
              <div className="flex-grow-1"></div>
              <div>
                  <a href="/">Espace Login / Sign in</a>
              </div>
          </header>
        );
    }
}

export default Header;
