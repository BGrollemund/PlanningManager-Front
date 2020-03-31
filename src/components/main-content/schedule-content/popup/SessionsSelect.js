import React from "react";
import SpeakersSelect from "./SpeakersSelect";

class SessionsSelect extends React.Component {

    state = {
        data: this.props.schedule.data
    };

    /**
     * Session change handler
     *
     * @param event
     */
    handleSessionChange = ( event ) => {
        let newData = this.props.schedule.data;
        newData
            [this.props.dayId]
            [this.props.slotIndex]
            [this.props.sessionIndex].sessionKey = event.target.value;

        this.setState( { data: newData } );
    };

    render() {

        const settings = this.props.schedule.settings;

        let
            sessions = [],
            speakersList = [];

        if( settings.sessions ) {
            sessions = Object.keys(settings.sessions).map(key => (
                <option key={key} value={key}>
                    { settings.sessions[key].name }
                </option>
            ));
        }

        for ( let i=0; i<settings.preferences.speakersPerSlot; i++ ) {
            speakersList.push(
                <SpeakersSelect
                    key={i}
                    dayId={ this.props.dayId }
                    sessionIndex={ this.props.sessionIndex }
                    slotIndex={ this.props.slotIndex }
                    speakerIndex={ i }
                    schedule={ this.props.schedule } />
            );
        }

        return (
            <span>
                <select
                    onChange={ this.handleSessionChange }
                    value={ this.state.data
                                [this.props.dayId]
                                [this.props.slotIndex]
                                [this.props.sessionIndex].sessionKey } >
                    <option value="">Pas d'activité</option>
                    { sessions }
                </select>
                { speakersList }
            </span>
        );
    }
}

export default SessionsSelect;
