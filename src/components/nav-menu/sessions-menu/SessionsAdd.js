import React from "react";

import ChangeScheduleSettings from "../../../entities/ChangeScheduleSettings";
import Session from "../../../entities/Session";
import formFieldsManager from "../../../utils/FormFieldsManager";

class SessionsAdd extends React.Component {

    state = {
        alias: '',
        color: '',
        name: ''
    };

    handleChange = ( event ) => {
        const
            name = event.target.name,
            val = event.target.value;

        this.setState( { [name]: val } );
    };

    addSession = () => {
        if( formFieldsManager.checkAddSessionFields() ) {
            const session = new Session( this.state.name, this.state.alias, this.state.color );
            this.props.addSession( new ChangeScheduleSettings( 'addSession', session ) );

            this.setState( {
                alias: '',
                color: '',
                name: '',
            } );
        }
    };

    render() {
        return (
            <div className="content-menu">
                <input
                    id="session-name"
                    onChange = { this.handleChange }
                    name="name"
                    placeholder= "Activité"
                    value={ this.state.name }
                    type="text" />

                <input
                    id="session-alias"
                    onChange = { this.handleChange }
                    name="alias"
                    placeholder= "Abréviation"
                    value={ this.state.alias }
                    type="text" />



                <input type="button" value="Ajouter" className="green" onClick={ this.addSession }/>

                <div className="error" id="session-error"></div>
            </div>
        );
    }
}

export default SessionsAdd;
