import React from "react";

import Connector from "../../../connector/Connector";
import dateUtils from "../../../utils/DateUtils";

class SaveLoadDetails extends React.Component {

    state = {
        schedulesList: []
    };

    componentDidMount() {
        Connector.post(
                'api/users/get-schedules-infos',
                { userId: this.props.userAttr.userId },
                { headers: { 'authorization': 'Bearer ' + this.props.userAttr.token } } )
            .then( res => this.setState( { schedulesList: res.data.schedules } ) )
            .catch( error => console.log(error) );
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ( prevProps !== this.props ) {
            Connector.post(
                    'api/users/get-schedules-infos',
                    { userId: this.props.userAttr.userId },
                    { headers: { 'authorization': 'Bearer ' + this.props.userAttr.token } } )
                .then( res => this.setState( { schedulesList: res.data.schedules } ) )
                .catch( error => console.log(error) );
        }
    }

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
        let loadSchedules = [];

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
                            onClick={ this.removeSchedule.bind( this, this.state.schedulesList[key].id ) }
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
            </div>
        );
    }
}

export default SaveLoadDetails;
