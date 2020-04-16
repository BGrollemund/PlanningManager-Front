import React from "react";

class RolePopup extends React.Component {

    state = {
        role: this.props.userToChange.role
    };

    /**
     * Change handler
     *
     * @param event
     */
    handleChange = ( event ) => {
        this.setState( { role: event.target.value } );
    };

    /**
     * Popup buttons handler
     *
     * @param event
     */
    onPopupClick = ( event ) => {
        const classList = event.target.classList;

        if( classList.contains( 'cancel' ) )
            this.props.closePopup();

        if( classList.contains( 'change' ) )
            this.props.changeRole( this.props.userToChange._id, this.state.role );
    };

    render() {
        return (
            <div className='popup'>
                <div
                    className='popup-content'
                    onClick={ this.onPopupClick }>
                    <h3>Nouveau rôle pour<br/> { this.props.userToChange.email }</h3>
                    <div>
                        <select
                            onChange={ this.handleChange }
                            value={ this.state.role } >
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                        </select>
                        <input
                            className="green change"
                            value="Changer"
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

export default RolePopup;
