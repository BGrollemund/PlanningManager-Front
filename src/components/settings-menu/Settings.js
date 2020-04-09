import React from "react";

import InfosMenu from "./infos-menu/InfosMenu";
import SessionsMenu from "./sessions-menu/SessionsMenu";
import SlotsMenu from "./slots-menu/SlotsMenu";
import SpeakersMenu from "./speakers-menu/SpeakersMenu";
import PreferencesMenu from "./preferences-menu/PreferencesMenu";

class Settings extends React.Component {

    /**
     * Deactivate settings buttons
     */
    deactivateSettingsBtn = () => {
        document.querySelectorAll( '.settings-btn' ).forEach(el => {
            el.classList.remove( 'activated' );
        });
    };

    /**
     * Hide settings contents
     */
    hideSettingsContent = () => {
        document.querySelectorAll( '.settings-content' ).forEach(el => {
            el.classList.add( 'hidden' );
        });
    };

    /**
     * Show needed menu in settings menu
     *
     * @param domElement
     * @param domId
     */
    onSettingsBtnClick = ( domElement, domId ) => {
        if ( domElement.classList.contains( 'activated' ) ) {
            this.deactivateSettingsBtn();
            this.hideSettingsContent();
            return;
        }

        this.deactivateSettingsBtn();
        this.hideSettingsContent();
        domElement.classList.add( 'activated' );
        document.querySelector( '#' + domId ).classList.remove( 'hidden' );
    };

    /**
     * Settings menu handler
     *
     * @param event
     */
    onSettingsClick = ( event ) => {
        const classList = event.target.classList;

        if( classList.contains( 'settings-infos' ) )
            this.onSettingsBtnClick( event.target, 'settings-infos' );

        if( event.target.classList.contains('settings-sessions') )
            this.onSettingsBtnClick( event.target, 'settings-sessions' );

        if( event.target.classList.contains('settings-speakers') )
            this.onSettingsBtnClick( event.target, 'settings-speakers' );

        if( event.target.classList.contains('settings-slots') )
            this.onSettingsBtnClick( event.target, 'settings-slots' );

        if( event.target.classList.contains('settings-preferences') )
            this.onSettingsBtnClick( event.target, 'settings-preferences' );
    };

    render() {
        return (
            <nav>
                <ul onClick={ this.onSettingsClick }>
                    <li className="settings-btn settings-infos">Planning</li>
                    <li className="settings-btn settings-sessions">Activités</li>
                    <li className="settings-btn settings-speakers">Intervenants</li>
                    <li className="settings-btn settings-slots">Horaires</li>
                    <li className="settings-btn settings-preferences">Préférences</li>
                </ul>
                <div className="settings-content hidden" id="settings-infos">
                    <InfosMenu
                        schedule={ this.props.schedule }
                        update={ this.props.update } />
                </div>
                <div className="settings-content hidden" id="settings-sessions">
                    <SessionsMenu
                        schedule={ this.props.schedule }
                        update={ this.props.update } />
                </div>
                <div className="settings-content hidden" id="settings-speakers">
                    <SpeakersMenu
                        schedule={ this.props.schedule }
                        update={ this.props.update } />
                </div>
                <div className="settings-content hidden" id="settings-slots">
                    <SlotsMenu
                        schedule={ this.props.schedule }
                        update={ this.props.update } />
                </div>
                <div className="settings-content hidden" id="settings-preferences">
                    <PreferencesMenu
                        schedule={ this.props.schedule }
                        update={ this.props.update } />
                </div>
            </nav>
        );
    }
}

export default Settings;
