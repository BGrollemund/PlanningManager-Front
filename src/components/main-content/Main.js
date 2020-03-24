import React from "react";
import TitleContent from "./title-content/TitleContent";
import ScheduleContent from "./schedule-content/ScheduleContent";

class Main extends React.Component {
    render() {

        const test = JSON.stringify( this.props.schedule );

        return (
            <main>
                <div>{ test }</div>
                <TitleContent
                    scheduleTitle={ this.props.schedule.settings.infos.name } />
                <ScheduleContent
                    schedule={ this.props.schedule } />
            </main>
        );
    }
}

export default Main;
