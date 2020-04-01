import React from "react";
import SessionInfos from "./SessionInfos";

class SlotInfos extends React.Component {

    render() {

        const
            settings = this.props.schedule.settings,
            slotHeightStyle = { height: this.props.slotHeight + '%' },
            slotWidth= 1 / ( settings.preferences.sessionsPerSlot ) * 100;

        let sessions = [];

        for ( let i=0; i<settings.preferences.sessionsPerSlot; i++ ) {
            sessions.push(
                <SessionInfos
                    key={i}
                    dayId={ this.props.dayId }
                    sessionKey={ i }
                    slotKey={ this.props.slotKey }
                    slotWidth={ slotWidth }
                    schedule={ this.props.schedule } />
            );
        }

        return (
            <div style={ slotHeightStyle } className="slot-infos-box">
                { sessions }
            </div>
        );
    }
}

export default SlotInfos;
