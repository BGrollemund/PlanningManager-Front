import React from "react";

class SpeakersRemovePopup extends React.Component {

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
            this.props.removeSpeaker( this.props.speakerKey );
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
                        { this.props.speakerName }
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

export default SpeakersRemovePopup;
