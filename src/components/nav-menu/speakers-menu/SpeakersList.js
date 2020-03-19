import React from "react";
import ChangeScheduleSettings from "../../../entities/ChangeScheduleSettings";

class SpeakersList extends React.Component {

    state = {
        speakers: this.props.speakers
    };

    removeSpeaker = ( key ) => {
        this.props.removeSpeaker( new ChangeScheduleSettings( 'removeSpeaker', key ) );
    };

    handleChange = ( key, event ) => {
        const
            name = event.target.name,
            val = event.target.value;

        let newSpeakers = this.state.speakers;
        newSpeakers[key]['edit'+name]( val );
        this.setState( { speakers: newSpeakers } );
    };

    render() {

        let speakers = [];

        if( this.state.speakers ) {
            for( let i=0; i<this.state.speakers.length; i++ ) {
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

                            <input type="button" value="Supprimer" className="red" onClick={ this.removeSpeaker.bind( this, key ) }/>
                        </div>
                ));
            }
        }

        return (
            <div>{ speakers }</div>
        );
    }
}

export default SpeakersList;
