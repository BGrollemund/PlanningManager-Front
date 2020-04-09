import React from "react";

import Slot from "../../../entities/settings/Slot";

import formFieldsUtils from "../../../utils/FormFieldsUtils";

class SlotsAdd extends React.Component {

    state = {
        startTime: '',
        endTime: ''
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

        this.setState( { [name]: val } );
    };

    /**
     * Add a slot in schedule.settings.slots
     */
    addSlot = () => {
        if( formFieldsUtils.checkAddSlotFields( this.state.startTime, this.state.endTime  ) ) {
            const slot = new Slot( this.state.startTime, this.state.endTime );

            this.props.schedule.addSlot( slot );

            this.setState( {
                startTime: '',
                endTime: ''
            });

            this.props.update();
        }
    };

    render() {
        return (
            <div className="content-menu">
                <input
                    id="slot-start-time"
                    onChange = { this.handleChange }
                    name="startTime"
                    value={ this.state.startTime }
                    type="time" />

                <input
                    id="slot-end-time"
                    onChange = { this.handleChange }
                    name="endTime"
                    value={ this.state.endTime }
                    type="time" />

                <input
                    className="green"
                    onClick={ this.addSlot }
                    value="Ajouter"
                    type="button" />

                <div className="error" id="slot-error"></div>
            </div>
        );
    }
}

export default SlotsAdd;
