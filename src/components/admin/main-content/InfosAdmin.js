import React from "react";

import Connector from "../../../connector/Connector";

class InfosAdmin extends React.Component {

    state = {
       infos: {
           numUsers: 0,
           numSchedules: 0
       }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ( prevProps !== this.props ) {
            Connector.post('api/admin/get-infos',
                    { userId: this.props.userAttr.userId },
                    { headers: { 'authorization': 'Bearer ' + this.props.userAttr.token } } )
                .then( res => this.setState( { infos: res.data } ) )
                .catch( error => console.log(error) );
        }
    }

    render() {
        return (
            <div>
                <div className="content-admin-list">
                    <span>Nombre d'utilisateurs enregistrés : </span>{ this.state.infos.numUsers }
                </div>
                <div className="content-admin-list">
                    <span>Nombre de plannings enregistrés : </span>{ this.state.infos.numSchedules }
                </div>
            </div>
        );
    }
}

export default InfosAdmin;
