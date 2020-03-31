import React from "react";

import SessionsAdd from "./SessionsAdd";
import SessionsList from "./SessionsList";

class SpeakersMenu extends React.Component {

    render() {
        return (
            <div>
                <SessionsAdd
                    changeScheduleSettings={ this.props.changeScheduleSettings } />
                <SessionsList
                    changeScheduleSettings={ this.props.changeScheduleSettings }
                    sessions={ this.props.sessions }
                    update={ this.props.update } />
            </div>
        );
    }
}

export default SpeakersMenu;
