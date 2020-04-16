import React from "react";

import GroupNameSpan from "./GroupNameSpan";
import SessionsSelect from "./SessionsSelect";

class SlotsDiv extends React.Component {

    render() {
        const settings = this.props.schedule.settings;

        let
            mask = '',
            sessionsList = [];

        for ( let i=0; i<settings.preferences.sessionsPerSlot; i++ ) {
            sessionsList.push(
                <div key={i}>
                    <GroupNameSpan
                        sessionIndex={ i }
                        sessionsPerSolt={ settings.preferences.sessionsPerSlot } />
                    <SessionsSelect
                        changeData={ this.props.changeData }
                        dayId={ this.props.dayId }
                        sessionIndex={ i }
                        slotIndex={ this.props.slotIndex }
                        schedule={ this.props.schedule } />
                </div>
            );
        }

        if ( this.props.showMask ) mask = <div className="slot-mask"/>;

        return (
            <div className="slot-content-box">
                { mask }
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
