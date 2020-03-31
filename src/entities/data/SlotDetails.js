/**
 * Slot details Object
 */
export default class SlotDetails {

    addSessionDetails = ( sessionIndex, sessionDetails ) => {
        this[sessionIndex] = sessionDetails;
    }
}
