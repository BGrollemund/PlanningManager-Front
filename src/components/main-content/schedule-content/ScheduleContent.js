import React from "react";

import config from "../../../config/app.config";

import WeekContent from "./WeekContent";
import dateManager from "../../../utils/DateManager";

class ScheduleContent extends React.Component {

    state = {
        numPage: 1
    };

    pageNext = () => {
        this.setState( { numPage: (this.state.numPage  + 1) } );
    };

    pagePrevious = () => {
        this.setState( { numPage: this.state.numPage - 1 } )
    };

    render() {
        const
            numWeeks = config.pagination.numWeeks,
            weeksList = dateManager.findWeeks(
                this.props.schedule.settings.infos.start_date,
                this.props.schedule.settings.infos.end_date
            ),
            weeksToShow = weeksList.slice( ( this.state.numPage - 1 ) * numWeeks, this.state.numPage * numWeeks );

        let weeks = [];

        if( weeksToShow ) {
            weeks = Object.keys( weeksToShow ).map( key => (
                <WeekContent
                    key={key}
                    numCol = { parseInt( key ) + 1 }
                    schedule = { this.props.schedule }
                    weekInfos = { weeksToShow[key] } />
            ));
        }

        console.log( Math.ceil( weeksList.length / numWeeks ) );

        return (
            <div>
                <div className="paginator-schedule">
                    <div>
                        <input
                            disabled= { this.state.numPage <= 1 }
                            onClick= { this.pagePrevious }
                            value= "Précédent"
                            type= "button" />
                    </div>
                    <div>
                        <input
                            disabled= { this.state.numPage >= Math.ceil( weeksList.length / numWeeks ) }
                            onClick= { this.pageNext }
                            value= "Suivant"
                            type= "button" />
                    </div>
                </div>
                <div className="content-schedule">
                    <WeekContent
                        numCol = { 0 }
                        schedule= { this.props.schedule }
                        weekInfos= { "Jours" } />
                    { weeks }
                </div>
            </div>
        );
    }
}

export default ScheduleContent;
