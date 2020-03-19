import schInfos from "./ScheduleInfos";

class Schedule {

    constructor( scheduleInfos = schInfos, sessions = [], speakers = [] ) {
        this.settings = {
            infos: scheduleInfos,
            sessions: sessions,
            speakers: speakers
        };
    }

    addSpeaker = ( speaker ) => {
        this.settings.speakers.push( speaker );
    };

    removeSpeaker = ( key ) => {
        this.settings.speakers.splice( key, 1 );
    };
}

const sch = new Schedule();
export default sch;
