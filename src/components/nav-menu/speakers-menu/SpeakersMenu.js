import React from "react";

import SpeakersAdd from "./SpeakersAdd";
import SpeakersList from "./SpeakersList";

class SpeakersMenu extends React.Component {

    changeSpeakersList = ( data ) => {
        this.props.changeSpeakersList( data );
    };

    update = () => {
        this.props.update();
    };

    render() {
        return (
            <div>
                <SpeakersAdd
                    addSpeaker={ this.changeSpeakersList } />
                <SpeakersList
                    removeSpeaker={ this.changeSpeakersList }
                    speakers={ this.props.speakers }
                    update={ this.update } />
            </div>
        );
    }
}

export default SpeakersMenu;
