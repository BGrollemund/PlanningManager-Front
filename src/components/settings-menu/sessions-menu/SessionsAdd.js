import React from "react";
import ReactCircleColorPicker from "react-circle-color-picker";

import Session from "../../../entities/settings/Session";

import colorUtils from "../../../utils/ColorUtils";
import formFieldsUtils from "../../../utils/FormFieldsUtils";

class SessionsAdd extends React.Component {

    state = {
        alias: '',
        color: '',
        colors: colorUtils.getList(),
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
     * Color change handler
     *
     * @param event
     * @return {Promise<void>}
     */
    handleColorChange = async ( event ) => {
        await event.forEach( el => {
            if ( el.hex === this.state.color ) {
                el.selected = false;
                this.setState( { color: '' } );
            }
        });

        event.forEach( el => {
            if ( el.selected ) this.setState( { color: el.hex } );
        });
    };

    /**
     * Add a session in schedule.settings.sessions
     */
    addSession = () => {
        if ( formFieldsUtils.checkAddSessionFields( this.state.name, this.state.alias, this.state.color ) ) {
            const session = new Session(this.state.name, this.state.alias, this.state.color);

            this.props.schedule.addSession( session );
            this.state.colors.forEach( el => {
                if ( el.selected ) el.selected = false;
            });

            this.setState({
                alias: '',
                color: '',
                name: '',
            });

            this.props.update();
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

                <div className="color-picker" id="session-color">
                    <ReactCircleColorPicker
                        onChange={ this.handleColorChange }
                        colors={ this.state.colors } />
                </div>

                <input
                    className="green"
                    onClick={ this.addSession }
                    value="Ajouter"
                    type="button" />

                <div className="error" id="session-error"></div>
            </div>
        );
    }
}

export default SessionsAdd;
