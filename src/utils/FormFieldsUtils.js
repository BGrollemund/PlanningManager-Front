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
}

const formFieldsUtils = new FormFieldsUtils();
export default formFieldsUtils;
