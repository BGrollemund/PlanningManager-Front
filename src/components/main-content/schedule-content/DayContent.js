import React from "react";

import DayInfos from "./DayInfos";
import Popup from "./popup/Popup";

class DayContent extends React.Component {

    state = {
        dayCellHeight: this.props.schedule.settings.preferences.dayCellHeight,
        dayCellWidth: this.props.schedule.settings.preferences.dayCellWidth,
        showPopup: false
    };

    /**
     * Close data editor popup
     */
    closePopup = () => {
        this.setState( { showPopup: false } );
    };

    /**
     * Open data editor popup
     */
    openPopup = () => {
        this.setState({ showPopup: true } );
    };

    render() {

        let
            cursor = '',
            dayContent = '',
            dayId = '',
            dayString = '',
            popup = '',
            style = {
                height: this.props.schedule.settings.preferences.dayCellHeight + 'px',
                width: this.props.schedule.settings.preferences.dayCellWidth + 'px'
            };

        if ( this.props.numLine === 0 ) {
            dayContent = this.props.weekInfos.weekString;
            dayId = "week-" + this.props.numCol;
        }
        else if ( this.props.numCol === 0 ) {
            dayContent = this.props.daysListSelected[ this.props.numLine - 1 ];
            dayId = "days-" + this.props.numLine;
        }
        else {
            cursor = "day-hover";
            dayId = this.props.weekInfos.daysInfos[ this.props.daysListSelected[ this.props.numLine - 1 ] ].dayId;
            dayContent = <DayInfos
                            dayId={ dayId }
                            schedule={ this.props.schedule } />;
            dayString = this.props.weekInfos.daysInfos[ this.props.daysListSelected[ this.props.numLine - 1 ] ].dayString;

            if ( this.state.showPopup )
                popup = <Popup
                            dayId={ dayId }
                            dayString={ dayString }
                            changeScheduleData={ this.props.changeScheduleData }
                            closePopup={ this.closePopup }
                            schedule={ this.props.schedule } />;
        }

        return (
            <div>
                <div
                    id={ dayId }
                    className={ "content-day "+ cursor }
                    onClick={ this.openPopup }
                    style={ style } >
                    { dayContent }
                </div>
                { popup }
            </div>
        );
    }
}

export default DayContent;
