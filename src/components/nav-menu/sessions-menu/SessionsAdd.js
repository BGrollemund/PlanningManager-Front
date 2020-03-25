import React from "react";
import ReactCircleColorPicker from "react-circle-color-picker";

import IChangeSchStg from "../../../interfaces/IChangeSchStg";
import Session from "../../../entities/settings/Session";
import colorManager from "../../../utils/ColorManager";
import formFieldsManager from "../../../utils/FormFieldsManager";

class SessionsAdd extends React.Component {

    state = {
        alias: '',
        color: '',
        colors: colorManager.getList(),
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

    addSession = () => {
        if( formFieldsManager.checkAddSessionFields( this.state.name, this.state.alias, this.state.color ) ) {
            const session = new Session( this.state.name, this.state.alias, this.state.color );
            this.props.addSession( new IChangeSchStg(
                'addSession',
                'sessions',
                session
            ));

            this._isMounted && this.setState( {
                alias: '',
                color: '',
                colors: colorManager.getList(),
                name: '',
            });
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
