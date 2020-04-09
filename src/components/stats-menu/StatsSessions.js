import React from "react";

import timeUtils from "../../utils/TimeUtils";

class StatsSessions extends React.Component {

    render() {
        const
            sessionsStats = this.props.stats.sessions;

        let
            details = [],
            speakersDetails = {},
            spanSpeakersDetails = {},
            spanTotalDetails = {},
            total = [];

        // Check if all groups totals are the same
        if( Object.entries( sessionsStats.total ).every(( value, key , array ) =>
            value[1] === array[0][1]  ) ) {
                total =
                    <span className="stats-list-span">
                        { timeUtils.convertString( sessionsStats.total[0] ) }
                    </span>;
        }
        else {
            total = Object.keys( sessionsStats.total ).map( key => (
                <span key={key} className="stats-list-span">
                    G{ parseInt(key) + 1 } : { timeUtils.convertString( sessionsStats.total[key] ) }
                </span>
            ));
        }

        Object.keys( sessionsStats.details ).forEach( keySe => {
            if( Object.entries( sessionsStats.details[keySe].total ).every(
                ( value, key , array ) => value[1] === array[0][1]  ) ) {
                    spanTotalDetails[keySe] =
                        <span className="stats-list-span">
                            { timeUtils.convertString( sessionsStats.details[keySe].total[0] ) }
                        </span>;
            }
            else {
                spanTotalDetails[keySe] = Object.keys( sessionsStats.details[keySe].total ).map( key_ => (
                    <span key={key_} className="stats-list-span">
                        G{ parseInt(key_) + 1 } : { timeUtils.convertString( sessionsStats.details[keySe].total[key_] ) }
                    </span>
                ));
            }

            Object.keys( sessionsStats.details[keySe].speakers ).forEach( key_ => {
                if( this.props.stats.infos.sessionsPerSlot <= 1 ) {
                    spanSpeakersDetails[key_] = '';
                }
                else {
                    spanSpeakersDetails[key_] = Object.keys( sessionsStats.details[keySe].speakers[key_] ).map( key__ => (
                        <span key={key__} className="stats-list-span">
                            G{ parseInt(key__) + 1 } : { timeUtils.convertString( sessionsStats.details[keySe].speakers[key_][key__] ) }
                        </span>
                    ));
                }
            });

            speakersDetails[keySe] = Object.keys( sessionsStats.details[keySe].speakers ).map( keySp => {
                let result = '';

                if ( sessionsStats.details[keySe].speakersTotal[keySp] !== 0 )
                    result =
                        <div key={keySp} className="stats-details-div">
                            <div className="bold">{ keySp } : </div>
                            <span className="stats-list-span">
                                { timeUtils.convertString( sessionsStats.details[keySe].speakersTotal[keySp] ) }
                            </span>
                            { spanSpeakersDetails[keySp] }
                        </div>;

                return result;
            });
        });

        details = Object.keys( sessionsStats.details ).map( key => {
            let result = '';

            if ( ! Object.values( sessionsStats.details[key].total ).every( val => val === 0 ) ) {
                let speakersHours = [];

                Object.values( sessionsStats.details[key].speakers).forEach( el => {
                    Object.values( el ).forEach( hour => speakersHours.push( hour ) );
                });

                const disabledToggleInput = speakersHours.every( val => val === 0 );

                result =
                    <div key={key} className="stats-list-box">
                        <div className="bold tall">
                            { key } :
                        </div>
                        { spanTotalDetails[key] }
                        <input
                            className="toggle-stats-details"
                            disabled={ disabledToggleInput }
                            value= "Détails"
                            type= "button" />
                        <div className="hidden">{ speakersDetails[key] }</div>
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

export default StatsSessions;
