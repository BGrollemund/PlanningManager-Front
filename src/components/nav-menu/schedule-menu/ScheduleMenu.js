import React from "react";

import ScheduleDetails from "./ScheduleDetails";

class ScheduleMenu extends React.Component {

    render() {
        return (
            <div>
                <ScheduleDetails
                    infos={ this.props.infos }
                    update={ this.props.update } />
            </div>
        );
    }
}

export default ScheduleMenu;
