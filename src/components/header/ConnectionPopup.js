import React from "react";
import { Redirect } from "react-router-dom";

import Connector from "../../connector/Connector";

import formFieldsUtils from "../../utils/FormFieldsUtils";

class ConnectionPopup extends React.Component {

    state = {
        goToAdmin: false
    };

    /**
     * Connection popup buttons handler
     *
     * @param event
     */
    onConnectionClick = ( event ) => {
        const classList = event.target.classList;

        if( classList.contains( 'cancel' ) )
            this.props.closePopup();

        if( classList.contains( 'login' ) )
            this.onLoginBtnClick();

        if( classList.contains( 'signup' ) )
            this.onSignupBtnClick();
    };

    /**
     * Login
     */
    onLoginBtnClick = () => {
        const
            $loginEmail = document.querySelector( '#login-email' ),
            $loginError = document.querySelector( '#login-error' ),
            $loginPassword = document.querySelector( '#login-password' ),
            loginEmail = $loginEmail.value,
            loginPassword = $loginPassword.value;

        if( formFieldsUtils.checkLoginFields( loginEmail, loginPassword ) ) {
            Connector.post( '/api/users/login', { email: loginEmail, password: loginPassword } )
                .then( res => {
                    this.props.login( res.data.token, res.data.userId, res.data.role );

                    // Redirect to admin dashboard if user is admin
                    if ( res.data.role === 'ADMIN' ) {
                        this.setState( { goToAdmin: true, userAttr: {
                            token: res.data.token,
                            userId: res.data.userId,
                            role: res.data.role
                            } } );
                    }
                    else {
                        this.props.closePopup();
                    }
                })
                .catch( () => {
                    $loginEmail.classList.add( 'error-bg' );
                    $loginPassword.classList.add( 'error-bg' );
                    $loginError.innerHTML = 'Email / Mot de passe invalide.';
                });
        }
    };

    /**
     * Signup
     */
    onSignupBtnClick = () => {
        const
            $signupEmail = document.querySelector( '#signup-email' ),
            $signupError = document.querySelector( '#signup-error' ),
            $signupPassword = document.querySelector( '#signup-password' ),
            $signupPassword2 = document.querySelector( '#signup-password2' ),
            signupEmail = $signupEmail.value,
            signupPassword = $signupPassword.value,
            signupPassword2 = $signupPassword2.value;

        if( formFieldsUtils.checkSignupFields( signupEmail, signupPassword, signupPassword2 ) ) {
                Connector.post( '/api/users/signup', { email: signupEmail, password: signupPassword } )
                    .then( res => {
                        this.props.login( res.data.token, res.data.userId );
                        this.props.closePopup();
                    })
                    .catch( () => {
                        $signupEmail.classList.add( 'error-bg' );
                        $signupError.innerHTML = 'Cet e-mail est déjà utilisé.';
                    });
        }
    };

    render() {
        if ( this.state.goToAdmin ) {
            return <Redirect to = {
                        {
                            pathname: '/pm-dashboard-admin',
                            state: { userAttr: this.state.userAttr }
                        }
            } />;
        }

        return (
            <div className='popup'>
                <div
                    className='popup-content'
                    onClick={ this.onConnectionClick }>
                    <h3>Se connecter</h3>
                    <div>
                        <input
                            id="login-email"
                            placeholder="e-mail"
                            type="text" />
                        <input
                            id="login-password"
                            placeholder="mot de passe"
                            type="password" />
                        <input
                            className="green login"
                            value="Se connecter"
                            type="button"/>
                    </div>
                    <div className="error" id="login-error"/>
                    <h3>S'inscrire</h3>
                    <input
                        id="signup-email"
                        placeholder="e-mail"
                        type="text" />
                    <input
                        id="signup-password"
                        placeholder="mot de passe"
                        type="password" />
                    <input
                        id="signup-password2"
                        placeholder="retaper votre mot de passe"
                        type="password" />
                    <div className="flex">
                        <input
                            className="green signup"
                            value="S'inscrire"
                            type="button"/>
                        <div className="flex-grow-1"/>
                        <input
                            className="cancel"
                            value="Annuler"
                            type="button"/>
                    </div>
                    <div className="error" id="signup-error"/>
                </div>
            </div>
        );
    }
}

export default ConnectionPopup;
