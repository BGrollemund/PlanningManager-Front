import React from "react";

import Header from "./header/Header";
import Footer from "./footer/Footer";
import Main from "./main-content/Main";
import Settings from "./settings-menu/Settings";
import Stats from "./stats-menu/Stats";

import sch from "../entities/Schedule";

class App extends React.Component {

    state = {
        schedule: sch
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
                <Header/>
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
