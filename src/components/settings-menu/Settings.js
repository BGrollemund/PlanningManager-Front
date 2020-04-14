import React from "react";

import InfosMenu from "./infos-menu/InfosMenu";
import SaveLoadMenu from "./save-load-menu/SaveLoadMenu";
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

        if( classList.contains('settings-sessions') )
            this.onSettingsBtnClick( event.target, 'settings-sessions' );

        if( classList.contains('settings-speakers') )
            this.onSettingsBtnClick( event.target, 'settings-speakers' );

        if( classList.contains('settings-slots') )
            this.onSettingsBtnClick( event.target, 'settings-slots' );

        if( classList.contains('settings-preferences') )
            this.onSettingsBtnClick( event.target, 'settings-preferences' );

        if( classList.contains('settings-save-load') )
            this.onSettingsBtnClick( event.target, 'settings-save-load' );
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
                    <li className="settings-btn settings-save-load">Sauvegarder / Charger</li>
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
                <div className="settings-content hidden" id="settings-save-load">
                    <SaveLoadMenu
                        schedule={ this.props.schedule }
                        scheduleId={ this.props.scheduleId }
                        userAttr={ this.props.userAttr }
                        updateFromDB={ this.props.updateFromDB } />
                </div>
            </nav>
        );
    }
}

export default Settings;
