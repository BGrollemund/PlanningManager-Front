/**
 * Session Object
 */
export default class Session {

    constructor( name = '', alias = '', color = '' ) {
        this.alias = alias;
        this.color = color;
        this.name = name;
    }
}
