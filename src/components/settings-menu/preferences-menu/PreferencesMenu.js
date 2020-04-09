import React from "react";

import PreferencesDetails from "./PreferencesDetails";

class PreferencesMenu extends React.Component {

    render() {
        return (
            <div>
                <PreferencesDetails
                    schedule={ this.props.schedule }
                    update={ this.props.update } />
            </div>
        );
    }
}

export default PreferencesMenu;
