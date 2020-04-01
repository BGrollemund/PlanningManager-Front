import React from "react";
import ReactDom from "react-dom";

import Header from "./header/Header";
import Footer from "./footer/Footer";
import Main from "./main-content/Main";
import Nav from "./nav-menu/Nav";
import PreferencesMenu from "./nav-menu/preferences-menu/PreferencesMenu";
import SessionsMenu from "./nav-menu/sessions-menu/SessionsMenu";
import SlotsMenu from "./nav-menu/slots-menu/SlotsMenu";
import SpeakersMenu from "./nav-menu/speakers-menu/SpeakersMenu";

import sch from "../entities/Schedule";

class App extends React.Component {

    state = {
        schedule: sch
    };

    /**
     * Edit settings schedule
     *
     * @param data
     */
    changeScheduleSettings = ( data ) => {
        ReactDom.unmountComponentAtNode( document.querySelector('#content-menu-box') );
        this.state.schedule[data.functionName]( data.data );
        ReactDom.render(
            this.getMenuComponent( data.reactComponentName ),
            document.querySelector('#content-menu-box')
        );
        this.update();
    };

    /**
     * Get React Component needed in nav menu
     *
     * @param reactComponentName
     * @return {string|*}
     */
    getMenuComponent = ( reactComponentName ) => {
        switch( reactComponentName ) {
            case 'preferences': return <PreferencesMenu
                                        changeScheduleSettings={ this.changeScheduleSettings }
                                        preferences={ this.state.schedule.settings.preferences }
                                        update={ this.update } />;
            case 'speakers': return <SpeakersMenu
                                        changeScheduleSettings={ this.changeScheduleSettings }
                                        speakers={ this.state.schedule.settings.speakers }
                                        update={ this.update } />;
            case 'sessions': return <SessionsMenu
                                        changeScheduleSettings={ this.changeScheduleSettings }
                                        sessions={ this.state.schedule.settings.sessions }
                                        update={ this.update } />;
            case 'slots': return <SlotsMenu
                                        changeScheduleSettings={ this.changeScheduleSettings }
                                        slots={ this.state.schedule.settings.slots }
                                        update={ this.update } />;
            default: return '';
        }
    };

    /**
     * Update React Components
     */
    update = () => {
        this.state.schedule.initData();

        if ( this.state.schedule.maxSessionsPerSlot < this.state.schedule.settings.preferences.sessionsPerSlot )
            this.state.schedule.updateDataBySessionPerSlot();

        this.forceUpdate();
    };

    render() {
        console.log( this.state.schedule );

        return (
            <div id="content">
                <Header/>
                <Nav
                    changeScheduleSettings={ this.changeScheduleSettings }
                    scheduleSettings={ this.state.schedule.settings }
                    update={ this.update } />
                <Main
                    changeScheduleData={ this.changeScheduleData }
                    schedule={ this.state.schedule } />
                <Footer/>
            </div>
        );
    }
}

export default App;
