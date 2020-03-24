class ScheduleInfos {

    constructor( name = '', start_date = new Date(), end_date = new Date(), days = {} ) {
        this.name = name;
        this.start_date = start_date;
        this.end_date = end_date;
        this.days = days;
    }

    editName = ( name ) => {
        this.name = name;
    };

    editStartDate = ( start_date_from_input ) => {
        this.start_date = new Date( start_date_from_input );
    };

    editEndDate = ( end_date_from_input ) => {
        this.end_date = new Date( end_date_from_input );
    };

    init = () => {
        let
            current_date = new Date(),
            next_month_date = new Date( current_date );

        next_month_date.setMonth(current_date.getMonth() + 3);

        this.name = 'Nom de votre planning';
        this.start_date = current_date;
        this.end_date = next_month_date;
        this.days = {
            Lundi: true,
            Mardi: true,
            Mercredi: true,
            Jeudi: true,
            Vendredi: true,
            Samedi: false,
            Dimanche: false
        };
    }
}

const schInfos = new ScheduleInfos();
schInfos.init();

export default schInfos;
