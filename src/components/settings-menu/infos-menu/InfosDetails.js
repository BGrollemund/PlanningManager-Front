import React from "react";

import dateUtils from "../../../utils/DateUtils";

class InfosDetails extends React.Component {

    state = {
        infos: this.props.schedule.settings.infos
    };

    /**
     * Change handler
     *
     * @param event
     */
    handleChange = ( event ) => {
        const
            name = event.target.name,
            val = event.target.value;

        let newScheduleInfos = this.state.infos;

        newScheduleInfos[name] = val;
        this.setState( { infos: newScheduleInfos } );

        this.props.update();
    };

    /**
     * Dates change handler
     *
     * @param event
     */
    handleDateChange = ( event ) => {
        const
            name = event.target.name,
            val = event.target.value;

        let newScheduleInfos = this.state.infos;

        newScheduleInfos[name] = new Date( val );
        this.setState( { infos: newScheduleInfos } );

        this.props.schedule.initData();
        this.props.update();
    };

    /**
     * Days change handler
     *
     * @param dayKey
     * @param event
     */
    handleDaysChange = ( dayKey, event ) => {
        let newScheduleInfos = this.state.infos;

        newScheduleInfos.days[dayKey] = event.target.checked;
        this.setState( { infos: newScheduleInfos } );

        this.props.update();
    };

    render() {
        const daysList = dateUtils.getDaysList();

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
                        onChange = { this.handleChange }
                        name="name"
                        value={ this.state.infos.name }
                        type="text" />
                </div>
                <div>
                    <span> Du : </span>
                    <input
                        onChange = { this.handleDateChange }
                        name="startDate"
                        value={ dateUtils.formatForInput( this.state.infos.startDate ) }
                        type="date" />
                    <span> au : </span>
                    <input
                        onChange = { this.handleDateChange }
                        name="endDate"
                        value={ dateUtils.formatForInput( this.state.infos.endDate ) }
                        type="date" />
                </div>
                <div id="days">{ daysInput }</div>
            </div>
        );
    }
}

export default InfosDetails;
