import React from "react";

import config from "../../config/app.config.json";

class Footer extends React.Component {

    shouldComponentUpdate( nextProps, nextState, nextContext ) {
        return false;
    }

    render() {
        return (
            <footer>
                <div>{ config.siteInfos.version }</div>
            </footer>
        );
    }
}

export default Footer;
