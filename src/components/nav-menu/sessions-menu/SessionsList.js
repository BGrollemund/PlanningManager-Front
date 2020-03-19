import React from "react";

import ChangeScheduleSettings from "../../../entities/ChangeScheduleSettings";

class SessionsList extends React.Component {

    state = {
        sessions: this.props.sessions
    };

    removeSession = ( key ) => {
        this.props.removeSession( new ChangeScheduleSettings( 'removeSession', key ) );
    };

    handleChange = ( key, event ) => {
        const
            name = event.target.name,
            val = event.target.value;

        let newSessions = this.state.sessions;
        newSessions[key]['edit'+name]( val );
        this.setState( { sessions: newSessions } );
    };

    render() {

        let sessions = [];

        if( this.state.sessions ) {
            for( let i=0; i<this.state.sessions.length; i++ ) {
                sessions = Object.keys( this.state.sessions ).map( key => (
                    <div key={key} className="content-menu-list">
                        <input
                            id={ "session-name-"+key }
                            onChange = { this.handleChange.bind( this, key ) }
                            name="Name"
                            value={ this.state.speakers[key].name }
                            type="text" />

                        <input
                            id={ "session-alias-"+key }
                            onChange = { this.handleChange.bind( this, key ) }
                            name="Alias"
                            value={ this.state.speakers[key].alias }
                            type="text" />

                        <input type="button" value="Supprimer" className="red" onClick={ this.removeSession.bind( this, key ) }/>
                    </div>
                ));
            }
        }

        return (
            <div>{ sessions }</div>
        );
    }
}

export default SessionsList;
