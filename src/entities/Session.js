export default class Session {

    constructor( name = '', alias = '', color = '' ) {
        this.alias = alias;
        this.color = color;
        this.name = name;
    }

    editAlias = ( alias ) => {
        this.alias = alias;
    };

    editColor = ( color ) => {
        this.color = color;
    };

    editName = ( name ) => {
        this.name = name;
    };
}
