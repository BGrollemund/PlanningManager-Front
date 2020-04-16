import React from "react";

class RemovePopup extends React.Component {

    /**
     * Popup buttons handler
     *
     * @param event
     */
    onPopupClick = ( event ) => {
        const classList = event.target.classList;

        if( classList.contains( 'cancel' ) )
            this.props.closePopup();

        if( classList.contains( 'remove' ) )
            this.props.removeUser( this.props.userToChange._id );
    };

    render() {
        return (
            <div className='popup'>
                <div
                    className='popup-content'
                    onClick={ this.onPopupClick }>
                    <h3>
                        Cette action est irréversible !<br/>
                        Supprimer malgré tout :<br/>
                        { this.props.userToChange.email }
                    </h3>
                    <div>
                        <input
                            className="red remove"
                            value="Supprimer"
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

export default RemovePopup;
