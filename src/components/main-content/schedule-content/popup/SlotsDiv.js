import React from "react";

import GroupNameSpan from "./GroupNameSpan";
import SessionsSelect from "./SessionsSelect";

class SlotsDiv extends React.Component {

    render() {

        const settings = this.props.schedule.settings;

        let sessionsList = [];

        for ( let i=0; i<settings.preferences.sessionsPerSlot; i++ ) {
            sessionsList.push(
                <div key={i}>
                    <GroupNameSpan
                        sessionIndex={ i }
                        sessionsPerSolt={ settings.preferences.sessionsPerSlot } />
                    <SessionsSelect
                        dayId={ this.props.dayId }
                        sessionIndex={ i }
                        slotIndex={ this.props.slotIndex }
                        schedule={ this.props.schedule } />
                </div>
            );
        }

        return (
            <div>
                <div className="slot-name">
                    { settings.slots[ this.props.slotIndex ].formatForUser() }
                </div>
                <div>
                    { sessionsList }
                </div>
            </div>
        );
    }
}

export default SlotsDiv;
