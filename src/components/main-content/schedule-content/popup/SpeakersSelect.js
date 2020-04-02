import React from "react";

class SpeakersSelect extends React.Component {

    state = {
        data: this.props.schedule.data
    };

    /**
     * Speaker change handler
     *
     * @param event
     */
    handleSpeakerChange = ( event ) => {
        let newData = this.props.schedule.data;
        newData
            [this.props.dayId]
            [this.props.slotIndex]
            [this.props.sessionIndex].speakerKeys[this.props.speakerIndex] = event.target.value;

        this.setState( { data: newData } );
    };

    render() {

        const settings = this.props.schedule.settings;

        let speakers = [];

        if( settings.speakers ) {
            speakers = Object.keys(settings.speakers).map(key => (
                <option key={key} value={key}>
                    { settings.speakers[key].name }
                </option>
            ));
        }

        return (
            <select
                disabled={ this.props.disabled }
                onChange={ this.handleSpeakerChange }
                value={ this.state.data
                            [this.props.dayId]
                            [this.props.slotIndex]
                            [this.props.sessionIndex].speakerKeys[this.props.speakerIndex] } >
                    <option value="">Pas d'intervenant</option>
                    { speakers }
            </select>
        );
    }
}

export default SpeakersSelect;
