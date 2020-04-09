/**
 * Session details Object
 */
export default class SessionDetails {

    constructor( sessionKey = '-1', speakerKeys = [], mention = '' ) {
        this.sessionKey = sessionKey;
        this.speakerKeys = speakerKeys;
        this.mention = mention;
    }
}
