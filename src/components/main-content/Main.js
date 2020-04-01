import React from "react";

import ScheduleContent from "./schedule-content/ScheduleContent";
import TitleContent from "./title-content/TitleContent";

class Main extends React.Component {

    render() {

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
