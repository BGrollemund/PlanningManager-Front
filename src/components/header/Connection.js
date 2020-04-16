import React from "react";

import ConnectionPopup from "./ConnectionPopup";

class Connection extends React.Component {

    state = {
        showPopup: false,
        userAttr: this.props.userAttr
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ( prevProps !== this.props )
            this.setState( { userAttr: this.props.userAttr } );
    }

    /**
     * Login adding user attributes
     *
     * @param token
     * @param userId
     * @param role
     */
    login = ( token, userId, role ) => {
        this.setState( { userAttr: { token: token, userId: userId, role: role } } );
        this.props.changeUserAttr( token, userId, role );
    };

    /**
     * Logout removing user attributes
     */
    logout = () => {
        this.setState( { userAttr: { token: '', userId: '', role: '' } } );
        this.props.changeUserAttr( '', '', '' );
    };

    /**
     * Close connection popup
     */
    closePopup = () => {
        this.setState( { showPopup: false } );
    };

    /**
     * Open connection popup
     */
    openPopup = () => {
        this.setState({ showPopup: true } );
    };

    render() {
        let
            connectionOption =  <div onClick={ this.openPopup } className="connection-btn">
                                    Se connecter / S'inscrire
                                </div>,
            popup = '';

        if ( this.state.userAttr.userId.length > 0 ) connectionOption = <div onClick={ this.logout } className="red connection-btn">
                                                                            Se déconnecter
                                                                        </div>;

        if ( this.state.showPopup )
            popup = <ConnectionPopup
                        closePopup={ this.closePopup }
                        login={ this.login }
                        userAttr={ this.state.userAttr } />;

        return (
            <div>
                { connectionOption }
                { popup }
            </div>
        );
    }
}

export default Connection;
