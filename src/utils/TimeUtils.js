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
     * Convert time in minutes in string format
     *
     * @param time
     */
    convertString = ( time ) => {
        const hours = Math.floor( time / 60 );
        let minutes = time - hours * 60;

        if ( minutes <= 0 ) minutes = '';

        return hours + 'h' + minutes;
    };

    /**
     * Return in numeric format (minutes) the difference between 2 time strings
     *
     * @param startTime
     * @param endTime
     * @return {number}
     */
    diffNumeric = ( startTime, endTime ) => {
        return this.convertNumeric( endTime ) - this.convertNumeric( startTime );
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
                startTime: this.convertNumeric( el[1].startTime ),
                endTime: this.convertNumeric( el[1].endTime )
            });
        });

        let lastIndex = 0;

        // Group slots when necessary
        for( let i=0; i<numericSlots.length; i++ ) {
            if ( totalSlots.length <= 0 ) {
                totalSlots.push( {
                    startTime: parseInt( numericSlots[i].startTime ),
                    endTime: parseInt( numericSlots[i].endTime )
                });
            }
            else {
                if ( totalSlots[ lastIndex ].endTime >= numericSlots[i].startTime ) {
                    if ( totalSlots[ lastIndex ].endTime <= numericSlots[i].endTime )
                        totalSlots[ lastIndex ].endTime = parseInt( numericSlots[i].endTime );
                }
                else {
                    totalSlots.push( {
                        startTime: parseInt( numericSlots[i].startTime ),
                        endTime: parseInt( numericSlots[i].endTime )
                    });
                    lastIndex ++;
                }
            }
        }

        // Calculate duration (excluding time not in slots)
        totalSlots.forEach( el => {
            totalDuration += ( el.endTime - el.startTime );
        });

        // Calculate place and size of each slot in a day
        if ( totalDuration > 0 ) {
            for ( let i=0; i<sortedSlots.length; i++ ) {
                sortedSlots[i].heightPerCent = ( ( numericSlots[i].endTime - numericSlots[i].startTime ) / totalDuration ) * 100;

                let previousSlotsPerCent = 0;

                for ( let j=0; j<totalSlots.length; j++ ) {
                    if( ! ( numericSlots[i].startTime >= totalSlots[j].startTime && numericSlots[i].startTime < totalSlots[j].endTime ) ) {
                        previousSlotsPerCent += ( ( totalSlots[j].endTime - totalSlots[j].startTime ) / totalDuration ) * 100;
                    }
                    else {
                        sortedSlots[i].topPerCent = previousSlotsPerCent +
                            ( ( numericSlots[i].startTime - totalSlots[j].startTime ) / totalDuration ) * 100;
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
                isAfter =   el[1].startTime === slot.endTime ||
                            ( el[1].startTime ).localeCompare( slot.endTime ) > 0,
                isBefore =  el[1].endTime === slot.startTime ||
                            ( el[1].endTime ).localeCompare( slot.startTime ) < 0,
                isSame =    el[1].startTime === slot.startTime &&
                            el[1].endTime === slot.endTime;

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

            if (    el[1].startTime !== el[1].endTime &&
                    ( el[1].startTime ).localeCompare( el[1].endTime ) < 0 ) {

                // Check if the slot does not exist already
                result.forEach( resultEl => {
                    if (    resultEl[1].startTime === el[1].startTime &&
                            resultEl[1].endTime === el[1].endTime )
                        isIn = true;
                });

                if ( ! isIn ) result.push( el );
            }
        });

        // Sort
        result.sort( ( a, b ) => {
            return ( a[1].startTime ?? '' ).localeCompare( b[1].startTime ?? '' )
        });

        return result;
    };
}

const timeUtils = new TimeUtils();
export default timeUtils;
