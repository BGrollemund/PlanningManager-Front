import React from "react";

import InfosDetails from "./InfosDetails";

class InfosMenu extends React.Component {

    render() {
        return (
            <div>
                <InfosDetails
                    schedule={ this.props.schedule }
                    update={ this.props.update } />
            </div>
        );
    }
}

export default InfosMenu;
