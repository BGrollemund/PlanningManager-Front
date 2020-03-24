import React from "react";

import ScheduleDetails from "./ScheduleDetails";

class ScheduleMenu extends React.Component {

    update = () => {
        this.props.update();
    };

    render() {
        return (
            <div>
                <ScheduleDetails
                    infos={ this.props.infos }
                    update={ this.update } />
            </div>
        );
    }
}

export default ScheduleMenu;
