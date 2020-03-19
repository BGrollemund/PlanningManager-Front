class FormFieldsManager {

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

        speakerAlias ? $speakerAlias.classList.remove( 'error-bg' ) : $speakerAlias.classList.add( 'error-bg' );
        speakerName ? $speakerName.classList.remove( 'error-bg' ) : $speakerName.classList.add( 'error-bg' );

        $speakerError.innerHTML = errMsg;

        return isValid;
    };
}

const formFieldsManager = new FormFieldsManager();
export default formFieldsManager;
