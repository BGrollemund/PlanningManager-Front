import Time from "./Time";

export default class Slots {

    constructor( start_time = new Time(), end_time = new Time(), slotsDetails = {} ) {
        this.start_time = start_time;
        this.end_time = end_time;
        this.slotsDetails = slotsDetails;
    }
}
