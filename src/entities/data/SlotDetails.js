export default class SlotDetails {

    constructor( sessionKeys = [], speakerKeys = [], mention = '' ) {
        this.sessionKeys = sessionKeys;
        this.speakerKeys = speakerKeys;
        this.mention = mention;
    }
}
