/**
 * Day details Object
 */
export default class DayDetails {

    addDaySlot = ( slotIndex, slotDetails ) => {
        this[slotIndex] = slotDetails;
    };

    /**
     * Check if a specified slot is empty
     *
     * @param slotIndex
     * @return {boolean}
     */
    isEmpty = ( slotIndex ) => {
        let result = true;

        Object.entries( this[slotIndex] ).forEach( el => {
            if ( el[1].sessionKey )
                if ( ! [ -1, '-1', '' ].includes( el[1].sessionKey ) ) result = false;

            if ( el[1].speakerKeys )
                el[1].speakerKeys.forEach( speaker => {
                    if ( speaker !== '' ) result = false;
                });

            if( el[1].mention )
               if ( el[1].mention.length > 0 ) result = false;
        });

        return result;
    }
}
