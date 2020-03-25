import React from "react";

class DayContent extends React.Component {
    render() {
        console.log( this.props.weekInfos );


        let
            dayContent = '',
            dayId = '';

        if ( this.props.numLine === 0 ) {
            dayContent = this.props.weekInfos.weekString;
            dayId = "week-" + this.props.numCol;
        }
        else if ( this.props.numCol === 0 ) {
            dayContent = this.props.daysListSelected[ this.props.numLine - 1 ];
            dayId = "days-" + this.props.numLine;
        }
        else {
            dayContent = this.props.weekInfos.daysInfos[ this.props.daysListSelected[ this.props.numLine - 1 ] ].dayString;
            dayId = this.props.weekInfos.daysInfos[ this.props.daysListSelected[ this.props.numLine - 1 ] ].dayId;
        }

        return (
            <div className="content-day" id={ dayId }>
                { dayContent }
            </div>
        );
    }
}

export default DayContent;
