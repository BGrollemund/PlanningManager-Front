/**
 * Session Object
 */
export default class Session {

    constructor( name = '', alias = '', color = '' ) {
        this.alias = alias;
        this.color = color;
        this.name = name;
    }

    // Edit

    /**
     * Edit session alias
     *
     * @param alias
     */
    editAlias = ( alias ) => {
        this.alias = alias;
    };

    /**
     * Edit session color
     *
     * @param color
     */
    editColor = ( color ) => {
        this.color = color;
    };

    /**
     * Edit session name
     *
     * @param name
     */
    editName = ( name ) => {
        this.name = name;
    };
}
