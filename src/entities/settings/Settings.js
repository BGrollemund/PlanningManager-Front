import schInfos from "./Infos";

class Settings {

    constructor( infos = schInfos, sessions = {}, speakers = {} ) {
        this.infos = infos;
        this.sessions = sessions;
        this.speakers = speakers;
    }
}

const schSettings = new Settings();
export default schSettings;
