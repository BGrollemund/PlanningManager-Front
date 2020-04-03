class TimeUtils {

    /**
     * Convert string time in number of minutes
     *
     * @param time
     * @return {*}
     */
    convertNumeric = ( time ) => {
        const timeArr = time.split( ':' );

        return parseInt( timeArr[0] ) * 60 + parseInt( timeArr[1] );
    };

    /**
     * Find all infos needed to fill day cells
     *
     * @param slots
     */
    findSlotsInfos = ( slots ) => {
        const sortedSlots = this.sortSlots( slots );

        let
            numericSlots = [],
            totalDuration = 0,
            totalSlots = [];

        // Convert slot times in numerical value (minutes)
        sortedSlots.forEach( el => {
            numericSlots.push( {
                start_time: this.convertNumeric( el[1].start_time ),
                end_time: this.convertNumeric( el[1].end_time )
            });
        });

        let lastIndex = 0;

        // Group slots when necessary
        for( let i=0; i<numericSlots.length; i++ ) {
            if ( totalSlots.length <= 0 ) {
                totalSlots.push( {
                    start_time: parseInt( numericSlots[i].start_time ),
                    end_time: parseInt( numericSlots[i].end_time )
                });
            }
            else {
                if ( totalSlots[ lastIndex ].end_time >= numericSlots[i].start_time ) {
                    if ( totalSlots[ lastIndex ].end_time <= numericSlots[i].end_time )
                        totalSlots[ lastIndex ].end_time = parseInt( numericSlots[i].end_time );
                }
                else {
                    totalSlots.push( {
                        start_time: parseInt( numericSlots[i].start_time ),
                        end_time: parseInt( numericSlots[i].end_time )
                    });
                    lastIndex ++;
                }
            }
        }

        // Calculate duration (excluding time not in slots)
        totalSlots.forEach( el => {
            totalDuration += ( el.end_time - el.start_time );
        });

        // Calculate place and size of each slot in a day
        if ( totalDuration > 0 ) {
            for ( let i=0; i<sortedSlots.length; i++ ) {
                sortedSlots[i].heightPerCent = ( ( numericSlots[i].end_time - numericSlots[i].start_time ) / totalDuration ) * 100;

                let previousSlotsPerCent = 0;

                for ( let j=0; j<totalSlots.length; j++ ) {
                    if( ! ( numericSlots[i].start_time >= totalSlots[j].start_time && numericSlots[i].start_time < totalSlots[j].end_time ) ) {
                        previousSlotsPerCent += ( ( totalSlots[j].end_time - totalSlots[j].start_time ) / totalDuration ) * 100;
                    }
                    else {
                        sortedSlots[i].topPerCent = previousSlotsPerCent +
                            ( ( numericSlots[i].start_time - totalSlots[j].start_time ) / totalDuration ) * 100;
                    }
                }
            }
        }

        return sortedSlots;
    };

    /**
     * Find slots in collision with a specified slot
     *
     * @param slot
     * @param slots
     */
    findSlotsRelated = ( slot, slots ) => {

        let result = [];

        Object.entries( slots ).forEach( el => {
            const
                isAfter =   el[1].start_time === slot.end_time ||
                            ( el[1].start_time ).localeCompare( slot.end_time ) > 0,
                isBefore =  el[1].end_time === slot.start_time ||
                            ( el[1].end_time ).localeCompare( slot.start_time ) < 0,
                isSame =    el[1].start_time === slot.start_time &&
                            el[1].end_time === slot.end_time;

            if ( ! ( isBefore || isAfter || isSame ) ) result.push( el );
        });

        return result;
    };

    /**
     * Format time in a user-friendly format
     *
     * @param time
     */
    formatForUser = ( time ) => {
        time = time.replace( ':', 'h' );
        if ( time.substring( 3 ) === '00' ) time = time.substring( 0, 3 );
        if ( time[0] === '0' ) time = time.substring( 1 );

        return time;
    };

    /**
     * Sort and sanitize slots
     *
     * @param slots
     */
    sortSlots = ( slots ) => {

        let result = [];

        // Sanitize
        Object.entries( slots ).forEach( el => {
            let isIn = false;

            if (    el[1].start_time !== el[1].end_time &&
                    ( el[1].start_time ).localeCompare( el[1].end_time ) < 0 ) {

                // Check if the slot does not exist already
                result.forEach( resultEl => {
                    if (    resultEl[1].start_time === el[1].start_time &&
                            resultEl[1].end_time === el[1].end_time )
                        isIn = true;
                });

                if ( ! isIn ) result.push( el );
            }
        });

        // Sort
        result.sort( ( a, b ) => {
            return ( a[1].start_time ?? '' ).localeCompare( b[1].start_time ?? '' )
        });

        return result;
    };
}

const timeUtils = new TimeUtils();
export default timeUtils;
