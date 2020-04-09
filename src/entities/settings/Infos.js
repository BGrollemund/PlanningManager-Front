/**
 * Infos schedule Object with all useful infos
 */
class Infos {

    constructor( name = '', startDate = new Date(), endDate = new Date(), days = {} ) {
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.days = days;
    }

    /**
     * Init infos schedule
     */
    init = () => {
        let
            currentDate = new Date(),
            nextMonthDate = new Date( currentDate );

        nextMonthDate.setMonth(currentDate.getMonth() + 3);

        this.name = 'Nom de votre planning';
        this.startDate = currentDate;
        this.endDate = nextMonthDate;
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
}

const schInfos = new Infos();
schInfos.init();

export default schInfos;
