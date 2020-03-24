import React from "react";

import dateManager from "../../../utils/DateManager";
import DayContent from "./DayContent";

class WeekContent extends React.Component {

    render() {
        const
            daysList = dateManager.getDaysList(),
            daysListSelected = daysList.filter(
                ( day )  => this.props.schedule.settings.infos.days[day]
            );

        let days = [];

        days = Object.keys( daysListSelected ).map( key => (
            <DayContent
                key={key}
                daysListSelected = { daysListSelected }
                numCol = { this.props.numCol }
                numLine = { parseInt( key ) + 1 }
                schedule = { this.props.schedule }
                weekInfos = { this.props.weekInfos } />
        ));

        return (
            <div className="content-week">
                <DayContent
                    daysListSelected = { daysListSelected }
                    numCol = { this.props.numCol }
                    numLine = { 0 }
                    schedule= { this.props.schedule }
                    weekInfos = { this.props.weekInfos } />
                { days }
            </div>
        );
    }
}

export default WeekContent;
