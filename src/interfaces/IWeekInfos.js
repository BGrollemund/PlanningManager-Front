/**
 * Interface for weeks infos (see utils/DateUtils.js)
 */
export default class IWeekInfos {

    constructor( weekString = '', daysInfos = {} ) {
        this.weekString = weekString;
        this.daysInfos = daysInfos;
    }
}
