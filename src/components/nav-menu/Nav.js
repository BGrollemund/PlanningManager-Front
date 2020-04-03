import React from "react";
import ReactDom from "react-dom";

import ScheduleMenu from "./schedule-menu/ScheduleMenu";
import SessionsMenu from "./sessions-menu/SessionsMenu";
import SlotsMenu from "./slots-menu/SlotsMenu";
import SpeakersMenu from "./speakers-menu/SpeakersMenu";
import PreferencesMenu from "./preferences-menu/PreferencesMenu";

class Nav extends React.Component {

    shouldComponentUpdate( nextProps, nextState, nextContext ) {
        return false;
    }

    /**
     * Deactivate nav button
     */
    deactivateNavBtn = () => {
        document.querySelectorAll('.nav-btn').forEach(el => {
            el.classList.remove('activated');
        });
    };

    /**
     * Render needed menu in nav menu
     *
     * @param domElement
     * @param reactComponent
     */
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

    /**
     * Nav menu handler
     *
     * @param event
     */
    onNavClick = ( event ) => {
        if( event.target.classList.contains('nav-schedule') )
            this.onNavBtnClick(
                event.target,
                <ScheduleMenu
                    infos={ this.props.scheduleSettings.infos }
                    update={ this.props.update } />
                );
        if( event.target.classList.contains('nav-sessions') )
            this.onNavBtnClick(
                event.target,
                <SessionsMenu
                    changeScheduleSettings={ this.props.changeScheduleSettings }
                    sessions={ this.props.scheduleSettings.sessions }
                    update={ this.props.update } />
                );
        if( event.target.classList.contains('nav-speakers') )
            this.onNavBtnClick(
                event.target,
                <SpeakersMenu
                    changeScheduleSettings={ this.props.changeScheduleSettings }
                    speakers={ this.props.scheduleSettings.speakers }
                    update={ this.props.update } />
                );
        if( event.target.classList.contains('nav-slots') )
            this.onNavBtnClick(
                event.target,
                <SlotsMenu
                    changeScheduleSettings={ this.props.changeScheduleSettings }
                    slots={ this.props.scheduleSettings.slots }
                    update={ this.props.update } />
                );
        if( event.target.classList.contains('nav-preferences') )
            this.onNavBtnClick(
                event.target,
                <PreferencesMenu
                    preferences={ this.props.scheduleSettings.preferences }
                    update={ this.props.update } />
                );
    };

    render() {
        return (
            <nav>
                <ul onClick={ this.onNavClick }>
                    <li className="nav-btn nav-schedule">Planning</li>
                    <li className="nav-btn nav-sessions">Activités</li>
                    <li className="nav-btn nav-speakers">Intervenants</li>
                    <li className="nav-btn nav-slots">Horaires</li>
                    <li className="nav-btn nav-preferences">Préférences</li>
                </ul>
                <div id="content-menu-box"></div>
            </nav>
        );
    }
}

export default Nav;
