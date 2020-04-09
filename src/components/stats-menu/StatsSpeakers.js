import React from "react";
import timeUtils from "../../utils/TimeUtils";

class StatsSpeakers extends React.Component {

    render() {
        const
            speakersStats = this.props.stats.speakers;

        let
            details = [],
            sessionsDetails = {},
            spanSessionsDetails = {},
            spanTotalDetails = {},
            total = [];


        if( this.props.stats.infos.sessionsPerSlot <= 1 ) {
            total =
                <span key={0} className="stats-list-span">
                    { timeUtils.convertString( speakersStats.total[0] ) }
                </span>;
        }
        else {
            total = Object.keys( speakersStats.total ).map( key => (
                <span key={key} className="stats-list-span">
                    G{ parseInt(key) + 1 } : { timeUtils.convertString( speakersStats.total[key] ) }
                </span>
            ));
        }

        Object.keys( speakersStats.details ).forEach( keySp => {
            if( this.props.stats.infos.sessionsPerSlot <= 1 ) {
                spanTotalDetails[keySp] = '';
            }
            else {
                spanTotalDetails[keySp] = Object.keys( speakersStats.details[keySp].total ).map( key_ => (
                    <span key={key_} className="stats-list-span">
                        G{ parseInt(key_) + 1 } : { timeUtils.convertString( speakersStats.details[keySp].total[key_] ) }
                    </span>
                ));
            }

            Object.keys( speakersStats.details[keySp].sessions ).forEach( keySe => {
                if( Object.entries( speakersStats.details[keySp].sessions[keySe] ).every(
                    ( value, key , array ) => value[1] === array[0][1]  ) ) {
                    spanSessionsDetails[keySe] =
                        <span className="stats-list-span">
                            { timeUtils.convertString( speakersStats.details[keySp].sessions[keySe][0] ) }
                        </span>;
                }
                else {
                    spanSessionsDetails[keySe] = Object.keys( speakersStats.details[keySp].sessions[keySe] ).map( key_ => (
                        <span key={key_} className="stats-list-span">
                            G{ parseInt(key_) + 1 } : { timeUtils.convertString( speakersStats.details[keySp].sessions[keySe][key_] ) }
                        </span>
                    ));
                }
            });

            sessionsDetails[keySp] = Object.keys( speakersStats.details[keySp].sessions ).map( keySe => {
                let result = '';

                if ( ! Object.values( speakersStats.details[keySp].sessions[keySe] ).every( val => val === 0 ) ) {
                    result = <div key={keySe} className="stats-details-div">
                        <div className="bold">{ keySe } : </div>
                        { spanSessionsDetails[keySe] }
                    </div>;
                }

                return result;
            });
        });

        details = Object.keys( speakersStats.details ).map( key => {
            let result = '';

            if ( ! Object.values( speakersStats.details[key].total ).every( val => val === 0 ) ) {
                let sessionsHours = [];

                Object.values( speakersStats.details[key].sessions ).forEach( el => {
                    Object.values( el ).forEach( hour => sessionsHours.push( hour ) );
                });

                const disabledToggleInput = sessionsHours.every( val => val === 0 );

                result =
                    <div key={key} className="stats-list-box">
                        <div className="bold tall">
                            { key } :
                        </div>
                        <span className="stats-list-span">
                            { timeUtils.convertString( speakersStats.detailsTotal[key] ) }
                        </span>
                        { spanTotalDetails[key] }
                        <input
                            className="toggle-stats-details"
                            disabled={ disabledToggleInput }
                            value= "Détails"
                            type= "button" />
                        <div className="hidden">{ sessionsDetails[key] }</div>
                    </div>;
            }

            return result;
        });

        return (
            <div className="content-stats-list">
                <h4>Total : { total }</h4>
                { details }
            </div>
        );
    }
}

export default StatsSpeakers;
