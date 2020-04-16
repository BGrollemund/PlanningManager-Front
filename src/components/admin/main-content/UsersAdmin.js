import React from "react";

import Connector from "../../../connector/Connector";

import CreatePopup from "./usersPopup/CreatePopup";
import PassPopup from "./usersPopup/PassPopup";
import RemovePopup from "./usersPopup/RemovePopup";
import RolePopup from "./usersPopup/RolePopup";

import dateUtils from "../../../utils/DateUtils";

class UsersAdmin extends React.Component {

    state = {
        showCreatePopup: false,
        showPassPopup: false,
        showRemovePopup: false,
        showRolePopup: false,
        userToChange: {},
        usersList: []
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ( prevProps !== this.props ) this.readUsers();
    }

    /**
     * Close popup
     */
    closePopup = () => {
        this.setState( {
                showCreatePopup: false,
                showPassPopup: false,
                showRemovePopup: false,
                showRolePopup: false
        });
    };

    /**
     * Open create user popup
     */
    openCreatePopup = () => {
        this.setState( { showCreatePopup: true } );
    };

    /**
     * Open password change popup
     */
    openPassPopup = ( user ) => {
        this.setState( { userToChange: user, showPassPopup: true } );
    };

    /**
     * Open remove confirm popup
     */
    openRemovePopup = ( user ) => {
        this.setState( { userToChange: user, showRemovePopup: true } );
    };

    /**
     * Open role change popup
     */
    openRolePopup = ( user ) => {
        this.setState( { userToChange: user, showRolePopup: true } );
    };

    /**
     * Create a new user
     *
     * @param email
     * @param password
     * @param role
     */
    createUser = ( email, password, role ) => {
        const
            $email = document.querySelector( '#create-user-email' ),
            $error = document.querySelector( '#create-user-error' );

        Connector.post('api/admin/create-user',
                { userId: this.props.userAttr.userId, email: email, password: password, role: role },
                { headers: { 'authorization': 'Bearer ' + this.props.userAttr.token } } )
            .then( () => {
                this.closePopup();
                this.props.update();
            })
            .catch( () => {
                $email.classList.add( 'error-bg' );
                $error.innerHTML = 'Cet e-mail est déjà utilisé.';
            });
    };

    /**
     * Change a specified user password
     *
     * @param id
     * @param password
     */
    changePass = ( id, password ) => {
        this.closePopup();

        Connector.post('api/admin/update-pass',
                { userId: this.props.userAttr.userId, password: password, id: id },
                { headers: { 'authorization': 'Bearer ' + this.props.userAttr.token } } )
            .then( () => this.props.update() )
            .catch( error => console.log(error) );
    };

    /**
     * Change a specified user role
     *
     * @param id
     * @param role
     */
    changeRole = ( id, role ) => {
        this.closePopup();

        Connector.post('api/admin/update-role',
                { userId: this.props.userAttr.userId, role: role, id: id },
                { headers: { 'authorization': 'Bearer ' + this.props.userAttr.token } } )
            .then( () => this.props.update() )
            .catch( error => console.log(error) );
    };

    /**
     * Read users
     */
    readUsers = () => {
        Connector.post('api/admin/read-users',
                { userId: this.props.userAttr.userId },
                { headers: { 'authorization': 'Bearer ' + this.props.userAttr.token } } )
            .then( res => this.setState( { usersList: res.data } ) )
            .catch( error => console.log(error) );
    };

    /**
     * Remove a specified user
     *
     * @param id
     */
    removeUser = ( id ) => {
        this.closePopup();

        Connector.post('api/admin/delete-user',
                { userId: this.props.userAttr.userId, id: id },
                { headers: { 'authorization': 'Bearer ' + this.props.userAttr.token } } )
            .then( () => this.props.update() )
            .catch( error => console.log(error) );
    };

    render() {
        let
            popup = '',
            users = [];

        if ( this.state.showCreatePopup ) popup = <CreatePopup
                                                    createUser={ this.createUser }
                                                    closePopup={ this.closePopup } />;

        if ( this.state.showPassPopup ) popup = <PassPopup
                                                    changePass={ this.changePass }
                                                    closePopup={ this.closePopup }
                                                    userToChange={ this.state.userToChange } />;

        if ( this.state.showRemovePopup ) popup = <RemovePopup
                                                    removeUser={ this.removeUser }
                                                    closePopup={ this.closePopup }
                                                    userToChange={ this.state.userToChange } />;

        if ( this.state.showRolePopup ) popup = <RolePopup
                                                    changeRole={ this.changeRole }
                                                    closePopup={ this.closePopup }
                                                    userToChange={ this.state.userToChange } />;

        if ( this.state.usersList ) {
            users = Object.keys(this.state.usersList).map(key => (
                <div key={key} className="content-admin-list">
                    <div>
                        <span>
                            { this.state.usersList[key].email }
                        </span>
                        <span>
                            { this.state.usersList[key].role }
                        </span>
                        <input
                            className="green"
                            onClick={ this.openRolePopup.bind( this, this.state.usersList[key] ) }
                            value="Changer rôle"
                            type="button" />
                    </div>
                    <div className="content-admin-list-details">
                        <span>
                            Création : {dateUtils.formatWithTimeForUser(new Date(this.state.usersList[key].createdAt))}
                        </span>
                        <span>
                            Mise à jour : {dateUtils.formatWithTimeForUser(new Date(this.state.usersList[key].updatedAt))}
                        </span>
                        <input
                            className="green"
                            onClick={ this.openPassPopup.bind( this, this.state.usersList[key] ) }
                            value="Changer pass"
                            type="button" />
                        <input
                            className="red"
                            onClick={ this.openRemovePopup.bind( this, this.state.usersList[key] ) }
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
                        onClick={ this.openCreatePopup }
                        className="green save-btn"
                        value="Créer un nouvel utilisateur"
                        type="button"/>
                </div>
                { users }
                { popup }
            </div>
        );
    }
}

export default UsersAdmin;
