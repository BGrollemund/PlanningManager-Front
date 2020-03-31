import IDayInfos from "../interfaces/IDayInfos";
import IWeekInfos from "../interfaces/IWeekInfos";

class DateUtils {

    /**
     * Find infos about a specified week
     *
     * @param monday
     * @param sunday
     * @return {IWeekInfos}
     */
    findWeekInfos = ( monday, sunday ) => {
        let daysInfos = {};

        for ( let i=0; i<this.getDaysList().length; i++ ) {
            let newDate = new Date( monday );
            newDate.setDate( monday.getDate() + i );

            daysInfos[ this.getDaysList()[i] ] = new IDayInfos(
                this.getDaysList()[i] + ' ' + this.formatForUser( newDate ),
                this.formatForInput( newDate )
            );
        }

        return new IWeekInfos(
            this.formatWeekString( monday, sunday ),
            daysInfos
        );
    };

    /**
     * Find weeks and their infos between two dates
     * (if date are not well sorted return only the week of the start date)
     *
     * @param start_date
     * @param end_date
     * @return {[]}
     */
    findWeeks = ( start_date, end_date ) => {
        let
            startDate = new Date( start_date ),
            endDate = new Date( end_date ),
            result = [];

        if ( isNaN( startDate.getTime() ) || isNaN( endDate.getTime() ) ) return result;

        let
            monday = new Date( start_date ),
            sunday = new Date( start_date );

        monday.setDate( monday.getDate() - ( this.newGetDay( monday ) - 1 ) );
        sunday.setDate( sunday.getDate() + ( 7 - this.newGetDay( sunday ) ) );

        result.push( this.findWeekInfos( monday, sunday ) );

        while( sunday - end_date < 0 ) {
            monday.setDate( monday.getDate() + 7 );
            sunday.setDate( sunday.getDate() + 7 );

            result.push( this.findWeekInfos( monday, sunday ) );
        }

        return result;
    };

    /**
     * Format date to use in input date
     *
     * @param date
     * @return {string}
     */
    formatForInput = ( date ) => {
        let
            day = ( this.formatTwoNum( date.getDate() ) ).slice( -2 ),
            month = ( this.formatTwoNum( date.getMonth() + 1 ) ).slice( -2 );

        return  date.getFullYear() + "-" + month + "-" + day;
    };

    /**
     * Format date in a user-friendly format
     *
     * @param date
     * @return {string}
     */
    formatForUser = ( date ) => {
        let
            day = ( this.formatTwoNum( date.getDate() ) ).slice( -2 ),
            month = ( this.formatTwoNum( date.getMonth() + 1 ) ).slice( -2 );

        return  day + "/" + month + "/" + date.getFullYear();
    };

    /**
     * Format a week in a user-friendly format
     *
     * @param monday
     * @param sunday
     * @return {string}
     */
    formatWeekString = ( monday, sunday ) => {
        return  this.formatTwoNum( monday.getDate() ) + '/' + this.formatTwoNum( monday.getMonth() + 1 ) + ' - ' +
                this.formatTwoNum( sunday.getDate() ) + '/' + this.formatTwoNum( sunday.getMonth() + 1 );
    };

    /**
     * Format a number to add 0 if only one digit
     *
     * @param num
     * @return {string}
     */
    formatTwoNum = ( num ) => {
        return ( "0" + num ).slice( -2 );
    };

    /**
     * Get an array of days name of the week
     *
     * @return {string[]}
     */
    getDaysList = () => {
        return [
            "Lundi",
            "Mardi",
            "Mercredi",
            "Jeudi",
            "Vendredi",
            "Samedi",
            "Dimanche"
        ];
    };

    /**
     * Get day index in week with 1 = monday ... 7 = sunday
     *
     * @param date
     * @return {number}
     */
    newGetDay = ( date ) => {
        if( date.getDay() === 0 ) {
            return 7;
        }
        else {
            return date.getDay();
        }
    };
}

const dateUtils = new DateUtils();
export default dateUtils;
