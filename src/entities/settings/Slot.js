import timeUtils from "../../utils/TimeUtils";

/**
 * Slot Object
 */
export default class Slot {

    constructor( startTime = '', endTime = '' ) {
        this.startTime = startTime;
        this.endTime = endTime;
    }

    /**
     * Format slot in a user-friendly format
     */
    formatForUser = () => {
        return 'De ' + timeUtils.formatForUser( this.startTime ) +
            ' à ' + timeUtils.formatForUser( this.endTime );
    };

    /**
     * Get the slot duration
     */
    getDuration = () => {
        return timeUtils.diffNumeric( this.startTime, this.endTime );
    }
}
