import React from "react";

import SessionsAdd from "./SessionsAdd";
import SessionsList from "./SessionsList";

class SpeakersMenu extends React.Component {

    changeSessionsList = ( data ) => {
        this.props.changeSessionsList( data );
    };

    render() {
        return (
            <div>
                <SessionsAdd addSession={ this.changeSessionsList } />
                <SessionsList
                    removeSession={ this.changeSpeakersList }
                    speakers={ this.props.speakers } />
            </div>
        );
    }
}

export default SpeakersMenu;
