import React from "react";

class SlotsList extends React.Component {

    state = {
        slots: this.props.schedule.settings.slots
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

        newSlots[key][name] = val;
        this.setState( { slots: newSlots } );

        this.props.update();
    };

    /**
     * Remove a specified slot in schedule.settings.slots
     *
     * @param key
     */
    removeSlot = ( key ) => {
        this.props.schedule.removeSlot( key );

        this.props.update();
    };

    render() {
        let slots = [];

        if( this.state.slots ) {
            slots = Object.keys( this.state.slots ).map( key => (
                <div key={key} className="content-menu-list">
                    <input
                        onChange = { this.handleChange.bind( this, key ) }
                        name="startTime"
                        value={ this.state.slots[key].startTime }
                        type="time" />

                    <input
                        onChange = { this.handleChange.bind( this, key ) }
                        name="endTime"
                        value={ this.state.slots[key].endTime }
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
