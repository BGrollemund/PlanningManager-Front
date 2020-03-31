import React from "react";

class PreferencesDetails extends React.Component {

    state = {
        preferences: this.props.preferences
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

        let newSchedulePreferences = this.state.preferences;
        newSchedulePreferences['edit'+name]( val );

        this.setState( { preferences: newSchedulePreferences } );
        this.props.update();
    };

    /**
     * Checkbox change handler
     *
     * @param event
     */
    handleCheckboxChange = ( event ) => {
        const
            name = event.target.name,
            val = event.target.checked;

        let newSchedulePreferences = this.state.preferences;
        newSchedulePreferences['edit'+name]( val );

        this.setState( { preferences: newSchedulePreferences } );
        this.props.update();
    };

    render() {

        return (
            <div className="content-menu">
                <div>
                    <span> Taille des cellules : </span>
                    <span> largeur </span>
                    <input
                        id="schedule_day_cell_width"
                        onChange = { this.handleChange }
                        name="DayCellWidth"
                        value={ this.state.preferences.dayCellWidth }
                        type="number" />
                    <span> x hauteur </span>
                    <input
                        id="schedule_day_cell_height"
                        onChange = { this.handleChange }
                        name="DayCellHeight"
                        value={ this.state.preferences.dayCellHeight }
                        type="number" />
                </div>
                <div>
                    <span> Nombre de groupes : </span>
                    <input
                        id="schedule_sessions_per_slot"
                        onChange = { this.handleChange }
                        name="SessionsPerSlot"
                        value={ this.state.preferences.sessionsPerSlot }
                        type="number" />
                </div>
                <div>
                    <span> Nombre maximal d'intervenants par créneau : </span>
                    <input
                        id="schedule_speakers_per_slot"
                        onChange = { this.handleChange }
                        name="SpeakersPerSlot"
                        value={ this.state.preferences.speakersPerSlot }
                        type="number" />
                </div>
                <div>
                    <input
                        defaultChecked = { this.state.preferences.mentionOption }
                        onChange = { this.handleCheckboxChange }
                        name="MentionOption"
                        type="checkbox" />
                    <span> Ajouter des mentions </span>
                </div>
                <div>
                    <input
                        defaultChecked = { this.state.preferences.showSlot }
                        onChange = { this.handleCheckboxChange }
                        name="ShowSlot"
                        type="checkbox" />
                    <span> Afficher les horaires dans chaque cellule </span>
                </div>
                <div>
                    <input
                        defaultChecked = { this.state.preferences.showGroup }
                        onChange = { this.handleCheckboxChange }
                        name="ShowGroup"
                        type="checkbox" />
                    <span> Afficher les groupes dans chaque cellule </span>
                </div>
            </div>
        );
    }
}

export default PreferencesDetails;
