import React from "react";
import dateUtils from "../../utils/DateUtils";

class StatsHeader extends React.Component {

    render() {
        const daysList = dateUtils.getDaysList();

        let days = [];

        days = Object.keys( daysList ).map( key => (
            <div key={ daysList[key] } className="input-days-list">
                <input
                    checked={ this.props.stats.infos.days[ daysList[key] ] }
                    disabled
                    type="checkbox" />
                <span>{ daysList[key] }</span>
            </div>
        ));

        return (
            <div>
                <div>{ this.props.stats.infos.datesStrings }</div>
                { days }
                <div>
                    Nombre de groupes : { this.props.stats.infos.sessionsPerSlot }
                </div>
            </div>
        );
    }
}

export default StatsHeader;
