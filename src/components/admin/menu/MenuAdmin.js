import React from "react";

class MenuAdmin extends React.Component {

    /**
     * Deactivate admin menu buttons
     */
    deactivateSettingsBtn = () => {
        document.querySelectorAll( '.admin-btn' ).forEach(el => {
            el.classList.remove( 'activated' );
        });
    };

    /**
     * Hide admin contents
     */
    hideSettingsContent = () => {
        document.querySelectorAll( '.admin-content' ).forEach(el => {
            el.classList.add( 'hidden' );
        });
    };

    /**
     * Show needed content
     *
     * @param domElement
     * @param domId
     */
    onMenuBtnClick = ( domElement, domId ) => {
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
     * Admin menu handler
     *
     * @param event
     */
    onMenuClick = ( event ) => {
        const classList = event.target.classList;

        if( classList.contains( 'admin-infos' ) )
            this.onMenuBtnClick( event.target, 'admin-infos' );

        if( classList.contains('admin-users') )
            this.onMenuBtnClick( event.target, 'admin-users' );
    };

    render() {
        return (
            <nav>
                <ul onClick={ this.onMenuClick }>
                    <li className="admin-btn admin-infos activated">Général</li>
                    <li className="admin-btn admin-users">Utilisateurs</li>
                </ul>
            </nav>
        );
    }
}

export default MenuAdmin;
