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
}

const schPreferences = new Preferences();
schPreferences.init();

export default schPreferences;
