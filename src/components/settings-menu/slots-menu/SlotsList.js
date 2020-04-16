import React from "react";

import SlotsRemovePopup from "./SlotsRemovePopup";

class SlotsList extends React.Component {

    state = {
        showRemovePopup: false,
        slots: this.props.schedule.settings.slots,
        slotKeyToRemove: ''
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ( prevProps !== this.props )
            this.setState( { slots: this.props.schedule.settings.slots } );
    }

    /**
     * Close popup
     */
    closePopup = () => {
        this.setState( { showRemovePopup: false } );
    };

    /**
     * Open remove session popup
     */
    openRemovePopup = ( key ) => {
        this.setState( { slotKeyToRemove: key, showRemovePopup: true } );
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
        this.closePopup();
        this.props.schedule.removeSlot( key );
        this.props.update();
    };

    render() {
        let
            popup = '',
            slots = [];

        if ( this.state.showRemovePopup ) popup = <SlotsRemovePopup
                                                        removeSlot={ this.removeSlot }
                                                        closePopup={ this.closePopup }
                                                        slotName={ this.state.slots
                                                                        [this.state.slotKeyToRemove].formatForUser() }
                                                        slotKey={ this.state.slotKeyToRemove } />;

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
                        onClick={ this.openRemovePopup.bind( this, key ) }
                        value="Supprimer"
                        type="button" />
                </div>
            ));
        }

        return (
            <div>
                { slots }
                { popup }
            </div>
        );
    }
}

export default SlotsList;
