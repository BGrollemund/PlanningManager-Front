import React from "react";

import IChangeSchStg from "../../../interfaces/IChangeSchStg";
import Speaker from "../../../entities/Speaker";
import formFieldsManager from "../../../utils/FormFieldsManager";

class SpeakersAdd extends React.Component {

    state = {
        alias: '',
        name: ''
    };

    constructor( props ) {
        super( props );
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleChange = ( event ) => {
        const
            name = event.target.name,
            val = event.target.value;

        this.setState( { [name]: val } );
    };

    addSpeaker = () => {
        if( formFieldsManager.checkAddSpeakerFields() ) {
            const speaker = new Speaker( this.state.name, this.state.alias );

            this.props.addSpeaker( new IChangeSchStg(
                'addSpeaker',
                'speakers',
                speaker
            ));

            this._isMounted && this.setState( {
                alias: '',
                name: ''
            });
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
