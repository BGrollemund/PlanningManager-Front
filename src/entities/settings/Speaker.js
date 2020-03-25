export default class Speaker {

    constructor( name = '', alias = '' ) {
        this.alias = alias;
        this.name = name;
    }

    editAlias = ( alias ) => {
        this.alias = alias;
    };

    editName = ( name ) => {
        this.name = name;
    };
}
