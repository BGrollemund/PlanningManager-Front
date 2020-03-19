import React from "react";
import ReactDom from "react-dom";

import InputSchedule from "./InputSchedule";
import Empty from "../Empty";
import SpeakersMenu from "./speakers-menu/SpeakersMenu";
import SessionsMenu from "./sessions-menu/SessionsMenu";

class Nav extends React.Component {

    deactivateNavBtn = () => {
        document.querySelectorAll('.nav-btn').forEach(el => {
            el.classList.remove('activated');
        });
    };

    onNavBtnClick = ( domElement, reactComponent ) => {
        if( domElement.classList.contains( 'activated' ) ) {
            this.deactivateNavBtn();
            ReactDom.render(
                <Empty/>,
                document.querySelector('#content-menu-box')
            );
            return;
        }

        this.deactivateNavBtn();
        domElement.classList.add('activated');
        ReactDom.render(
            reactComponent,
            document.querySelector('#content-menu-box')
        );
    };

    changeScheduleSettings = ( data ) => {
        this.props.changeScheduleSettings( data );
    };

    onNavClick = ( event ) => {
        if( event.target.classList.contains('nav-schedule') )
            this.onNavBtnClick( event.target, <InputSchedule/> );
        if( event.target.classList.contains('nav-sessions') )
            this.onNavBtnClick(
                event.target,
                <SessionsMenu
                    changeSessionsList={ this.changeScheduleSettings }
                    sessions={ this.props.scheduleSettings.sessions } />
                );
        if( event.target.classList.contains('nav-speakers') )
            this.onNavBtnClick(
                event.target,
                <SpeakersMenu
                    changeSpeakersList={ this.changeScheduleSettings }
                    speakers={ this.props.scheduleSettings.speakers } />
                );
    };

    render() {
        return (
            <nav>
                <ul onClick={ this.onNavClick }>
                    <li className="nav-btn nav-schedule">Planning</li>
                    <li className="nav-btn nav-sessions">Activités</li>
                    <li className="nav-btn nav-speakers">Intervenants</li>
                </ul>
                <div id="content-menu-box"></div>
            </nav>
        );
    }
}

export default Nav;
