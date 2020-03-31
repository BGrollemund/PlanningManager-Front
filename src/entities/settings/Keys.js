/**
 * Storage Object for last lists index in settings
 * (to avoid problems when add/remove elements)
 */
class Keys {

    constructor( sessionKey = -1, slotKey = -1, speakerKey = -1 ) {
        this.sessionKey = sessionKey;
        this.slotKey = slotKey;
        this.speakerKey = speakerKey;
    }
}

const schKeys = new Keys();
export default schKeys;
