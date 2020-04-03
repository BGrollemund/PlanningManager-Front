import React from "react";

class SlotsList extends React.Component {

    state = {
        slots: this.props.slots
    };

    /**
     * Change handler
     *
     * @param key
     * @param event
     */
    handleChange = ( key, event ) => {
        const
            name = event.target.name,
            val = event.target.value;

        let newSlots = this.state.slots;
        newSlots[key]['edit'+name]( val );

        this.setState( { slots: newSlots } );
        this.props.update();
    };

    /**
     * Remove a specified slot in schedule.settings.slots
     *
     * @param key
     */
    removeSlot = ( key ) => {
        this.props.changeScheduleSettings( {
            functionName: 'removeSlot',
            reactComponentName: 'slots',
            data: key
        });
    };

    render() {
        let slots = [];

        if( this.state.slots ) {
            slots = Object.keys( this.state.slots ).map( key => (
                <div key={key} className="content-menu-list">
                    <input
                        id={ "slot-start-time-"+key }
                        onChange = { this.handleChange.bind( this, key ) }
                        name="StartTime"
                        value={ this.state.slots[key].start_time }
                        type="time" />

                    <input
                        id={ "slot-end-time-"+key }
                        onChange = { this.handleChange.bind( this, key ) }
                        name="EndTime"
                        value={ this.state.slots[key].end_time }
                        type="time" />

                    <input
                        className="red"
                        onClick={ this.removeSlot.bind( this, key ) }
                        value="Supprimer"
                        type="button" />
                </div>
            ));
        }

        return (
            <div>{ slots }</div>
        );
    }
}

export default SlotsList;
