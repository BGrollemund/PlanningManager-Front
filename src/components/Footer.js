import React from "react";

import config from "../config/app.config.json";

class Footer extends React.Component {
    render() {
        return (
            <footer>
                <div>{ config.siteInfos.version }</div>
            </footer>
        );
    }
}

export default Footer;
