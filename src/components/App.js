import React from "react";
import history from "../history";

import Header from "./header/Header";
import Footer from "./footer/Footer";
import Main from "./main-content/Main";
import Settings from "./settings-menu/Settings";
import Stats from "./stats-menu/Stats";

import sch from "../entities/Schedule";

class App extends React.Component {

    state = {
        schedule: sch,
        scheduleId: '',
        userAttr: {
            token: '',
            userId: '',
            role: ''
        }
    };

    componentDidMount() {
        // Set user attributes if redirect to home with
        if ( this.props.location.state && this.props.location.state.userAttr ) {
            this.setState( { userAttr: this.props.location.state.userAttr } );

            // Clear props.location.state
            history.push( '/', {} );
        }
    }

    /**
     * Change user attributes when connect or disconnect
     *
     * @param token
     * @param userId
     * @param role
     */
    changeUserAttr = ( token, userId, role ) => {
        this.setState( { scheduleId: '', userAttr: { token: token, userId: userId, role: role } } );
    };

    /**
     * Update React Components
     */
    update = () => {
        this.forceUpdate();
    };

    /**
     * Update with data from database
     *
     * @param scheduleId
     */
    updateFromDB = ( scheduleId ) => {
        this.setState( { scheduleId: scheduleId } );
    };

    render() {
        return (
            <div id="content">
                <Header
                    changeUserAttr={ this.changeUserAttr }
                    userAttr={ this.state.userAttr } />
                <Settings
                    schedule={ this.state.schedule }
                    scheduleId={ this.state.scheduleId }
                    userAttr={ this.state.userAttr }
                    update={ this.update }
                    updateFromDB={ this.updateFromDB } />
                <Main
                    schedule={ this.state.schedule }
                    update={ this.update } />
                <Stats
                    schedule={ this.state.schedule } />
                <Footer/>
            </div>
        );
    }
}

export default App;
