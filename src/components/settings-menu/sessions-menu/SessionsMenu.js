import React from "react";

import SessionsAdd from "./SessionsAdd";
import SessionsList from "./SessionsList";

class SpeakersMenu extends React.Component {

    render() {
        return (
            <div>
                <SessionsAdd
                    schedule={ this.props.schedule }
                    update={ this.props.update } />
                <SessionsList
                    schedule={ this.props.schedule }
                    update={ this.props.update } />
            </div>
        );
    }
}

export default SpeakersMenu;
