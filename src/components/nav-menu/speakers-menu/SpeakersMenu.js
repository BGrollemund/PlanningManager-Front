import React from "react";

import SpeakersAdd from "./SpeakersAdd";
import SpeakersList from "./SpeakersList";

class SpeakersMenu extends React.Component {

    changeSpeakersList = ( data ) => {
        this.props.changeSpeakersList( data );
    };

    render() {
        return (
            <div>
                <SpeakersAdd addSpeaker={ this.changeSpeakersList } />
                <SpeakersList
                    removeSpeaker={ this.changeSpeakersList }
                    speakers={ this.props.speakers } />
            </div>
        );
    }
}

export default SpeakersMenu;
