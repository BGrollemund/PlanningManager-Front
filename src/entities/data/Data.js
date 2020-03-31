/**
 * Data schedule Object with all useful infos
 */
class Data {

    addDayDetails = ( dayId, dayDetails ) => {
        this[dayId] = dayDetails;
    }
}

const schData = new Data();
export default schData;
