class Preferences {

    constructor( dayCellHeight = 0, dayCellWidth = 0,
                 sessionsPerSlot = 0, speakersPerSlot = 0, mentionOption = false,
                 showGroup = false, showSlot = false ) {
        this.dayCellHeight = dayCellHeight;
        this.dayCellWidth = dayCellWidth;
        this.sessionsPerSlot = sessionsPerSlot;
        this.speakersPerSlot = speakersPerSlot;
        this.mentionOption = mentionOption;
        this.showGroup = showGroup;
        this.showSlot = showSlot;
    }

    init = () => {
        this.dayCellHeight = 160;
        this.dayCellWidth = 160;
        this.sessionsPerSlot = 2;
        this.speakersPerSlot = 2;
        this.mentionOption = true;
        this.showGroup = true;
        this.showSlot = true;
    };

    // Edit

    /**
     * Edit schedule dayCellHeight
     *
     * @param dayCellHeight
     */
    editDayCellHeight = ( dayCellHeight ) => {
        this.dayCellHeight = dayCellHeight;
    };

    /**
     * Edit schedule dayCellWidth
     *
     * @param dayCellWidth
     */
    editDayCellWidth = ( dayCellWidth ) => {
        this.dayCellWidth = dayCellWidth;
    };

    /**
     * Edit schedule sessionsPerSlot
     *
     * @param sessionsPerSlot
     */
    editSessionsPerSlot = ( sessionsPerSlot ) => {
        this.sessionsPerSlot = sessionsPerSlot;
    };

    /**
     * Edit schedule speakersPerSlot
     *
     * @param speakersPerSlot
     */
    editSpeakersPerSlot = ( speakersPerSlot ) => {
        this.speakersPerSlot = speakersPerSlot;
    };

    /**
     * Edit schedule mentionOption
     *
     * @param mentionOption
     */
    editMentionOption = ( mentionOption ) => {
        this.mentionOption = mentionOption;
    };

    /**
     * Edit schedule showGroup
     *
     * @param showGroup
     */
    editShowGroup = ( showGroup ) => {
        this.showGroup = showGroup;
    };

    /**
     * Edit schedule showSlot
     *
     * @param showSlot
     */
    editShowSlot = ( showSlot ) => {
        this.showSlot = showSlot;
    };
}

const schPreferences = new Preferences();
schPreferences.init();

export default schPreferences;
