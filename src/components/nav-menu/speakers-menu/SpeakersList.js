import React from "react";

class SpeakersList extends React.Component {

    state = {
        speakers: this.props.speakers
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
        newSpeakers[key]['edit'+name]( val );

        this.setState( { speakers: newSpeakers } );
        this.props.update();
    };

    /**
     * Remove a specified speaker in schedule.settings.speakers
     *
     * @param key
     */
    removeSpeaker = ( key ) => {
        this.props.changeScheduleSettings( {
            functionName: 'removeSpeaker',
            reactComponentName: 'speakers',
            data: key
        });
    };

    render() {
        let speakers = [];

        if( this.state.speakers ) {
            speakers = Object.keys( this.state.speakers ).map( key => (
                <div key={key} className="content-menu-list">
                    <input
                        id={ "speaker-name-"+key }
                        onChange = { this.handleChange.bind( this, key ) }
                        name="Name"
                        placeholder= "Intervenant"
                        value={ this.state.speakers[key].name }
                        type="text" />

                    <input
                        id={ "speaker-alias-"+key }
                        onChange = { this.handleChange.bind( this, key ) }
                        name="Alias"
                        placeholder= "Abréviation"
                        value={ this.state.speakers[key].alias }
                        type="text" />

                    <input
                        className="red"
                        onClick={ this.removeSpeaker.bind( this, key ) }
                        value="Supprimer"
                        type="button" />
                </div>
            ));
        }

        return (
            <div>{ speakers }</div>
        );
    }
}

export default SpeakersList;
