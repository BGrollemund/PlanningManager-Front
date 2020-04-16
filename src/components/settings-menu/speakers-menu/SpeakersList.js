import React from "react";

import SpeakersRemovePopup from "./SpeakersRemovePopup";

class SpeakersList extends React.Component {

    state = {
        showRemovePopup: false,
        speakers: this.props.schedule.settings.speakers,
        speakerKeyToRemove: ''
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ( prevProps !== this.props )
            this.setState( { speakers: this.props.schedule.settings.speakers } );
    }

    /**
     * Close popup
     */
    closePopup = () => {
        this.setState( { showRemovePopup: false } );
    };

    /**
     * Open remove session popup
     */
    openRemovePopup = ( key ) => {
        this.setState( { speakerKeyToRemove: key, showRemovePopup: true } );
    };

    /**
     * Change handler
     *
     * @param key
     * @param event
     */
    handleChange = ( key, event ) => {
        const
            name = event.target.name,
            val = event.target.value;

        let newSpeakers = this.state.speakers;

        newSpeakers[key][name] = val;
        this.setState( { speakers: newSpeakers } );

        this.props.update();
    };

    /**
     * Remove a specified speaker in schedule.settings.speakers
     *
     * @param key
     */
    removeSpeaker = ( key ) => {
        this.closePopup();
        this.props.schedule.removeSpeaker( key );
        this.props.update();
    };

    render() {
        let
            popup = '',
            speakers = [];

        if ( this.state.showRemovePopup ) popup = <SpeakersRemovePopup
                                                        removeSpeaker={ this.removeSpeaker }
                                                        closePopup={ this.closePopup }
                                                        speakerName={ this.state.speakers
                                                                            [this.state.speakerKeyToRemove].name }
                                                        speakerKey={ this.state.speakerKeyToRemove } />;

        if( this.state.speakers ) {
            speakers = Object.keys( this.state.speakers ).map( key => (
                <div key={key} className="content-menu-list">
                    <input
                        onChange = { this.handleChange.bind( this, key ) }
                        name="name"
                        placeholder= "Intervenant"
                        value={ this.state.speakers[key].name }
                        type="text" />

                    <input
                        onChange = { this.handleChange.bind( this, key ) }
                        name="alias"
                        placeholder= "Abréviation"
                        value={ this.state.speakers[key].alias }
                        type="text" />

                    <input
                        className="red"
                        onClick={ this.openRemovePopup.bind( this, key ) }
                        value="Supprimer"
                        type="button" />
                </div>
            ));
        }

        return (
            <div>
                { speakers }
                { popup }
            </div>
        );
    }
}

export default SpeakersList;
