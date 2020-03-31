import React from "react";

import DayDetails from "../../../entities/data/DayDetails";
import SessionDetails from "../../../entities/data/SessionDetails";
import SlotDetails from "../../../entities/data/SlotDetails";

class DayInfos extends React.Component {

    componentDidMount() {
        this.updateSchedule();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.updateSchedule();
    }

    updateSchedule = () => {
        let
            data = this.props.schedule.data,
            settings = this.props.schedule.settings;

        if (! data[this.props.dayId] )
            data.addDayDetails( this.props.dayId, new DayDetails() );

        if ( settings.slots ) {
            Object.keys( settings.slots ).forEach( key => {
                if ( ! data[this.props.dayId][key] )
                    data[this.props.dayId].addDaySlot( key, new SlotDetails() );

                for ( let i=0; i<settings.preferences.sessionsPerSlot; i++ ) {
                    if ( ! data[this.props.dayId][key][i] )
                        data[this.props.dayId][key].addSessionDetails( i, new SessionDetails() );
                }
            });
        }
    };

    render() {

        return (
            <div style={{ minHeight: "100%", minWidth: "100%" }} >

            </div>
        );
    }
}

export default DayInfos;
