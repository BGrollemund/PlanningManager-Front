import React from "react";
import ReactCircleColorPicker from "react-circle-color-picker";

import SessionsRemovePopup from "./SessionsRemovePopup";

import colorUtils from "../../../utils/ColorUtils";

class SessionsList extends React.Component {

    state = {
        showRemovePopup: false,
        sessions: this.props.schedule.settings.sessions,
        sessionKeyToRemove: ''
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ( prevProps !== this.props )
            this.setState( { sessions: this.props.schedule.settings.sessions } );
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
        this.setState( { sessionKeyToRemove: key, showRemovePopup: true } );
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

        let newSessions = this.state.sessions;
        newSessions[key][name] = val;

        this.setState( { sessions: newSessions } );

        this.props.update();
    };

    /**
     * Color change handler
     *
     * @param key
     * @param event
     * @return {Promise<void>}
     */
    handleColorChange = async ( key, event ) => {
        let newSessions = this.state.sessions;

        await event.forEach( el => {
            if ( el.hex === this.state.sessions[key].color ) {
                el.selected = false;
                newSessions[key].color = '';
                this.setState( { sessions: newSessions } );
            }
        });

        event.forEach( el => {
            if ( el.selected ) {
                newSessions[key].color = el.hex;
                this.setState( { sessions: newSessions } );
            }
        });

        this.props.update();
    };

    /**
     * Remove a specified session in schedule.settings.sessions
     *
     * @param key
     */
    removeSession = ( key ) => {
        this.closePopup();
        this.props.schedule.removeSession( key );
        this.props.update();
    };

    render() {
        let
            popup = '',
            sessions = [];

        if ( this.state.showRemovePopup ) popup = <SessionsRemovePopup
                                                        removeSession={ this.removeSession }
                                                        closePopup={ this.closePopup }
                                                        sessionName={ this.state.sessions
                                                                                [this.state.sessionKeyToRemove].name }
                                                        sessionKey={ this.state.sessionKeyToRemove } />;

        if ( this.state.sessions ) {
            sessions = Object.keys( this.state.sessions ).map( key => (
                <div key={key} className="content-menu-list">
                    <input
                        onChange={ this.handleChange.bind( this, key ) }
                        name="name"
                        value={ this.state.sessions[key].name }
                        type="text" />

                    <input
                        onChange={ this.handleChange.bind( this, key ) }
                        name="alias"
                        value={ this.state.sessions[key].alias }
                        type="text" />

                    <div className="color-picker">
                        <ReactCircleColorPicker
                            onChange={ this.handleColorChange.bind( this, key ) }
                            colors={ colorUtils.getListWithSelected( this.state.sessions[key].color ) } />
                    </div>

                    <input
                        className="red"
                        onClick={ this.openRemovePopup.bind( this, key ) }
                        type="button"
                        value="Supprimer" />
                </div>
            ));
        }

        return (
            <div>
                { sessions }
                { popup }
            </div>
        );
    }
}

export default SessionsList;
