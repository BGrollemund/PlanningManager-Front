import React from "react";
import TitleContent from "./title-content/TitleContent";
import ScheduleContent from "./schedule-content/ScheduleContent";
import dateManager from "../../utils/DateManager";

class Main extends React.Component {
    render() {

        const test = JSON.stringify( this.props.schedule );
        const test2 = JSON.stringify( dateManager.findWeeks(
            this.props.schedule.settings.infos.start_date,
            this.props.schedule.settings.infos.end_date,
        ));

        return (
            <main>
                <TitleContent
                    scheduleTitle={ this.props.schedule.settings.infos.name } />
                <ScheduleContent
                    schedule={ this.props.schedule } />
            </main>
        );
    }
}

export default Main;
