import React from "react";

import SpeakersAdd from "./SpeakersAdd";
import SpeakersList from "./SpeakersList";

class SpeakersMenu extends React.Component {

    render() {
        return (
            <div>
                <SpeakersAdd
                    changeScheduleSettings={ this.props.changeScheduleSettings } />
                <SpeakersList
                    changeScheduleSettings={ this.props.changeScheduleSettings }
                    speakers={ this.props.speakers }
                    update={ this.props.update } />
            </div>
        );
    }
}

export default SpeakersMenu;
