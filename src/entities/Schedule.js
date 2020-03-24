import schInfos from "./ScheduleInfos";

class Schedule {

    constructor( scheduleInfos = schInfos, sessions = [], speakers = [] ) {
        this.settings = {
            infos: scheduleInfos,
            sessions: sessions,
            speakers: speakers
        };
    }

    addSession = ( session ) => {
        this.settings.sessions.push( session );
    };

    addSpeaker = ( speaker ) => {
        this.settings.speakers.push( speaker );
    };

    removeSession = ( key ) => {
        this.settings.sessions.splice( key, 1 );
    };

    removeSpeaker = ( key ) => {
        this.settings.speakers.splice( key, 1 );
    };
}

const sch = new Schedule();
export default sch;
