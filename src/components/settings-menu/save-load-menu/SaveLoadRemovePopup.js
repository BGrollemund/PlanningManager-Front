import React from "react";

class SaveLoadRemovePopup extends React.Component {

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
            this.props.removeSchedule( this.props.scheduleInfos.id );
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
                        { this.props.scheduleInfos.name }
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

export default SaveLoadRemovePopup;
