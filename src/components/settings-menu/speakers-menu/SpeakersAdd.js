import React from "react";

import Speaker from "../../../entities/settings/Speaker";

import formFieldsUtils from "../../../utils/FormFieldsUtils";

class SpeakersAdd extends React.Component {

    state = {
        alias: '',
        name: ''
    };

    /**
     * Change handler
     *
     * @param event
     */
    handleChange = ( event ) => {
        const
            name = event.target.name,
            val = event.target.value;

        this.setState( { [name]: val } );
    };

    /**
     * Add a speaker in schedule.settings.speakers
     */
    addSpeaker = () => {
        if( formFieldsUtils.checkAddSpeakerFields( this.state.name, this.state.alias ) ) {
            const speaker = new Speaker( this.state.name, this.state.alias );

            this.props.schedule.addSpeaker( speaker );

            this.setState( {
                alias: '',
                name: ''
            });

            this.props.update();
        }
    };

    render() {
        return (
            <div className="content-menu">
                <input
                    id="speaker-name"
                    onChange = { this.handleChange }
                    name="name"
                    placeholder= "Intervenant"
                    value={ this.state.name }
                    type="text" />

                <input
                    id="speaker-alias"
                    onChange = { this.handleChange }
                    name="alias"
                    placeholder= "Abréviation"
                    value={ this.state.alias }
                    type="text" />

                <input
                    className="green"
                    onClick={ this.addSpeaker }
                    value="Ajouter"
                    type="button" />

                <div className="error" id="speaker-error"></div>
            </div>
        );
    }
}

export default SpeakersAdd;
