import React from "react";
import ReactDom from "react-dom";

import config from "../config/app.config.json";

import Header from "./Header";
import Footer from "./Footer";
import Nav from "./nav-menu/Nav";
import SpeakersMenu from "./nav-menu/speakers-menu/SpeakersMenu";
import sch from "../entities/Schedule";

class App extends React.Component {

    state = {
        schedule: sch
    };

    changeScheduleSettings = ( data ) => {
        this.state.schedule[data.functionName]( data.data );
        console.log( this.state.schedule.settings.speakers );
        ReactDom.render(
            <SpeakersMenu
                changeSpeakersList={ this.changeScheduleSettings }
                speakers={ this.state.schedule.settings.speakers } />,
            document.querySelector('#content-menu-box')
        );
    };

    render() {
        return (
            <div id="content">
                <Header/>
                <Nav
                    changeScheduleSettings={ this.changeScheduleSettings }
                    scheduleSettings={ this.state.schedule.settings } />

                <main>
                    <div id="content-main">
                        <h2>{ config.siteInfos.initialTitle }</h2>
                    </div>
                </main>

                <Footer/>
            </div>
        );
    }
}

export default App;
