import React from "react";

class PreferencesDetails extends React.Component {

    state = {
        preferences: this.props.schedule.settings.preferences
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

        newSchedulePreferences[name] = val;
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

        newSchedulePreferences[name] = val;
        this.setState( { preferences: newSchedulePreferences } );

        this.props.update();
    };

    /**
     * Sessions per slot change handler
     *
     * @param event
     */
    handleSessionsPerSlotChange = ( event ) => {
        let newSchedulePreferences = this.state.preferences;

        newSchedulePreferences.sessionsPerSlot = event.target.value;
        this.setState( { preferences: newSchedulePreferences } );

        if ( this.props.schedule.maxSessionsPerSlot < this.props.schedule.settings.preferences.sessionsPerSlot )
            this.props.schedule.updateDataBySessionsPerSlot();
        this.props.update();
    };

    render() {

        return (
            <div className="content-menu">
                <div>
                    <span> Taille des cellules : </span>
                    <span> largeur </span>
                    <input
                        onChange = { this.handleChange }
                        name="dayCellWidth"
                        value={ this.state.preferences.dayCellWidth }
                        type="number" />
                    <span> x hauteur </span>
                    <input
                        onChange = { this.handleChange }
                        name="dayCellHeight"
                        value={ this.state.preferences.dayCellHeight }
                        type="number" />
                </div>
                <div>
                    <span> Nombre de groupes : </span>
                    <input
                        onChange = { this.handleSessionsPerSlotChange }
                        name="sessionsPerSlot"
                        value={ this.state.preferences.sessionsPerSlot }
                        type="number" />
                </div>
                <div>
                    <span> Nombre maximal d'intervenants par créneau : </span>
                    <input
                        onChange = { this.handleChange }
                        name="speakersPerSlot"
                        value={ this.state.preferences.speakersPerSlot }
                        type="number" />
                </div>
                <div>
                    <input
                        defaultChecked = { this.state.preferences.mentionOption }
                        onChange = { this.handleCheckboxChange }
                        name="mentionOption"
                        type="checkbox" />
                    <span> Ajouter des mentions </span>
                </div>
                <div>
                    <input
                        defaultChecked = { this.state.preferences.showSlot }
                        onChange = { this.handleCheckboxChange }
                        name="showSlot"
                        type="checkbox" />
                    <span> Afficher les horaires dans chaque cellule </span>
                </div>
                <div>
                    <input
                        defaultChecked = { this.state.preferences.showGroup }
                        onChange = { this.handleCheckboxChange }
                        name="showGroup"
                        type="checkbox" />
                    <span> Afficher les groupes dans chaque cellule </span>
                </div>
            </div>
        );
    }
}

export default PreferencesDetails;
