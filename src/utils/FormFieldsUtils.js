class FormFieldsUtils {

    /**
     * Check fields of add session form in nav menu
     *
     * @param name
     * @param alias
     * @param color
     * @return {boolean}
     */
    checkAddSessionFields = ( name, alias, color ) => {
        const
            $sessionAlias = document.querySelector( '#session-alias' ),
            $sessionColor = document.querySelector( '#session-color' ),
            $sessionError = document.querySelector( '#session-error' ),
            $sessionName = document.querySelector( '#session-name' );

        let
            errMsg = '',
            isValid = true;

        if( ! ( alias && color && name ) ) {
            errMsg = 'Veuillez renseigner les champs.';
            isValid = false;
        }

        alias ?
            $sessionAlias.classList.remove( 'error-bg' ) :
            $sessionAlias.classList.add( 'error-bg' );
        color ?
            $sessionColor.classList.remove( 'error-bg' ) :
            $sessionColor.classList.add( 'error-bg' );
        name ?
            $sessionName.classList.remove( 'error-bg' ) :
            $sessionName.classList.add( 'error-bg' );

        $sessionError.innerHTML = errMsg;

        return isValid;
    };

    /**
     * Check fields of add slot form in nav menu
     *
     * @param startDate
     * @param endDate
     * @return {boolean}
     */
    checkAddSlotFields = ( startDate, endDate ) => {
        const
            $slotError = document.querySelector( '#slot-error' ),
            $slotEndDate = document.querySelector( '#slot-end-time' ),
            $slotStartDate = document.querySelector( '#slot-start-time' );

        let
            errMsg = '',
            isValid = true;

        if( ! ( endDate && startDate ) ) {
            errMsg = 'Veuillez renseigner les champs.';
            isValid = false;
        }

        endDate ?
            $slotEndDate.classList.remove( 'error-bg' ) :
            $slotEndDate.classList.add( 'error-bg' );
        startDate ?
            $slotStartDate.classList.remove( 'error-bg' ) :
            $slotStartDate.classList.add( 'error-bg' );

        $slotError.innerHTML = errMsg;

        return isValid;
    };

    /**
     * Check fields of add speaker form in nav menu
     *
     * @param name
     * @param alias
     * @return {boolean}
     */
    checkAddSpeakerFields = ( name, alias ) => {
        const
            $speakerAlias = document.querySelector( '#speaker-alias' ),
            $speakerError = document.querySelector( '#speaker-error' ),
            $speakerName = document.querySelector( '#speaker-name' );

        let
            errMsg = '',
            isValid = true;

        if( ! ( alias && name ) ) {
            errMsg = 'Veuillez renseigner les champs.';
            isValid = false;
        }

        alias ?
            $speakerAlias.classList.remove( 'error-bg' ) :
            $speakerAlias.classList.add( 'error-bg' );
        name ?
            $speakerName.classList.remove( 'error-bg' ) :
            $speakerName.classList.add( 'error-bg' );

        $speakerError.innerHTML = errMsg;

        return isValid;
    };

    /**
     * Check field of change password form in admin users menu
     *
     * @param password
     * @return {boolean}
     */
    checkChangePasswordField = ( password ) => {
        const
            $password = document.querySelector( '#change-password' ),
            $passwordError = document.querySelector( '#change-password-error' );

        let
            errMsg = '',
            isValid = true;

        if( ! password ) {
            errMsg = 'Veuillez renseigner le champ.';
            isValid = false;
        }

        password ?
            $password.classList.remove( 'error-bg' ) :
            $password.classList.add( 'error-bg' );

        $passwordError.innerHTML = errMsg;

        return isValid;
    };

    /**
     * Check field of create form form in admin users menu
     *
     * @param email
     * @param password
     * @return {boolean}
     */
    checkCreateUserFields = ( email, password ) => {
        const
            isValidEmail = this.checkEmail( email ),
            $email = document.querySelector( '#create-user-email' ),
            $error = document.querySelector( '#create-user-error' ),
            $password = document.querySelector( '#create-user-password' );

        let
            errMsg = '',
            isValid = true;

        if ( ! isValidEmail ) {
            errMsg = 'Veuillez entrer un e-mail valide.';
            isValid = false;
            $email.classList.add( 'error-bg' );
        }

        if( ! ( email && password ) ) {
            errMsg = 'Veuillez renseigner les champs.';
            isValid = false;
        }

        email && isValidEmail ?
            $email.classList.remove( 'error-bg' ) :
            $email.classList.add( 'error-bg' );
        password ?
            $password.classList.remove( 'error-bg' ) :
            $password.classList.add( 'error-bg' );

        $error.innerHTML = errMsg;

        return isValid;
    };

    /**
     * Check if a string have a valid email format
     *
     * @param email
     * @return {boolean}
     */
    checkEmail = ( email ) => {
        // eslint-disable-next-line no-useless-escape
        const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regExp.test( String( email ).toLowerCase() );
    };

    /**
     * Check fields of login form in connection popup
     *
     * @param email
     * @param password
     * @return {boolean}
     */
    checkLoginFields = ( email, password ) => {
        const
            isValidEmail = this.checkEmail( email ),
            $loginEmail = document.querySelector( '#login-email' ),
            $loginError = document.querySelector( '#login-error' ),
            $loginPassword = document.querySelector( '#login-password' );

        let
            errMsg = '',
            isValid = true;

        if ( ! isValidEmail ) {
            errMsg = 'Veuillez entrer un e-mail valide.';
            isValid = false;
            $loginEmail.classList.add( 'error-bg' );
        }

        if( ! ( email && password ) ) {
            errMsg = 'Veuillez renseigner les champs.';
            isValid = false;
        }

        email && isValidEmail ?
            $loginEmail.classList.remove( 'error-bg' ) :
            $loginEmail.classList.add( 'error-bg' );
        password ?
            $loginPassword.classList.remove( 'error-bg' ) :
            $loginPassword.classList.add( 'error-bg' );

        $loginError.innerHTML = errMsg;

        return isValid;
    };

    /**
     * Check fields of signup form in connection popup
     *
     * @param email
     * @param password
     * @param password2
     * @return {boolean}
     */
    checkSignupFields = ( email, password, password2 ) => {
        const
            isValidEmail = this.checkEmail( email ),
            $signupEmail = document.querySelector( '#signup-email' ),
            $signupError = document.querySelector( '#signup-error' ),
            $signupPassword = document.querySelector( '#signup-password' ),
            $signupPassword2 = document.querySelector( '#signup-password2' );

        let
            errMsg = '',
            isValid = true;

        if ( password !== password2 ) {
            errMsg = 'Veuillez retapez le même mot de passe.';
            isValid = false;
            $signupPassword.classList.add( 'error-bg' );
            $signupPassword2.classList.add( 'error-bg' );
        }

        if ( ! isValidEmail ) {
            errMsg = 'Veuillez entrer un e-mail valide.';
            isValid = false;
            $signupEmail.classList.add( 'error-bg' );
        }

        if( ! ( email && password && password2 ) ) {
            errMsg = 'Veuillez renseigner les champs.';
            isValid = false;
        }

        email && isValidEmail ?
            $signupEmail.classList.remove( 'error-bg' ) :
            $signupEmail.classList.add( 'error-bg' );
        password && password === password2 ?
            $signupPassword.classList.remove( 'error-bg' ) :
            $signupPassword.classList.add( 'error-bg' );
        password2 && password === password2 ?
            $signupPassword2.classList.remove( 'error-bg' ) :
            $signupPassword2.classList.add( 'error-bg' );

        $signupError.innerHTML = errMsg;

        return isValid;
    };
}

const formFieldsUtils = new FormFieldsUtils();
export default formFieldsUtils;
