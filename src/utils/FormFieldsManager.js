class FormFieldsManager {

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

    checkAddSpeakerFields = () => {
        const
            $speakerAlias = document.querySelector( '#speaker-alias' ),
            $speakerError = document.querySelector( '#speaker-error' ),
            $speakerName = document.querySelector( '#speaker-name' ),
            speakerAlias = $speakerAlias.value,
            speakerName = $speakerName.value;

        let
            errMsg = '',
            isValid = true;

        if( ! ( speakerAlias && speakerName ) ) {
            errMsg = 'Veuillez renseigner les champs.';
            isValid = false;
        }

        speakerAlias ?
            $speakerAlias.classList.remove( 'error-bg' ) :
            $speakerAlias.classList.add( 'error-bg' );
        speakerName ?
            $speakerName.classList.remove( 'error-bg' ) :
            $speakerName.classList.add( 'error-bg' );

        $speakerError.innerHTML = errMsg;

        return isValid;
    };
}

const formFieldsManager = new FormFieldsManager();
export default formFieldsManager;
