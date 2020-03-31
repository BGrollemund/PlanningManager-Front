import React from "react";

import SlotsAdd from "./SlotsAdd";
import SlotsList from "./SlotsList";

class SlotsMenu extends React.Component {

    render() {
        return (
            <div>
                <SlotsAdd
                    changeScheduleSettings={ this.props.changeScheduleSettings } />
                <SlotsList
                    changeScheduleSettings={ this.props.changeScheduleSettings }
                    slots={ this.props.slots }
                    update={ this.props.update } />
            </div>
        );
    }
}

export default SlotsMenu;
