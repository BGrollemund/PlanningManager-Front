import React from "react";

class SpeakersList extends React.Component {

    state = {
        speakers: this.props.schedule.settings.speakers
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ( prevProps !== this.props )
            this.setState( { speakers: this.props.schedule.settings.speakers } );
    }

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
        this.props.schedule.removeSpeaker( key );

        this.props.update();
    };

    render() {
        let speakers = [];

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
