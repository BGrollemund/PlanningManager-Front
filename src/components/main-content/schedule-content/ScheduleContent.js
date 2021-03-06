import React from "react";

import WeekContent from "./WeekContent";

import dateUtils from "../../../utils/DateUtils";

class ScheduleContent extends React.Component {

    state = {
        numPage: 1,
        dayCellWidth: this.props.schedule.settings.preferences.dayCellWidth
    };

    /**
     * Show next schedule page
     */
    pageNext = () => {
        this.setState( { numPage: this.state.numPage  + 1 } );
    };

    /**
     * Show previous schedule page
     */
    pagePrevious = () => {
        this.setState( { numPage: this.state.numPage - 1 } )
    };

    render() {
        let numWeeks = Math.floor(
            ( window.innerWidth - 106 ) /
            ( parseInt( this.props.schedule.settings.preferences.dayCellWidth ) + 7 )
        );

        const
            weeksList = dateUtils.findWeeks(
                this.props.schedule.settings.infos.startDate,
                this.props.schedule.settings.infos.endDate
            ),
            weeksToShow = weeksList.slice(
                ( this.state.numPage - 1 ) * numWeeks,
                this.state.numPage * numWeeks
            );

        let weeks = [];

        if( weeksToShow ) {
            weeks = Object.keys( weeksToShow ).map( key => (
                <WeekContent
                    key={key}
                    numCol= { parseInt( key ) + 1 }
                    schedule= { this.props.schedule }
                    update= { this.props.update }
                    weekInfos= { weeksToShow[key] } />
            ));
        }

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
                        numCol= { 0 }
                        schedule= { this.props.schedule }
                        weekInfos= { { "weekString" : "Jours" } } />
                    { weeks }
                </div>
            </div>
        );
    }
}

export default ScheduleContent;
