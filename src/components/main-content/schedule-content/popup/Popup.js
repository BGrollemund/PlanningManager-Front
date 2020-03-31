import React from "react";

import SlotsDiv from "./SlotsDiv";

class Popup extends React.Component {

    state = {
        data: this.props.schedule.data
    };

    /**
     * Close Popup
     */
    closePopup = () => {
        this.props.closePopup();
    };

    render() {

        const settings = this.props.schedule.settings;

        let slotsList = [];

        if( settings.slots ) {
            slotsList = Object.keys(settings.slots).map( key => (
                <SlotsDiv
                    key={key}
                    dayId={ this.props.dayId }
                    slotIndex={ key }
                    schedule={ this.props.schedule } />
            ));
        }

        return (
            <div className='popup'>
                <div className='popup-inner'>
                    <h3>{ this.props.dayString }</h3>
                    <div className="flex-grow-1">
                        { slotsList }
                    </div>
                    <div>
                        <input
                            onClick= { this.closePopup }
                            value= "Fermer"
                            type= "button" />
                    </div>
                </div>
            </div>
        );
    }
}

export default Popup;
