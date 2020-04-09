import React from "react";

import SpeakersAdd from "./SpeakersAdd";
import SpeakersList from "./SpeakersList";

class SpeakersMenu extends React.Component {

    render() {
        return (
            <div>
                <SpeakersAdd
                    schedule={ this.props.schedule }
                    update={ this.props.update } />
                <SpeakersList
                    schedule={ this.props.schedule }
                    update={ this.props.update } />
            </div>
        );
    }
}

export default SpeakersMenu;
