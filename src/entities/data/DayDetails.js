/**
 * Day details Object
 */
export default class DayDetails {

    addDaySlot = ( slotIndex, slotDetails ) => {
        this[slotIndex] = slotDetails;
    }
}
