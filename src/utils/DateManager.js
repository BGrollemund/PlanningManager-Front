import IDayInfos from "../interfaces/IDayInfos";
import IWeekInfos from "../interfaces/IWeekInfos";

class DateManager {

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

    formatDaysString = ( monday ) => {
        let result = {};

        for ( let i=0; i<this.getDaysList().length; i++ ) {
            let newDate = new Date( monday );
            newDate.setDate( monday.getDate() + i );

            result[ this.getDaysList()[i] ] = {
                "dayString": this.getDaysList()[i] + ' ' + this.formatForUser( newDate ),
                "dayId": this.formatForInput( newDate )
            };
        }

        return result;
    };

    formatForInput = ( date ) => {
        let
            day = ( this.formatTwoNum( date.getDate() ) ).slice( -2 ),
            month = ( this.formatTwoNum( date.getMonth() + 1 ) ).slice( -2 );

        return  date.getFullYear() + "-" + month + "-" + day;
    };

    formatForUser = ( date ) => {
        let
            day = ( this.formatTwoNum( date.getDate() ) ).slice( -2 ),
            month = ( this.formatTwoNum( date.getMonth() + 1 ) ).slice( -2 );

        return  day + "/" + month;
    };

    formatWeekString = ( monday, sunday ) => {
        return  this.formatTwoNum( monday.getDate() ) + '/' + this.formatTwoNum( monday.getMonth() + 1 ) + ' - ' +
                this.formatTwoNum( sunday.getDate() ) + '/' + this.formatTwoNum( sunday.getMonth() + 1 );
    };

    formatTwoNum = ( num ) => {
        return ( "0" + num ).slice( -2 );
    };

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

    newGetDay = ( date ) => {
        if( date.getDay() === 0 ) {
            return 7;
        }
        else {
            return date.getDay();
        }
    };
}

const dateManager = new DateManager();
export default dateManager;
