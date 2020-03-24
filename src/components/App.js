import React from "react";
import ReactDom from "react-dom";

import Header from "./header/Header";
import Footer from "./footer/Footer";
import Main from "./main-content/Main";
import Nav from "./nav-menu/Nav";
import SpeakersMenu from "./nav-menu/speakers-menu/SpeakersMenu";
import SessionsMenu from "./nav-menu/sessions-menu/SessionsMenu";

import sch from "../entities/Schedule";

class App extends React.Component {

    state = {
        schedule: sch
    };

    changeScheduleSettings = ( data ) => {
        ReactDom.unmountComponentAtNode( document.querySelector('#content-menu-box') );
        this.state.schedule[data.functionName]( data.data );
        ReactDom.render(
            this.getMenuComponent( data.reactComponentName ),
            document.querySelector('#content-menu-box')
        );
        this.update();
    };

    getMenuComponent = ( reactComponentName ) => {
        switch( reactComponentName ) {
            case 'speakers': return <SpeakersMenu
                                        changeSpeakersList={ this.changeScheduleSettings }
                                        speakers={ this.state.schedule.settings.speakers }
                                        update={ this.update } />;
            case 'sessions': return <SessionsMenu
                                        changeSessionsList={ this.changeScheduleSettings }
                                        sessions={ this.state.schedule.settings.sessions }
                                        update={ this.update } />;
            default: return '';
        }
    };

    update = () => {
        this.forceUpdate();
    };

    render() {
        return (
            <div id="content">
                <Header/>
                <Nav
                    changeScheduleSettings={ this.changeScheduleSettings }
                    scheduleSettings={ this.state.schedule.settings }
                    update={ this.update } />
                <Main
                    schedule={ this.state.schedule } />
                <Footer/>
            </div>
        );
    }
}

export default App;
