import React from "react";

import SlotsDiv from "./SlotsDiv";

import timeUtils from "../../../../utils/TimeUtils";

class Popup extends React.Component {

    state = {
        data: this.props.schedule.data
    };

    changeData = () => {
        this.forceUpdate();
    };

    render() {

        const settings = this.props.schedule.settings;

        let
            slotsList = [],
            slotsRelatedKeys = [];

        if( settings.slots ) {
            const slotsSorted = timeUtils.sortSlots( settings.slots );

            Object.entries( settings.slots ).forEach( el => {
                if ( ! this.state.data[this.props.dayId].isEmpty( el[0] ) ) {
                    const slotsRelated = timeUtils.findSlotsRelated( el[1], settings.slots );

                    slotsRelated.forEach( el => {
                        slotsRelatedKeys.push( el[0] );
                    });
                }
            });

            slotsList = Object.keys( slotsSorted ).map( key => (
                <SlotsDiv
                    key={key}
                    changeData={ this.changeData }
                    deactivateSlotsRelated={ this.deactivateSlotsRelated }
                    dayId={ this.props.dayId }
                    slotIndex={ slotsSorted[key][0] }
                    showMask={ slotsRelatedKeys.includes( slotsSorted[key][0] ) }
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
                            onClick= { this.props.closePopup }
                            value= "Fermer"
                            type= "button" />
                    </div>
                </div>
            </div>
        );
    }
}

export default Popup;
