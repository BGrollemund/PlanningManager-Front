import dateUtils from "./DateUtils";
import timeUtils from "./TimeUtils";

class StatsUtils {

    /**
     * Calculate schedule statistics
     *
     * @param schedule
     */
    calculate = ( schedule ) => {
        const
            days = dateUtils.findDaysCompleteWeek(
                schedule.settings.infos.startDate,
                schedule.settings.infos.endDate
            ),
            datesStg = dateUtils.formatDateIntervalString(
                new Date( days[ 0 ] ),
                new Date( days[ days.length - 1 ] )
            );

        return {
            infos: {
                datesStrings: datesStg,
                days: schedule.settings.infos.days,
                sessionsPerSlot: schedule.settings.preferences.sessionsPerSlot
            },
            sessions: this.calculateSessionsStats( schedule ),
            speakers: this.calculateSpeakersStats( schedule )
        };
    };

    /**
     * Calculate sessions statistics
     *
     * @param schedule
     * @return {{total: {}, details: {}}}
     */
    calculateSessionsStats = ( schedule ) => {
        const
            data = schedule.data,
            settings = schedule.settings,
            days = dateUtils.findDaysCompleteWeek( settings.infos.startDate, settings.infos.endDate ),
            selectedDaysArr = Object.values(schedule.settings.infos.days),
            sessionsPerSlot = settings.preferences.sessionsPerSlot,
            slots = timeUtils.sortSlots( settings.slots );

        let
            details = {},
            total = {};

        for ( let i=0; i<sessionsPerSlot; i++ ) total[i] = 0;

        Object.values( settings.sessions ).forEach( elSe => {
            details[ elSe.name ] = {
                isAdded: {},
                speakers: {},
                speakersTotal: {},
                total: {}
            };

            for ( let i=0; i<sessionsPerSlot; i++ ) details[ elSe.name ].total[i] = 0;

            Object.values( settings.speakers ).forEach( elSp => {
                details[ elSe.name ].isAdded[ elSp.name ] = false;
                details[ elSe.name ].speakers[ elSp.name ] = {};
                details[ elSe.name ].speakersTotal[ elSp.name ] = 0;
                for ( let i=0; i<sessionsPerSlot; i++ ) details[ elSe.name ].speakers[ elSp.name ][i] = 0;
            });
        });

        days.forEach( day => {
            const dayDate = new Date( day );

            if ( selectedDaysArr[ dateUtils.newGetDay( dayDate ) - 1 ] ) {
                slots.forEach( slot => {
                    if ( ! data[day].isEmpty( slot[0] ) ) {
                        for ( let i=0; i<sessionsPerSlot; i++ ) {
                            const duration = settings.slots[slot[0]].getDuration();

                            // case: same as group 1 (default value in form edit data dataPopup)
                            if (    i !== 0
                                    && settings.sessions[data[day][slot[0]][0].sessionKey]
                                    && data[day][slot[0]][i].sessionKey === '-1' ) {
                                        details[settings.sessions[schedule.data[day][slot[0]][0].sessionKey].name].total[i] += duration;
                                        total[i] += duration;

                                        data[day][slot[0]][0].speakerKeys.forEach( el => {
                                            if( settings.speakers[el] ) {
                                                details[settings.sessions[schedule.data[day][slot[0]][0].sessionKey].name]
                                                    .speakers[settings.speakers[el].name][i] += duration;
                                            }
                                });
                            }
                            else if ( settings.sessions[data[day][slot[0]][i].sessionKey] ) {
                                Object.keys(
                                    details[settings.sessions[data[day][slot[0]][i].sessionKey].name].isAdded
                                ).forEach( key => {
                                    details[settings.sessions[data[day][slot[0]][i].sessionKey].name].isAdded[key] = false;
                                });

                                details[settings.sessions[data[day][slot[0]][i].sessionKey].name].total[i] += duration;
                                total[i] += duration;

                                data[day][slot[0]][i].speakerKeys.forEach( el => {
                                    if( settings.speakers[el] ) {
                                        details[settings.sessions[schedule.data[day][slot[0]][i].sessionKey].name]
                                            .speakers[settings.speakers[el].name][i] += duration;

                                        // Avoid to add several times if a speaker is with several groups in the same time
                                        if ( ! details[settings.sessions[data[day][slot[0]][i].sessionKey].name]
                                                    .isAdded[settings.speakers[el].name] ) {
                                                        details[settings.sessions[schedule.data[day][slot[0]][i].sessionKey].name]
                                                            .speakersTotal[settings.speakers[el].name] += duration;
                                                        details[settings.sessions[data[day][slot[0]][i].sessionKey].name]
                                                            .isAdded[settings.speakers[el].name] = true;
                                        }
                                    }
                                });
                            }
                        }
                    }
                });
            }
        });

        return {
            details: details,
            total: total
        };
    };

    /**
     * Calculate speakers statistics
     *
     * @param schedule
     * @return {{detailsTotal: {}, total: {}, details: {}}}
     */
    calculateSpeakersStats = ( schedule ) => {
        const
            data = schedule.data,
            settings = schedule.settings,
            days = dateUtils.findDaysCompleteWeek(
                settings.infos.startDate,
                settings.infos.endDate
            ),
            selectedDaysArr = Object.values(schedule.settings.infos.days),
            sessionsPerSlot = settings.preferences.sessionsPerSlot,
            slots = timeUtils.sortSlots( settings.slots );

        let
            details = {},
            detailsTotal = {},
            isAdded = {},
            total = {};

        for ( let i=0; i<sessionsPerSlot; i++ ) total[i] = 0;

        Object.values( settings.speakers ).forEach( elSp => {
            detailsTotal[ elSp.name ] = 0;
            isAdded[ elSp.name ] = false;

            details[ elSp.name ] = {
                detailsTotal: {},
                sessions: {},
                total: {}
            };

            for ( let i=0; i<sessionsPerSlot; i++ ) details[ elSp.name ].total[i] = 0;

            Object.values( settings.sessions ).forEach( elSe => {
                details[ elSp.name ].sessions[ elSe.name ] = {};
                details[ elSp.name ].detailsTotal[ elSe.name ] = 0;
                for ( let i=0; i<sessionsPerSlot; i++ ) details[ elSp.name ].sessions[ elSe.name ][i] = 0;
            });
        });

        days.forEach( day => {
            const dayDate = new Date( day );

            if ( selectedDaysArr[ dateUtils.newGetDay( dayDate ) - 1 ] ) {
                slots.forEach( slot => {
                    if ( ! data[day].isEmpty( slot[0] ) ) {
                        Object.keys( isAdded ).forEach( key => isAdded[key] = false);

                        for ( let i=0; i<sessionsPerSlot; i++ ) {
                            const duration = settings.slots[slot[0]].getDuration();

                            // case: same as group 1 (default value in form edit data dataPopup)
                            if ( i !== 0 && data[day][slot[0]][i].sessionKey === '-1' ) {
                                data[day][slot[0]][0].speakerKeys.forEach( el => {
                                    if( settings.speakers[el] ) {
                                        details[settings.speakers[el].name].total[i] += duration;
                                        total[i] += duration;

                                        if ( settings.sessions[data[day][slot[0]][0].sessionKey] )
                                            details[settings.speakers[el].name]
                                                .sessions[settings.sessions[data[day][slot[0]][0].sessionKey].name][i] += duration;
                                    }
                                });
                            }
                            else {
                                data[day][slot[0]][i].speakerKeys.forEach( el => {
                                    if( settings.speakers[el] ) {
                                        details[settings.speakers[el].name].total[i] += duration;
                                        total[i] += duration;

                                        if ( settings.sessions[data[day][slot[0]][i].sessionKey] )
                                            details[settings.speakers[el].name]
                                                .sessions[settings.sessions[data[day][slot[0]][i].sessionKey].name][i] += duration;

                                        // Avoid to add several times if a speaker is with several groups in the same time
                                        if ( ! isAdded[settings.speakers[el].name] ) {
                                            detailsTotal[settings.speakers[el].name] += duration;
                                            isAdded[settings.speakers[el].name] = true;

                                            if( settings.sessions[data[day][slot[0]][i].sessionKey] )
                                                details[settings.speakers[el].name]
                                                    .detailsTotal[settings.sessions[data[day][slot[0]][i].sessionKey].name] += duration;
                                        }
                                    }
                                });
                            }
                        }
                    }
                });
            }
        });

        return {
            details: details,
            detailsTotal: detailsTotal,
            total: total
        };
    };
}

const statsUtils = new StatsUtils();
export default statsUtils;
