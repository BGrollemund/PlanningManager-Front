import React from "react";

import PreferencesDetails from "./PreferencesDetails";

class PreferencesMenu extends React.Component {

    render() {
        return (
            <div>
                <PreferencesDetails
                    preferences={ this.props.preferences }
                    update={ this.props.update } />
            </div>
        );
    }
}

export default PreferencesMenu;
