import React from "react";

import formFieldsUtils from "../../../../utils/FormFieldsUtils";

class PassPopup extends React.Component {

    /**
     * Popup buttons handler
     *
     * @param event
     */
    onPopupClick = ( event ) => {
        const
            classList = event.target.classList,
            password = document.querySelector( '#change-password' ).value;

        if( classList.contains( 'cancel' ) )
            this.props.closePopup();

        if( classList.contains( 'change' ) )
            if ( formFieldsUtils.checkChangePasswordField( password ) )
                this.props.changePass( this.props.userToChange._id, password );
    };

    render() {
        return (
            <div className='popup'>
                <div
                    className='popup-content'
                    onClick={ this.onPopupClick }>
                    <h3>Nouveau mot de passe pour<br/> { this.props.userToChange.email }</h3>
                    <div>
                        <input
                            id="change-password"
                            placeholder="mot de passe"
                            type="password" />
                        <input
                            className="green change"
                            value="Changer"
                            type="button"/>
                        <input
                            className="cancel"
                            value="Annuler"
                            type="button"/>
                    </div>
                    <div className="error" id="change-password-error"/>
                </div>
            </div>
        );
    }
}

export default PassPopup;
