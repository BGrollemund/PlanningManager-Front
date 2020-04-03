import React from "react";
import ReactCircleColorPicker from "react-circle-color-picker";

import colorUtils from "../../../utils/ColorUtils";

class SessionsList extends React.Component {

    state = {
        colors: [],
        sessions: this.props.sessions
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
        newSessions[key]['edit'+name]( val );

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
                newSessions[key].editColor( '' );
                this.setState( { sessions: newSessions } );
            }
        });

        event.forEach( el => {
            if ( el.selected ) {
                newSessions[key].editColor( el.hex );
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
        this.props.changeScheduleSettings( {
            functionName: 'removeSession',
            reactComponentName: 'sessions',
            data: key
        });
    };

    render() {
        let sessions = [];

        if( this.state.sessions ) {
            sessions = Object.keys( this.state.sessions ).map( key => (
                <div key={key} className="content-menu-list">
                    <input
                        id={ "session-name-"+key }
                        onChange = { this.handleChange.bind( this, key ) }
                        name="Name"
                        value={ this.state.sessions[key].name }
                        type="text" />

                    <input
                        id={ "session-alias-"+key }
                        onChange = { this.handleChange.bind( this, key ) }
                        name="Alias"
                        value={ this.state.sessions[key].alias }
                        type="text" />

                    <div className="color-picker" id={ "session-color-"+key }>
                        <ReactCircleColorPicker
                            onChange={ this.handleColorChange.bind( this, key ) }
                            colors={ colorUtils.getListWithSelected( this.state.sessions[key].color ) } />
                    </div>

                    <input
                        className="red"
                        onClick={ this.removeSession.bind( this, key ) }
                        type="button"
                        value="Supprimer" />
                </div>
            ));
        }

        return (
            <div>{ sessions }</div>
        );
    }
}

export default SessionsList;
