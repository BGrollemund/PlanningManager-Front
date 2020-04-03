import React from "react";

import Slot from "../../../entities/settings/Slot";

import formFieldsUtils from "../../../utils/FormFieldsUtils";

class SlotsAdd extends React.Component {

    state = {
        start_time: '',
        end_time: ''
    };

    constructor( props ) {
        super( props );
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

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
        if( formFieldsUtils.checkAddSlotFields( this.state.start_time, this.state.end_time  ) ) {
            const slot = new Slot( this.state.start_time, this.state.end_time );

            this.props.changeScheduleSettings( {
                functionName: 'addSlot',
                reactComponentName: 'slots',
                data: slot
            });

            this._isMounted && this.setState( {
                start_time: '',
                end_time: ''
            });
        }
    };

    render() {
        return (
            <div className="content-menu">
                <input
                    id="slot-start-time"
                    onChange = { this.handleChange }
                    name="start_time"
                    value={ this.state.start_time }
                    type="time" />

                <input
                    id="slot-end-time"
                    onChange = { this.handleChange }
                    name="end_time"
                    value={ this.state.end_time }
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
