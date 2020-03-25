import schData from "./data/Data";
import schSettings from "./settings/Settings";

class Schedule {

    constructor( settings = schSettings, data = schData ) {
        this.settings = settings;
        this.data = data;
    }

    addSession = ( session ) => {
        this.settings.sessions[ Object.keys( this.settings.sessions ).length ] = session;
    };

    addSpeaker = ( speaker ) => {
        this.settings.speakers[ Object.keys( this.settings.speakers ).length ] = speaker;
    };

    removeSession = ( key ) => {
        delete this.settings.sessions[key];
    };

    removeSpeaker = ( key ) => {
        delete this.settings.speakers[key];
    };
}

const sch = new Schedule();
export default sch;
