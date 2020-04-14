import React from "react";

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
        this.setState( { scheduleId: '', userAttr: { token: token, userId: userId } } );
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
