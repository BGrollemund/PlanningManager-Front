import schInfos from "./Infos";
import schKeys from "./Keys";
import schPreferences from "./Preferences";

/**
 * Settings schedule Object with all useful infos
 */
class Settings {

    constructor(    infos = schInfos, keys = schKeys, preferences = schPreferences,
                    sessions = {}, slots = {}, speakers = {} ) {
        this.infos = infos;
        this.keys = keys;
        this.preferences = preferences;
        this.sessions = sessions;
        this.slots = slots;
        this.speakers = speakers;
    }
}

const schSettings = new Settings();
export default schSettings;
