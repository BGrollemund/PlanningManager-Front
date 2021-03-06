import schSettings from "./settings/Settings";
import Session from "./settings/Session";
import Slot from "./settings/Slot";
import Speaker from "./settings/Speaker";

import schData from "./data/Data";
import DayDetails from "./data/DayDetails";
import SlotDetails from "./data/SlotDetails";
import SessionDetails from "./data/SessionDetails";

import dateUtils from "../utils/DateUtils";

/**
 * Schedule Object with all useful infos
 */
class Schedule {

    constructor( settings = schSettings, data = schData ) {
        this.settings = settings;
        this.data = data;

        this.maxSessionsPerSlot = this.settings.preferences.sessionsPerSlot;
        this.initData();
    }

    /**
     * Load data from API in schedule
     *
     * @param data
     */
    loadData = ( data ) => {
        // Settings infos
        this.settings.infos.name = data.settings.infos.name;
        this.settings.infos.startDate = new Date(data.settings.infos.startDate);
        this.settings.infos.endDate = new Date(data.settings.infos.endDate);
        this.settings.infos.days = data.settings.infos.days;

        // Settings keys
        this.settings.keys.sessionKey = data.settings.keys.sessionKey;
        this.settings.keys.slotKey = data.settings.keys.slotKey;
        this.settings.keys.speakerKey = data.settings.keys.speakerKey;

        // Settings preferences
        this.settings.preferences.dayCellHeight = parseInt( data.settings.preferences.dayCellHeight );
        this.settings.preferences.dayCellWidth = parseInt( data.settings.preferences.dayCellWidth );
        this.settings.preferences.sessionsPerSlot = parseInt( data.settings.preferences.sessionsPerSlot );
        this.settings.preferences.speakersPerSlot = parseInt( data.settings.preferences.speakersPerSlot );
        this.settings.preferences.mentionOption = data.settings.preferences.mentionOption;
        this.settings.preferences.showGroup = data.settings.preferences.showGroup;
        this.settings.preferences.showSlot = data.settings.preferences.showSlot;

        // Settings sessions
        this.settings.sessions = {};
        if ( data.settings.sessions ) {
            Object.keys( data.settings.sessions ).forEach( key => {
                this.settings.sessions[key] = new Session(
                    data.settings.sessions[key].name,
                    data.settings.sessions[key].alias,
                    data.settings.sessions[key].color
                )
            });
        }

        // Settings slots
        this.settings.slots = {};
        if ( data.settings.slots ) {
            Object.keys( data.settings.slots ).forEach( key => {
                this.settings.slots[key] = new Slot(
                    data.settings.slots[key].startTime,
                    data.settings.slots[key].endTime
                )
            });
        }

        // Settings speakers
        this.settings.speakers = {};
        if ( data.settings.speakers ) {
            Object.keys( data.settings.speakers ).forEach( key => {
                this.settings.speakers[key] = new Speaker(
                    data.settings.speakers[key].name,
                    data.settings.speakers[key].alias
                )
            });
        }

        // Data
        Object.keys( this.data ).forEach( key => {
            // Remove entry with string format day key to clear data object
            if ( ! isNaN( (new Date(key)).getTime() ) ) delete this.data[key];
        });

        Object.keys( data.data ).forEach( day => {
            this.data[day] = new DayDetails();

            Object.keys( data.data[day] ).forEach( slot => {
                this.data[day][slot] = new SlotDetails();

                Object.keys( data.data[day][slot] ).forEach( session => {
                    this.data[day][slot][session] = new SessionDetails(
                        data.data[day][slot][session].sessionKey,
                        data.data[day][slot][session].speakerKeys,
                        data.data[day][slot][session].mention
                    );
                });
            });
        });

        // maxSessionPerSlots
        this.maxSessionsPerSlot = parseInt( data.maxSessionsPerSlot );
    };

    /**
     * Init data with keys of schedule days
     */
    initData = () => {
       const daysArr = dateUtils.findDaysCompleteWeek( this.settings.infos.startDate, this.settings.infos.endDate );

       daysArr.forEach( el => {
           if( ! this.data[el] ) {
               this.data.addDayDetails( el, new DayDetails() );

               if ( this.settings.slots ) {
                   Object.keys( this.settings.slots ).forEach( key => {
                       this.data[el].addDaySlot( key, new SlotDetails() );

                       for ( let i=0; i<this.settings.preferences.sessionsPerSlot; i++ ) {
                           this.data[el][key].addSessionDetails( i, new SessionDetails() );
                       }
                   });
               }
           }
       });
    };

    /**
     * Init schedule
     */
    init = () => {
        this.addSession( new Session( 'Activité 1', 'A1', '#F0E68C' ) );
        this.addSession( new Session( 'Activité 2', 'A2', '#32CD32' ) );
        this.addSlot( new Slot( '08:00', '12:00' ) );
        this.addSlot( new Slot( '14:00', '17:00' ) );
        this.addSpeaker( new Speaker( 'Intervenant 1', 'I1' ) );
        this.addSpeaker( new Speaker( 'Intervenant 2', 'I2' ) );

        let
            dayDetails0 = new DayDetails(),
            sessionDetails0 = new SessionDetails( '1',[ '0', '1' ], "mention0" ),
            sessionDetails1 = new SessionDetails( '0', [ '1' ], "" ),
            sessionDetails2 = new SessionDetails( '0', [ '0' ], "mention1" ),
            sessionDetails3 = new SessionDetails( '1', [], "mention2" ),
            slotDetails0 = new SlotDetails(),
            slotDetails1 = new SlotDetails();

        slotDetails0.addSessionDetails( '0', sessionDetails0 );
        slotDetails0.addSessionDetails( '1', sessionDetails1 );
        slotDetails1.addSessionDetails( '0', sessionDetails2 );
        slotDetails1.addSessionDetails( '1', sessionDetails3 );

        dayDetails0.addDaySlot( '0', slotDetails0 );
        dayDetails0.addDaySlot( '1', slotDetails1 );

        this.data.addDayDetails( '2020-04-13', dayDetails0 );
    };


    /**
     * Update data schedule when sessionPerSlot are changed
     */
    updateDataBySessionsPerSlot = () => {
        const daysArr = dateUtils.findDaysCompleteWeek( this.settings.infos.startDate, this.settings.infos.endDate );

        daysArr.forEach( el => {
            Object.keys( this.settings.slots ).forEach( key => {
                for ( let i=0; i<this.settings.preferences.sessionsPerSlot; i++ ) {
                    if ( this.maxSessionsPerSlot < i + 1 ) {
                        this.data[el][key].addSessionDetails( i, new SessionDetails() );
                    }
                }
            });
        });

        if ( this.maxSessionsPerSlot < this.settings.preferences.sessionsPerSlot )
            this.maxSessionsPerSlot = this.settings.preferences.sessionsPerSlot;
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

        const daysArr = dateUtils.findDaysCompleteWeek( this.settings.infos.startDate, this.settings.infos.endDate );

        daysArr.forEach( el => {
            this.data[el].addDaySlot( this.settings.keys.slotKey + 1, new SlotDetails() );
                for ( let i=0; i<this.settings.preferences.sessionsPerSlot; i++ ) {
                    this.data[el][this.settings.keys.slotKey + 1].addSessionDetails( i, new SessionDetails() );
                }
        });

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

export default sch;
