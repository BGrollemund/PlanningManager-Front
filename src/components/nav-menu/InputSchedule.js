import React from "react";

class InputSchedule extends React.Component {
    render() {
        return (
            <div className="content-menu">
                <div>
                    <input type="text" id="schedule_name" placeholder="Nom" />
                </div>
                <div>
                    Du :
                    <input type="date" id="schedule_start_date" />
                        au :
                    <input type="date" id="schedule_end_date" />
                </div>
                <div id="days">
                    <div>
                        <input type="checkbox" id="schedule_mo" />Lundi
                        <input type="checkbox" id="schedule_tu" />Mardi
                        <input type="checkbox" id="schedule_we" />Mercredi
                        <input type="checkbox" id="schedule_th" />Jeudi
                        <input type="checkbox" id="schedule_fr" />Vendredi
                        <input type="checkbox" id="schedule_sa" />Samedi
                        <input type="checkbox" id="schedule_su" />Dimanche
                    </div>
                </div>
                <div className="schedule_btns" id="info_schedule_create">
                    <input type="button" id="schedule_create" className="schedule_btn" value="Créer" />
                    <input type="button" id="schedule_back" className="schedule_btn" value="Retour" />
                </div>
                <div className="schedule_btns" id="info_schedule_edit">
                    <input type="button" id="schedule_edit" className="schedule_btn" value="Modifier" />
                    <input type="button" id="schedule_new" className="schedule_btn" value="Nouveau" />
                </div>
            </div>
        );
    }
}

export default InputSchedule;
