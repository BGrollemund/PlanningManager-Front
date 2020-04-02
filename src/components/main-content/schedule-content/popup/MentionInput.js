import React from "react";

class MentionInput extends React.Component {


    state = {
        data: this.props.schedule.data
    };

    /**
     * Mention change handler
     *
     * @param event
     */
    handleMentionChange = ( event ) => {
        let newData = this.props.schedule.data;
        newData
            [this.props.dayId]
            [this.props.slotIndex]
            [this.props.sessionIndex].mention = event.target.value;

        this.setState( { data: newData } );
    };

    render() {

        let mention = '';

        if ( this.props.schedule.settings.preferences.mentionOption )
            mention = <input
                            disabled={ this.props.disabled }
                            onChange={ this.handleMentionChange }
                            placeholder="mention"
                            value={ this.state.data
                                        [this.props.dayId]
                                        [this.props.slotIndex]
                                        [this.props.sessionIndex].mention }
                            type="text" />;

        return (
            <span>
                { mention }
            </span>
        );
    }
}

export default MentionInput;
