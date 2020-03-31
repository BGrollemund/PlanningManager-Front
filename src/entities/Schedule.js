import schSettings from "./settings/Settings";
import Session from "./settings/Session";
import Slot from "./settings/Slot";
import Speaker from "./settings/Speaker";

import schData from "./data/Data";
import DayDetails from "./data/DayDetails";
import SlotDetails from "./data/SlotDetails";
import SessionDetails from "./data/SessionDetails";

/**
 * Schedule Object with all useful infos
 */
class Schedule {

    constructor( settings = schSettings, data = schData ) {
        this.settings = settings;
        this.data = data;
    }

    /**
     * Init schedule
     */
    init = () => {
        this.addSession( new Session( 'Activité 1', 'Act1', '#800080' ) );
        this.addSession( new Session( 'Activité 2', 'Act2', '#FF4500' ) );
        this.addSlot( new Slot( '08:00', '12:00' ) );
        this.addSlot( new Slot( '14:00', '17:00' ) );
        this.addSpeaker( new Speaker( 'Intervenant 1', 'Int1' ) );
        this.addSpeaker( new Speaker( 'Intervenant 2', 'Int2' ) );

        let
            dayDetails0 = new DayDetails(),
            dayDetails1 = new DayDetails(),
            sessionDetails0 = new SessionDetails( 1,[ 0, 1 ], "mention0" ),
            sessionDetails1 = new SessionDetails( 0, [ 1 ], "" ),
            sessionDetails2 = new SessionDetails( 0, [ 0 ], "mention1" ),
            sessionDetails3 = new SessionDetails( 1, [], "mention2" ),
            slotDetails0 = new SlotDetails(),
            slotDetails1 = new SlotDetails(),
            slotDetails2 = new SlotDetails();

        slotDetails0.addSessionDetails( '0', sessionDetails0 );
        slotDetails0.addSessionDetails( '1', sessionDetails1 );
        slotDetails1.addSessionDetails( '0', sessionDetails2 );
        slotDetails2.addSessionDetails( '0', sessionDetails3 );

        dayDetails0.addDaySlot( '0', slotDetails0 );
        dayDetails0.addDaySlot( '1', slotDetails1 );
        dayDetails1.addDaySlot( '0', slotDetails2 );

        this.data.addDayDetails( '2020-04-06', dayDetails0 );
        this.data.addDayDetails( '2020-04-07', dayDetails1 );
    };

    // Add

    /**
     * Add a session in schedule.settings.sessions
     *
     * @param session
     */
    addSession = ( session ) => {
        this.settings.sessions[ this.settings.keys.sessionKey + 1 ] = session;
        this.settings.keys.sessionKey ++;
    };

    /**
     * Add a slot in schedule.settings.slots
     *
     * @param slot
     */
    addSlot = ( slot ) => {
        this.settings.slots[ this.settings.keys.slotKey + 1 ] = slot;
        this.settings.keys.slotKey ++;
    };

    /**
     * Add a speaker in schedule.settings.speaker
     *
     * @param speaker
     */
    addSpeaker = ( speaker ) => {
        this.settings.speakers[ this.settings.keys.speakerKey + 1 ] = speaker;
        this.settings.keys.speakerKey ++;
    };

    // Remove

    /**
     * Remove a specified session in schedule.settings.sessions
     *
     * @param key
     */
    removeSession = ( key ) => {
        delete this.settings.sessions[key];
    };

    /**
     * Remove a specified slot in schedule.settings.slots
     *
     * @param key
     */
    removeSlot = ( key ) => {
        delete this.settings.slots[key];
    };

    /**
     * Remove a specified speaker in schedule.settings.speakers
     *
     * @param key
     */
    removeSpeaker = ( key ) => {
        delete this.settings.speakers[key];
    };
}

const sch = new Schedule();
sch.init();

export default sch;
