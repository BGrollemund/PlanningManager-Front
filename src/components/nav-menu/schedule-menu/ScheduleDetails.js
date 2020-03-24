import React from "react";

import dateManager from "../../../utils/DateManager";

class ScheduleDetails extends React.Component {

    state = {
        infos: this.props.infos
    };

    handleChange = ( event ) => {
        const
            name = event.target.name,
            val = event.target.value;

        let newScheduleInfos = this.state.infos;
        newScheduleInfos['edit'+name]( val );

        this.setState( { infos: newScheduleInfos } );
        this.props.update();
    };

    handleDaysChange = ( dayKey, event ) => {
        let newScheduleInfos = this.state.infos;
        newScheduleInfos.days[dayKey] = event.target.checked;

        this.setState( { infos: newScheduleInfos } );
        this.props.update();
    };

    render() {
        const daysList = dateManager.getDaysList();

        let daysInput = [];

        daysInput = Object.keys( daysList ).map( key => (
            <div key={ daysList[key] } className="input-days-list">
                <input
                    defaultChecked = { this.state.infos.days[ daysList[key] ] }
                    onChange = { this.handleDaysChange.bind( this, daysList[key] ) }
                    type="checkbox" />
                <span>{ daysList[key] }</span>
            </div>
        ));

        return (
            <div className="content-menu">
                <div>
                    <input
                        id="schedule_name"
                        onChange = { this.handleChange }
                        name="Name"
                        value={ this.state.infos.name }
                        type="text" />
                </div>
                <div>
                    <span> Du : </span>
                    <input
                        id="schedule_start_date"
                        onChange = { this.handleChange }
                        name="StartDate"
                        value={ dateManager.formatForInput( this.state.infos.start_date ) }
                        type="date" />
                    <span> au : </span>
                    <input
                        id="schedule_end_date"
                        onChange = { this.handleChange }
                        name="EndDate"
                        value={ dateManager.formatForInput( this.state.infos.end_date ) }
                        type="date" />
                </div>
                <div id="days">{ daysInput }</div>
            </div>
        );
    }
}

export default ScheduleDetails;
