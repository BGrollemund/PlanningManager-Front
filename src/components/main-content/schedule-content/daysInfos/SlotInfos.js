import React from "react";
import SessionInfos from "./SessionInfos";

class SlotInfos extends React.Component {

    render() {
        const
            settings = this.props.schedule.settings,
            slotStyle = {
                            height: this.props.slotHeight + '%',
                            top: this.props.slotTop + '%',
                            width: '100%'
                        },
            slotWidth= 1 / ( settings.preferences.sessionsPerSlot ) * 100;

        let
            groupOption = false,
            sessions = [];

        for ( let i=1; i<settings.preferences.sessionsPerSlot; i++ ) {
            if ( parseInt( this.props.schedule.data
                                [this.props.dayId]
                                [this.props.slotKey]
                                [i].sessionKey ) !== -1 ) {
                groupOption = true;
                break;
            }
        }

        if ( ! groupOption ) {
            sessions.push(
                <SessionInfos
                    key={0}
                    dayId={ this.props.dayId }
                    sessionKey={ 0 }
                    slotKey={ this.props.slotKey }
                    slotWidth={ 100 }
                    schedule={ this.props.schedule } />
            );
        }
        else {
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
        }

        return (
            <div style={ slotStyle } className="slot-infos-box">
                { sessions }
            </div>
        );
    }
}

export default SlotInfos;
