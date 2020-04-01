import React from "react";

import SlotInfos from "./SlotInfos";

class DayInfos extends React.Component {

    render() {

        const
            settings = this.props.schedule.settings,
            slotHeight= 1 / ( Object.keys( settings.slots ).length ) * 100;

        let
            slots = '';

        if ( settings.slots ) {
            slots = Object.keys( settings.slots ).map( key => (
                <SlotInfos
                    key={key}
                    dayId={ this.props.dayId }
                    slot={ settings.slots[key] }
                    slotHeight={ slotHeight }
                    slotKey={ key }
                    schedule={ this.props.schedule } />
            ));
        }

        return (
            <div className="day-infos-box">
                { slots }
            </div>
        );
    }
}

export default DayInfos;
