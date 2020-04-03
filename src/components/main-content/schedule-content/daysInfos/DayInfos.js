import React from "react";

import SlotInfos from "./SlotInfos";

import timeUtils from "../../../../utils/TimeUtils";

class DayInfos extends React.Component {

    render() {
        const
            settings = this.props.schedule.settings,
            slotsSorted = timeUtils.findSlotsInfos( settings.slots );

        let
            slots = '';

        if ( settings.slots ) {
            slots = Object.keys( slotsSorted ).map( key => (
                <SlotInfos
                    key={key}
                    dayId={ this.props.dayId }
                    slotHeight={ slotsSorted[key].heightPerCent }
                    slotKey={ slotsSorted[key][0] }
                    slotTop={ slotsSorted[key].topPerCent }
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
