class ScheduleInfos {

    constructor( name = '', start_date = new Date(), end_date = new Date(), days = [] ) {
        this.name = name;
        this.start_date = start_date;
        this.end_date = end_date;
        this.days = days;
    }
}

const schInfos = new ScheduleInfos();
export default schInfos;
