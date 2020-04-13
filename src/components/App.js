import React from "react";

// To use after authentication
// import Connector from "../connector/Connector";
// Connector.post('/api/schedules', { schedule: this.state.schedule }).then( res => console.log( 'success!' ) );

import Header from "./header/Header";
import Footer from "./footer/Footer";
import Main from "./main-content/Main";
import Settings from "./settings-menu/Settings";
import Stats from "./stats-menu/Stats";

import sch from "../entities/Schedule";

class App extends React.Component {

    state = {
        schedule: sch,
        userAttr: {
            token: '',
            userId: ''
        }
    };

    /**
     * Change user attributes when connect or disconnect
     *
     * @param token
     * @param userId
     */
    changeUserAttr = ( token, userId ) => {
        this.setState( { userAttr: { token: token, userId: userId } } );
    };

    /**
     * Update React Components
     */
    update = () => {
        this.forceUpdate();
    };

    render() {
        return (
            <div id="content">
                <Header
                    changeUserAttr={ this.changeUserAttr }
                    userAttr={ this.state.userAttr } />
                <Settings
                    schedule={ this.state.schedule }
                    update={ this.update } />
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
