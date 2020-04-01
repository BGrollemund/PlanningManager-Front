import React from "react";
import timeUtils from "../../../../utils/TimeUtils";
import GroupNameSpan from "../popup/GroupNameSpan";

class SessionInfos extends React.Component {

    render() {

        const
            settings = this.props.schedule.settings,
            session = settings.sessions[
                this.props.schedule.data
                    [this.props.dayId]
                    [this.props.slotKey]
                    [this.props.sessionKey].sessionKey
            ],
            speakerKeys = this.props.schedule.data
                            [this.props.dayId]
                            [this.props.slotKey]
                            [this.props.sessionKey].speakerKeys;

        let
            background = '',
            groupName = '',
            mention = '',
            sessionAlias = '',
            speakersAlias = '',
            speakersAliasArr = [],
            timeEnd = '',
            timeStart = '';

        if ( session ) {
            background = session.color;
            sessionAlias = session.alias;
        }

        speakerKeys.forEach( el => {
            if ( settings.speakers[el] )
                speakersAliasArr.push( settings.speakers[el].alias );
        });

        if ( speakersAliasArr ) speakersAlias = speakersAliasArr.join( ' - ' );

        if ( sessionAlias || speakersAlias ) {
            if ( settings.preferences.showGroup )
                groupName = <GroupNameSpan
                                sessionIndex={ this.props.sessionKey }
                                sessionsPerSolt={ settings.preferences.sessionsPerSlot } />;

            if ( this.props.sessionKey === 0 && settings.preferences.showSlot ) {
                timeEnd = timeUtils.formatForUser( settings.slots[this.props.slotKey].end_time );
                timeStart = timeUtils.formatForUser( settings.slots[this.props.slotKey].start_time );
            }
        }

        if ( settings.preferences.mentionOption )
            mention = this.props.schedule.data
                [this.props.dayId]
                [this.props.slotKey]
                [this.props.sessionKey].mention;

        const slotWidthStyle = {
            background: background,
            width: this.props.slotWidth + '%' };

        return (
            <div style={ slotWidthStyle } className="session-infos-box">
                <div className="session-infos">
                    { sessionAlias }<br/>
                    { speakersAlias }
                </div>
                <div className="group-infos">
                    { groupName }
                </div>
                <div className="start-time-infos">
                    { timeStart }
                </div>
                <div className="end-time-infos">
                    { timeEnd }
                </div>
                <div className="mention-infos">
                    { mention }
                </div>
            </div>
        );
    }
}

export default SessionInfos;
