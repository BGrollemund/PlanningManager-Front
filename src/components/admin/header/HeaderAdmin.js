import React from "react";
import { Redirect } from "react-router-dom";

import config from "../../../config/app.config.json";

class HeaderAdmin extends React.Component {

    state = {
        goToHome: false
    };

    goToHome = () => {
        this.setState( { goToHome: true } );
    };

    render() {
        if ( this.state.goToHome ) {
            return <Redirect to = {
                {
                    pathname: '/',
                    state: { userAttr: this.props.userAttr }
                }
            } />;
        }

        return (
          <header>
              <div>
                  <h1>{ config.siteInfos.name }</h1>
                  <p><em>{ config.siteInfos.slogan }</em></p>
              </div>
              <div className="flex-grow-1"/>
              <div onClick={ this.goToHome } className="connection-btn">
                  Retour à la partie utilisateur
              </div>
          </header>
        );
    }
}

export default HeaderAdmin;
