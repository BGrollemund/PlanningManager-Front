import timeUtils from "../../utils/TimeUtils";

/**
 * Slot Object
 */
export default class Slot {

    constructor( start_time = '', end_time = '' ) {
        this.start_time = start_time;
        this.end_time = end_time;
    }

    /**
     * Edit slot start time
     *
     * @param start_time
     */
    editStartTime = ( start_time ) => {
        this.start_time = start_time;
    };

    /**
     * Edit slot end time
     *
     * @param end_time
     */
    editEndTime = ( end_time ) => {
        this.end_time = end_time;
    };

    /**
     * Format slot in a user-friendly format
     */
    formatForUser = () => {
        return 'De ' + timeUtils.formatForUser( this.start_time ) +
            ' à ' + timeUtils.formatForUser( this.end_time );
    };
}
