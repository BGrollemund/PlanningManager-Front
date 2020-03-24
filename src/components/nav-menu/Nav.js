import React from "react";
import ReactDom from "react-dom";

import SpeakersMenu from "./speakers-menu/SpeakersMenu";
import SessionsMenu from "./sessions-menu/SessionsMenu";
import ScheduleMenu from "./schedule-menu/ScheduleMenu";

class Nav extends React.Component {

    shouldComponentUpdate( nextProps, nextState, nextContext ) {
        return false;
    }

    changeScheduleSettings = ( data ) => {
        this.props.changeScheduleSettings( data );
    };

    update = () => {
        this.props.update();
    };

    deactivateNavBtn = () => {
        document.querySelectorAll('.nav-btn').forEach(el => {
            el.classList.remove('activated');
        });
    };

    onNavBtnClick = ( domElement, reactComponent ) => {
        const $contentMenu = document.querySelector('#content-menu-box');

        if( domElement.classList.contains( 'activated' ) ) {
            this.deactivateNavBtn();
            ReactDom.unmountComponentAtNode( $contentMenu );
            return;
        }

        this.deactivateNavBtn();
        domElement.classList.add('activated');
        ReactDom.render(
            reactComponent,
            $contentMenu
        );
    };

    onNavClick = ( event ) => {
        if( event.target.classList.contains('nav-schedule') )
            this.onNavBtnClick(
                event.target,
                <ScheduleMenu
                    changeSchedule={ this.changeSchedule }
                    infos={ this.props.scheduleSettings.infos }
                    update={ this.update } />
                );
        if( event.target.classList.contains('nav-sessions') )
            this.onNavBtnClick(
                event.target,
                <SessionsMenu
                    changeSessionsList={ this.changeScheduleSettings }
                    sessions={ this.props.scheduleSettings.sessions }
                    update={ this.update } />
                );
        if( event.target.classList.contains('nav-speakers') )
            this.onNavBtnClick(
                event.target,
                <SpeakersMenu
                    changeSpeakersList={ this.changeScheduleSettings }
                    speakers={ this.props.scheduleSettings.speakers }
                    update={ this.update } />
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
