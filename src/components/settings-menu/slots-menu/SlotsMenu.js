import React from "react";

import SlotsAdd from "./SlotsAdd";
import SlotsList from "./SlotsList";

class SlotsMenu extends React.Component {

    render() {
        return (
            <div>
                <SlotsAdd
                    schedule={ this.props.schedule }
                    update={ this.props.update } />
                <SlotsList
                    schedule={ this.props.schedule }
                    update={ this.props.update } />
            </div>
        );
    }
}

export default SlotsMenu;
