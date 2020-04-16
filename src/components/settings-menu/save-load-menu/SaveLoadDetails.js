import React from "react";

import Connector from "../../../connector/Connector";

import SaveLoadRemovePopup from "./SaveLoadRemovePopup";

import dateUtils from "../../../utils/DateUtils";


class SaveLoadDetails extends React.Component {

    state = {
        showRemovePopup: false,
        schedulesList: [],
        scheduleToRemove: {}
    };

    constructor(props) {
        super(props);
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;
        this._isMounted && this.getSchedulesInfos();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ( prevProps !== this.props ) this.getSchedulesInfos();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    /**
     * Close popup
     */
    closePopup = () => {
        this.setState( { showRemovePopup: false } );
    };

    /**
     * Open remove session popup
     */
    openRemovePopup = ( scheduleInfos ) => {
        this.setState( { scheduleToRemove: scheduleInfos, showRemovePopup: true } );
    };

    /**
     * Get schedules infos
     */
    getSchedulesInfos = () => {
        Connector.post(
            'api/users/get-schedules-infos',
                { userId: this.props.userAttr.userId },
                { headers: { 'authorization': 'Bearer ' + this.props.userAttr.token } } )
            .then( res => this._isMounted && this.setState( { schedulesList: res.data.schedules } ) )
            .catch( error => console.log(error) );
    };

    /**
     * Load schedule from database
     *
     * @param scheduleId
     */
    loadSchedule = ( scheduleId ) => {
        Connector.post(
                'api/users/get-schedule',
                { userId: this.props.userAttr.userId, id: scheduleId },
                { headers: { 'authorization': 'Bearer ' + this.props.userAttr.token } } )
            .then( res => {
                this.props.schedule.loadData( res.data.schedule.schedule );
                this.props.updateFromDB( scheduleId );
            })
            .catch( error => console.log(error) );
    };

    /**
     * Remove schedule in database
     *
     * @param scheduleId
     */
    removeSchedule = ( scheduleId ) => {
        this.closePopup();
        Connector.post(
                'api/users/remove-schedule',
                { userId: this.props.userAttr.userId, id: scheduleId },
                { headers: { 'authorization': 'Bearer ' + this.props.userAttr.token } } )
            .then( () => {
                if ( String(scheduleId) === String(this.props.scheduleId) ) {
                    this.props.updateFromDB( '' );
                }
                else {
                    this.props.updateFromDB( scheduleId );
                }
            })
            .catch( error => console.log(error) );
    };

    /**
     * Save current schedule
     */
    saveSchedule = () => {
        if ( this.props.scheduleId.length <= 0 ) {
            Connector.post(
                    'api/users/add-schedule',
                    { schedule: this.props.schedule, userId: this.props.userAttr.userId },
                    { headers: { 'authorization': 'Bearer ' + this.props.userAttr.token } } )
                .then( res => this.props.updateFromDB( res.data.scheduleId ) )
                .catch( res => console.log(res) );
        }
        else {
            Connector.post(
                    'api/users/update-schedule',
                    { schedule: this.props.schedule, userId: this.props.userAttr.userId, id: this.props.scheduleId },
                    { headers: { 'authorization': 'Bearer ' + this.props.userAttr.token } } )
                .then( () => this.props.updateFromDB( this.props.scheduleId ) )
                .catch( res => console.log(res) );
        }
    };

    render() {
        let
            popup = '',
            loadSchedules = [];

        if ( this.state.showRemovePopup ) popup = <SaveLoadRemovePopup
                                                        removeSchedule={ this.removeSchedule }
                                                        closePopup={ this.closePopup }
                                                        scheduleInfos={ this.state.scheduleToRemove } />;

        if ( this.state.schedulesList ) {
            loadSchedules = Object.keys( this.state.schedulesList ).map( key => (
                <div key={key} className="content-load-list">
                    <div>
                        { this.state.schedulesList[key].name }
                    </div>
                    <div>
                        <span>
                            Création : { dateUtils.formatWithTimeForUser( new Date( this.state.schedulesList[key].createdAt ) ) }
                        </span>
                        <span>
                            Mise à jour : { dateUtils.formatWithTimeForUser( new Date( this.state.schedulesList[key].updatedAt ) ) }
                        </span>
                        <input
                            className="green"
                            onClick={ this.loadSchedule.bind( this, this.state.schedulesList[key].id ) }
                            value="Charger"
                            type="button" />
                        <input
                            className="red"
                            onClick={ this.openRemovePopup.bind( this, this.state.schedulesList[key] ) }
                            value="Supprimer"
                            type="button" />
                    </div>
                </div>
            ));
        }

        return (
            <div>
                <div>
                    <input
                        onClick={ this.saveSchedule }
                        className="green save-btn"
                        value="Sauvegarder le planning en cours"
                        type="button"/>
                </div>
                { loadSchedules }
                { popup }
            </div>
        );
    }
}

export default SaveLoadDetails;
