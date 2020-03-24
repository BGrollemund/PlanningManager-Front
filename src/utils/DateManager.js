class DateManager {

    findWeeks = ( start_date, end_date ) => {
        let
            monday = new Date( start_date ),
            sunday = new Date( start_date ),
            result = [];

        monday.setDate( monday.getDate() - ( this.newGetDay( monday ) - 1 ) );
        sunday.setDate( sunday.getDate() + ( 7 - this.newGetDay( sunday ) ) );

        result.push(
            this.formatTwoNum( monday.getDate() ) + '/' + this.formatTwoNum( monday.getMonth() + 1 ) + ' - ' +
            this.formatTwoNum( sunday.getDate() ) + '/' + this.formatTwoNum( sunday.getMonth() + 1 )
        );

        while( sunday - end_date < 0 ) {
            monday.setDate( monday.getDate() + 7 );
            sunday.setDate( sunday.getDate() + 7 );

            result.push(
                this.formatTwoNum( monday.getDate() ) + '/' + this.formatTwoNum( monday.getMonth() + 1 ) + ' - ' +
                this.formatTwoNum( sunday.getDate() ) + '/' + this.formatTwoNum( sunday.getMonth() + 1 )
            );
        }

        return result;
    };

    formatForInput = ( date ) => {
        let
            day = ( this.formatTwoNum( date.getDate() ) ).slice( -2 ),
            month = ( this.formatTwoNum( date.getMonth() + 1 ) ).slice( -2 );

        return  date.getFullYear() + "-" + month + "-" + day;
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
