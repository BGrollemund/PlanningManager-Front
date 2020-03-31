/**
 * Infos schedule Object with all useful infos
 */
class Infos {

    constructor( name = '', start_date = new Date(), end_date = new Date(), days = {} ) {
        this.name = name;
        this.start_date = start_date;
        this.end_date = end_date;
        this.days = days;
    }

    /**
     * Init infos schedule
     */
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
    };

    // Edit

    /**
     * Edit schedule name
     *
     * @param name
     */
    editName = ( name ) => {
        this.name = name;
    };

    /**
     * Edit schedule start date with the input date value
     *
     * @param start_date_from_input
     */
    editStartDate = ( start_date_from_input ) => {
        this.start_date = new Date( start_date_from_input );
    };

    /**
     * Edit schedule end date with the input date value
     *
     * @param end_date_from_input
     */
    editEndDate = ( end_date_from_input ) => {
        this.end_date = new Date( end_date_from_input );
    };
}

const schInfos = new Infos();
schInfos.init();

export default schInfos;
