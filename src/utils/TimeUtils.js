class TimeUtils {

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
}

const timeUtils = new TimeUtils();
export default timeUtils;
