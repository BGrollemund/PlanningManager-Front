/**
 * Speaker Object
 */
export default class Speaker {

    constructor( name = '', alias = '' ) {
        this.alias = alias;
        this.name = name;
    }

    /**
     * Edit speaker alias
     *
     * @param alias
     */
    editAlias = ( alias ) => {
        this.alias = alias;
    };

    /**
     * Edit speaker name
     *
     * @param name
     */
    editName = ( name ) => {
        this.name = name;
    };
}
