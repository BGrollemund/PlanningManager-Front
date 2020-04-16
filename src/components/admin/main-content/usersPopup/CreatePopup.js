import React from "react";
import formFieldsUtils from "../../../../utils/FormFieldsUtils";

class CreatePopup extends React.Component {

    /**
     * Popup buttons handler
     *
     * @param event
     */
    onPopupClick = ( event ) => {
        const classList = event.target.classList;

        if( classList.contains( 'cancel' ) )
            this.props.closePopup();

        if( classList.contains( 'create' ) ) {
            const
                email = document.querySelector( '#create-user-email' ).value,
                password = document.querySelector( '#create-user-password' ).value,
                role = document.querySelector( '#create-user-role' ).value;

            if( formFieldsUtils.checkCreateUserFields( email, password, role ) )
                this.props.createUser( email, password, role );
        }
    };

    render() {
        return (
            <div className='popup'>
                <div
                    className='popup-content'
                    onClick={ this.onPopupClick }>
                    <h3>
                        Créer un nouvel utilisateur
                    </h3>
                    <div className="flex-column">
                        <input
                            id="create-user-email"
                            placeholder="e-mail"
                            type="text" />
                        <input
                            id="create-user-password"
                            placeholder="mot de passe"
                            type="password" />
                        <select id="create-user-role">
                            <option value="USER">USER</option>
                            <option value="ADMIN">ADMIN</option>
                        </select>
                    </div>
                    <div className="error" id="create-user-error"/>
                    <div>
                        <input
                            className="green create"
                            value="Créer"
                            type="button"/>
                        <input
                            className="cancel"
                            value="Annuler"
                            type="button"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreatePopup;
